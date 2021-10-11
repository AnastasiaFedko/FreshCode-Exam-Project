import { put } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as userController from '../api/rest/userController';

export function* loginSaga(action) {
  yield put({ type: ACTION.AUTH_ACTION_REQUEST });
  try {
    yield userController.loginRequest(action.data);
    action.history.replace('/');
    yield put({ type: ACTION.AUTH_ACTION_SUCCESS });
  } catch (err) {
    yield put({ type: ACTION.AUTH_ACTION_ERROR, error: err.response });
  }
}

export function* registerSaga(action) {
  yield put({ type: ACTION.AUTH_ACTION_REQUEST });
  try {
    yield userController.registerRequest(action.data);
    action.history.replace('/');
    yield put({ type: ACTION.AUTH_ACTION_SUCCESS });
  } catch (e) {
    yield put({ type: ACTION.AUTH_ACTION_ERROR, error: e.response });
  }
}

export function* recoverPasswordSaga(action) {
  yield put({ type: ACTION.RECOVER_PASSWORD_ACTION_REQUEST });
  try {
    const { data } = yield userController.recoverPasswordRequest(action.data);
    yield put({ type: ACTION.RECOVER_PASSWORD_ACTION_SUCCESS, data: { success: data.success }});
  } catch (err) {
    yield put({ type: ACTION.RECOVER_PASSWORD_ACTION_ERROR, error: err.response });
  }
}
