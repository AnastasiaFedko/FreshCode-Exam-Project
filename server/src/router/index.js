const express = require('express');
const router = express.Router();
const contestRouter = require('./contestRouter');
const userRouter = require('./userRouter');
const chatRouter = require('./chatRouter');
const paymentRouter = require('./paymentRouter');
const offerRouter = require('./offerRouter');

router.use('/offers', offerRouter);
router.use('/contests', contestRouter);
router.use('/users', userRouter);
router.use('/chats', chatRouter);
router.use('/payment', paymentRouter);

module.exports = router;
