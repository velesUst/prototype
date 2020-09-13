//action types
const AUTH_CALL_REQUEST = "AUTH_CALL_REQUEST";
const AUTH_CALL_SUCCESS = "AUTH_CALL_SUCCESS";
const AUTH_CALL_FAILURE = "AUTH_CALL_FAILURE";

export interface UserStore {
  fetchingAuth?: boolean;
  token?: string;
  userName?: string;
  role?: string;
  errorText?: string;
}
const initialState = {
  fetchingAuth: false,
  token: undefined,
  userName: 'Аноним',
  role: null,
  errorText: ''
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_CALL_REQUEST:
      return { ...state, fetchingAuth: true };
      break;
    case AUTH_CALL_SUCCESS:
      return { ...state, fetchingAuth: false, token: action.token, userName: action.userName };
      break;
    case AUTH_CALL_FAILURE:
      return { ...state, fetchingAuth: false, errorText: action.errorText };
      break;
    default:
      return state;
  }
}