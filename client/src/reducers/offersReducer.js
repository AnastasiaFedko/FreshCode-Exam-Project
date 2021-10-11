import ACTION from '../actions/actionTypes';
import CONSTANTS from '../constants';

const initialState = {
    offersModeView: CONSTANTS.OFFERS_INFO_MODE,
    offers: [], 
    error: null,
    isFetching: true,
    setOfferStatusError: null,
    countPending: 0,
};

function offersReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION.CHANGE_OFFERS_MODE_VIEW: {
            return {
                ...state,
                offersModeView: action.data,
            };
        }
        case ACTION.CLEAR_SET_OFFER_STATUS_BY_MODERATOR_ERROR: {
          return {
            ...state,
            setOfferStatusError: null,
          };
        }
        case ACTION.SET_OFFER_STATUS_BY_MODERATOR_SUCCESS: {
            return {
                ...state,
                offers: action.data,
                countPending: action.count,
            }
        }
        case ACTION.SET_OFFER_STATUS_BY_MODERATOR_ERROR: {
            return {
                ...state,
                setOfferStatusError: action.error,
            }
        }
        case ACTION.GET_OFFERS_FOR_MODERATOR_REQUEST: {
            return {
              ...state,
              isFetching: true,
              error: null,
              offers: [],
            };
          }
          case ACTION.GET_OFFERS_FOR_MODERATOR_SUCCESS: {
            return {
              ...state,
              isFetching: false,
              error: null,
              offers: action.data,
            };
          }
          case ACTION.GET_OFFERS_FOR_MODERATOR_ERROR: {
            return {
              ...state,
              isFetching: false,
              error: action.error,
            };
          }
          case ACTION.CLEAR_OFFERS_LIST: {
            return {
              ...state,
              error: null,
              offers: [],
            };
          }

        default:
            return state;
    }
}

export default offersReducer;