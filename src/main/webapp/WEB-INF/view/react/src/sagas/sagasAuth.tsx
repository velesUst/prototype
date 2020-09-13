import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherAuthSaga() {
  yield takeLatest("AUTH_CALL_REQUEST", workerAuthSaga);
}

// worker saga: makes the api call when watcher saga sees the action
function* workerAuthSaga( action ) {
  try {
    const response = yield call(fetchToken,  { login: action.payload.login, password: action.payload.password });

    // dispatch a success action to the store with the new dog
    yield put({ type: "AUTH_CALL_SUCCESS", token: response.headers.authorization, userName: action.payload.login });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "AUTH_CALL_FAILURE", errorText: error });
  }
}

// function that returns api response
function fetchToken(  payload: { login: string, password: string }  ) {
  return axios({
    method: "get",
    url: process.env.PUBLIC_URL+"/api/authenticate?username="+payload.login+"&password="+payload.password
  });
}
function fetchUserInfo() {
  return axios({
    method: "get",
    url: "https://dog.ceo/api/breeds/image/random"
  });
}
