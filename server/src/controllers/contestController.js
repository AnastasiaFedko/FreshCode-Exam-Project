const db = require('../models');
const ServerError = require('../errors/ServerError');
const contestQueries = require('./queries/contestQueries');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const UtilFunctions = require('../utils/functions');
const CONSTANTS = require('../constants');
const sendEmail = require('../utils/sendEmail');

module.exports.dataForContest = async (req, res, next) => {
  const response = {};
  try {
    const {
      body: { characteristic1, characteristic2 },
    } = req;
    console.log(req.body, characteristic1, characteristic2);
    const types = [characteristic1, characteristic2, 'industry'].filter(Boolean);

    const characteristics = await db.Selects.findAll({
      where: {
        type: {
          [db.Sequelize.Op.or]: types,
        },
      },
    });
    if (!characteristics) {
      return next(new ServerError());
    }
    characteristics.forEach((characteristic) => {
      if (!response[characteristic.type]) {
        response[characteristic.type] = [];
      }
      response[characteristic.type].push(characteristic.describe);
    });
    res.send(response);
  } catch (err) {
    console.log(err);
    next(new ServerError('cannot get contest preferences'));
  }
};

module.exports.getContestById = async (req, res, next) => {
  try {
    let contestInfo = await db.Contests.findOne({
      where: { id: req.headers.contestid },
      order: [[db.Offers, 'id', 'asc']],
      include: [
        {
          model: db.Users,
          required: true,
          attributes: {
            exclude: ['password', 'role', 'balance', 'accessToken'],
          },
        },
        {
          model: db.Offers,
          required: false,
          where:
            req.tokenData.role === CONSTANTS.CREATOR
              ? { userId: req.tokenData.userId }
              : {},
          attributes: { exclude: ['userId', 'contestId'] },
          include: [
            {
              model: db.Users,
              required: true,
              attributes: {
                exclude: ['password', 'role', 'balance', 'accessToken'],
              },
            },
            {
              model: db.Ratings,
              required: false,
              where: { userId: req.tokenData.userId },
              attributes: { exclude: ['userId', 'offerId'] },
            },
          ],
        },
      ],
    });
    contestInfo = contestInfo.get({ plain: true });
    contestInfo.Offers.forEach((offer) => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
    });
    res.send(contestInfo);
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.downloadFile = async (req, res, next) => {
  const file = CONSTANTS.CONTESTS_DEFAULT_DIR + req.params.fileName;
  res.download(file);
};

module.exports.updateContest = async (req, res, next) => {
  if (req.file) {
    req.body.fileName = req.file.filename;
    req.body.originalFileName = req.file.originalname;
  }
  const contestId = req.body.contestId;
  delete req.body.contestId;
  try {
    const updatedContest = await contestQueries.updateContest(req.body, {
      id: contestId,
      userId: req.tokenData.userId,
    });
    res.send(updatedContest);
  } catch (e) {
    next(e);
  }
};

module.exports.setNewOffer = async (req, res, next) => {
  const obj = {};
  if (req.body.contestType === CONSTANTS.LOGO_CONTEST) {
    obj.fileName = req.file.filename;
    obj.originalFileName = req.file.originalname;
  } else {
    obj.text = req.body.offerData;
  }
  obj.userId = req.tokenData.userId;
  obj.contestId = req.body.contestId;
  try {
    const result = await contestQueries.createOffer(obj);
    delete result.contestId;
    delete result.userId;
    controller
      .getNotificationController()
      .emitEntryCreated(req.body.customerId);
    const User = Object.assign({}, req.tokenData, { id: req.tokenData.userId });
    res.send(Object.assign({}, result, { User }));
  } catch (e) {
    return next(new ServerError());
  }
};

const rejectOffer = async (offerId, creatorId, contestId) => {
  const rejectedOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_REJECTED },
    { id: offerId });
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      creatorId,
      'Someone of yours offers was rejected',
      contestId);
  return rejectedOffer;
};

const moderatorChangedOfferStatus = async (
  offerId,
  firstName,
  lastName,
  email,
  text,
  originalFileName,
  command) => {
  const offer = await contestQueries.updateOffer(
    { status: command },
    { id: offerId });
  const fullName = `${firstName} ${lastName}`;
  await sendEmail.changeOfferStatusMail(email, fullName, text, originalFileName, command);
  return offer;
};

const resolveOffer = async (
  contestId,
  creatorId,
  orderId,
  offerId,
  priority,
  transaction,
) => {
  const finishedContest = await contestQueries.updateContestStatus(
    {
      status: db.sequelize.literal(`   CASE
            WHEN "id"=${contestId}  AND "orderId"='${orderId}' THEN '${CONSTANTS.CONTEST_STATUS_FINISHED}'
            WHEN "orderId"='${orderId}' AND "priority"=${priority + 1}  THEN '${CONSTANTS.CONTEST_STATUS_ACTIVE}'
            ELSE '${CONSTANTS.CONTEST_STATUS_PENDING}'
            END    `),
    },
    { orderId },
    transaction);
  await userQueries.updateUser(
    { balance: db.sequelize.literal('balance + ' + finishedContest.prize) },
    creatorId,
    transaction);
  const updatedOffers = await contestQueries.updateOfferStatus(
    {
      status: db.sequelize.literal(` CASE
            WHEN "id"=${offerId} THEN '${CONSTANTS.OFFER_STATUS_WON}'::"enum_Offers_status"
            WHEN "status"='${CONSTANTS.OFFER_STATUS_CONFIRMED}' THEN '${CONSTANTS.OFFER_STATUS_REJECTED}'::"enum_Offers_status"
            WHEN "status"='${CONSTANTS.OFFER_STATUS_DECLINED}' THEN '${CONSTANTS.OFFER_STATUS_DECLINED}'::"enum_Offers_status"
            WHEN "status"='${CONSTANTS.OFFER_STATUS_PENDING}' THEN '${CONSTANTS.OFFER_STATUS_DECLINED}'::"enum_Offers_status"
            WHEN "status"='${CONSTANTS.OFFER_STATUS_REJECTED}' THEN '${CONSTANTS.OFFER_STATUS_REJECTED}'::"enum_Offers_status"
            END
    `),
    },
    { contestId },
    transaction);
  transaction.commit();
  const arrayRoomsId = [];
  updatedOffers.forEach((offer) => {
    if (
      offer.status === CONSTANTS.OFFER_STATUS_REJECTED &&
      creatorId !== offer.userId
    ) {
      arrayRoomsId.push(offer.userId);
    }
  });
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      arrayRoomsId,
      'Someone of yours offers was rejected',
      contestId);
  controller
    .getNotificationController()
    .emitChangeOfferStatus(creatorId, 'Someone of your offers WIN', contestId);
  return updatedOffers[0].dataValues;
};

module.exports.setOfferStatus = async (req, res, next) => {
  let transaction;
  if (req.body.command === 'reject') {
    try {
      const offer = await rejectOffer(
        req.body.offerId,
        req.body.creatorId,
        req.body.contestId);
      res.send(offer);
    } catch (err) {
      next(err);
    }
  } else if (req.body.command === 'resolve') {
    try {
      transaction = await db.sequelize.transaction();
      const winningOffer = await resolveOffer(
        req.body.contestId,
        req.body.creatorId,
        req.body.orderId,
        req.body.offerId,
        req.body.priority,
        transaction);
      res.send(winningOffer);
    } catch (err) {
      transaction.rollback();
      next(err);
    }
  } else if (req.body.command === CONSTANTS.OFFER_STATUS_DECLINED || req.body.command === CONSTANTS.OFFER_STATUS_CONFIRMED) {
    try {
      const offer = await moderatorChangedOfferStatus(
        req.body.offerId,
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.text,
        req.body.originalFileName,
        req.body.command,
      );
      res.send(offer);
    } catch (err) {
      next(err);
    }
  }
};

module.exports.getCustomersContests = (req, res, next) => {
  const {
    query: {
      offset: offsetNumb,
      limit: limitNumb },
    tokenData: { userId },
    headers: { status },
  } = req;

  const offset = Number(offsetNumb);
  const limit = Number(limitNumb);
  db.Contests.findAll({
    where: { status, userId },
    limit,
    offset: offset ? offset : 0,
    order: [['id', 'DESC']],
    include: [
      {
        model: db.Offers,
        required: false,
        attributes: ['id', 'status'],
      },
    ],
  })
    .then((contests) => {
      contests.forEach(
        (contest) => {
          let count = 0;
          for (const offer of contest.dataValues.Offers) {
            if([CONSTANTS.OFFER_STATUS_CONFIRMED, CONSTANTS.OFFER_STATUS_WON, CONSTANTS.OFFER_STATUS_REJECTED].includes(offer.status)){
              count++;
            }
          }
          (contest.dataValues.count = count);
        },
      );
      let haveMore = true;
      if (contests.length === 0) {
        haveMore = false;
      }
      res.send({ contests, haveMore });
    })
    .catch((err) => next(new ServerError(err)));
};

module.exports.getContests = (req, res, next) => {
  const {
    query: {
      offset: offsetNumb,
      limit: limitNumb,
      typeIndex: typeIndexNumb,
      contest: contestIdNumb,
      industry: industryStr,
      awardSort: awardSortStr,
      ownEntries: ownEntriesStr,
    },
    tokenData: { userId },
  } = req;

  const offset = Number(offsetNumb);
  const limit = Number(limitNumb);
  const typeIndex = Number(typeIndexNumb);
  const contestId = Number(contestIdNumb);
  const industry = industryStr.trim();
  const awardSort = awardSortStr.trim();
  const ownEntries = ownEntriesStr === 'true';

  const predicates = UtilFunctions.createWhereForAllContests(
    typeIndex,
    contestId,
    industry,
    awardSort);

  db.Contests.findAll({
    where: predicates.where,
    order: predicates.order,
    limit,
    offset: offset ? offset : 0,
    include: [
      {
        model: db.Offers,
        required: ownEntries,
        where: ownEntries ? { userId } : {},
        attributes: ['id'],
      },
    ],
  })
    .then((contests) => {
      contests.forEach(
        (contest) =>
          (contest.dataValues.count = contest.dataValues.Offers.length));
      let haveMore = true;
      if (contests.length === 0) {
        haveMore = false;
      }
      res.send({ contests, haveMore });
    })
    .catch((err) => {
      next(new ServerError());
    });
};

module.exports.getOffers = async (req, res, next) => {
  try {
    const offersInfo = await db.Offers.findAll({
      order: [['id', 'desc']],
      attributes: {
        exclude: ['contestId', 'userId'],
      },
      include: [
        {
          model: db.Users,
          required: true,
          attributes: {
            exclude: ['displayName', 'password', 'role', 'balance', 'accessToken'],
          },
        },
        {
          model: db.Contests,
          required: true,
          attributes: { include: ['id', 'orderId', 'priority', 'contestType'] },
        },
      ],
    });

    const resOffers = [];

    offersInfo.forEach((offer) => {
      resOffers.push(offer.get({ plain: true }));
    });

    resOffers.forEach((offer) => {
      if (offer.User) {
        offer.creatorData = {
          id: offer.User.id,
          firstName: offer.User.firstName,
          lastName: offer.User.lastName,
          email: offer.User.email,
          avatar: offer.User.avatar,
          rating: offer.User.rating,
        };
      }
      delete offer.User;
      if (offer.Contest) {
        offer.contestData = {
          id: offer.Contest.id,
          orderId: offer.Contest.orderId,
          priority: offer.Contest.priority,
          contestType: offer.Contest.contestType,
        };
      }
      delete offer.Contest;
    });
    res.send({ resOffers });

  } catch (e) {
    next(new ServerError(e.message));
  }
};
