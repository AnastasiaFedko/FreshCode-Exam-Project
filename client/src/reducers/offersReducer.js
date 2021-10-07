import ACTION from '../actions/actionTypes';
import CONSTANTS from '../constants';

const initialState = {
    offersModeView: CONSTANTS.OFFERS_INFO_MODE,
    offers: [], //{
    //id, 
    //status, 
    //text, 
    //fileName
    //originalFileName,
    //contestData: {id, orderId, priority, contestType}
    //creatorData: {id, avatar, firstName, lastName, email, rating }
    //}
    error: null,
    isFetching: true,

};

function offersReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION.CHANGE_OFFERS_MODE_VIEW: {
            return {
                ...state,
                offersModeView: action.data,
            };
        }
        case ACTION.CHANGE_STORE_FOR_STATUS_BY_MODERATOR: {
            const newOffers = JSON.parse(JSON.stringify(state.offers));
            const index = newOffers.findIndex((offer) => offer.id === action.data.id);
            newOffers[index].status = action.data.status;
            return {
                ...state,
                offers: newOffers,
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
              offers: action.data.offers,
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