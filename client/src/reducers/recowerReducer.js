import ACTION from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  error: null,
  success: {
      result: false,
      message: ''
  },
};

function recowerReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION.RECOVER_PASSWORD_ACTION_REQUEST: {
      return {
        isFetching: true,
        error: null,
        success: {
            result: false,
            message: ''
        },
      };
    }
    case ACTION.RECOVER_PASSWORD_ACTION_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        success: {
            result: true,
            message: action.data.success,
        },
      };
    }
    case ACTION.RECOVER_PASSWORD_ACTION_ERROR: {
      return {
        isFetching: false,
        error: action.error,
        success: {
            result: false,
            message: ''
        },
      };
    }
    default:
      return state;
  }
}

export default recowerReducer;
