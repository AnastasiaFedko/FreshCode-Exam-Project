import { put, select } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';
import CONSTANTS from '../constants';

export function* changeMarkSaga(action) {
  try {
    const { data } = yield restController.changeMark(action.data);
    const offers = yield select((state) => state.contestByIdStore.offers);
    offers.forEach((offer) => {
      if (offer.User.id === data.userId) {
        offer.User.rating = data.rating;
      }
      if (offer.id === action.data.offerId) {
        offer.mark = action.data.mark;
      }
    });
    yield put({ type: ACTION.CHANGE_MARK_SUCCESS, data: offers });
  } catch (err) {
    yield put({ type: ACTION.CHANGE_MARK_ERROR, error: err.response });
  }
}

export function* addOfferSaga(action) {
  try {
    const { data } = yield restController.setNewOffer(action.data);
    const offers = yield select((state) => state.contestByIdStore.offers);
    offers.unshift(data);
    yield put({ type: ACTION.ADD_NEW_OFFER_TO_STORE, data: offers });
  } catch (e) {
    yield put({ type: ACTION.ADD_OFFER_ERROR, error: e.response });
  }
}

export function* setOfferStatusSaga(action) {
  try {
    const { data } = yield restController.setOfferStatus(action.data);
    const contestOffers = yield select((state) => state.contestByIdStore.offers);
    contestOffers.forEach((offer, index) => {
      if (data.status === CONSTANTS.OFFER_STATUS_WON) {
        if (data.id === offer.id) {
          offer.status = CONSTANTS.OFFER_STATUS_WON;
        }
        else if(offer.status === CONSTANTS.OFFER_STATUS_CONFIRMED){
          offer.status = CONSTANTS.OFFER_STATUS_REJECTED;
        }
      } else if (data.id === offer.id) {
        if (offer.status === CONSTANTS.OFFER_STATUS_CONFIRMED) {
          offer.status = CONSTANTS.OFFER_STATUS_REJECTED;
        }
      }
    });
    yield put({ type: ACTION.CHANGE_STORE_FOR_STATUS, data: contestOffers });
  } catch (e) {
    yield put({ type: ACTION.SET_OFFER_STATUS_ERROR, error: e.response });
  }
}
export function* setOfferStatusByModeratorSaga(action) {
  try {
    const { data } = yield restController.setOfferStatus(action.data);
    const offers = yield select((state) => state.offersStore.offers);

    offers[offers.findIndex((offer) => offer.id === data.id)].status = data.status;
    const pendingOffers = offers.filter(offer => offer.status === CONSTANTS.OFFER_STATUS_PENDING)

    yield put({ type: ACTION.SET_OFFER_STATUS_BY_MODERATOR_SUCCESS, data: offers, count: pendingOffers.length });
  } catch (e) {
    yield put({ type: ACTION.SET_OFFER_STATUS_BY_MODERATOR_ERROR, error: e.response });
  }
}
export function* getOffersSaga() {
  yield put({ type: ACTION.GET_OFFERS_FOR_MODERATOR_REQUEST });
  try {
    const { data } = yield restController.getOffers();
    const { resOffers } = data;
    yield put({ type: ACTION.GET_OFFERS_FOR_MODERATOR_SUCCESS, data: resOffers });
  } catch (e) {
    yield put({ type: ACTION.GET_OFFERS_FOR_MODERATOR_ERROR, error: e.response });
  }
}
