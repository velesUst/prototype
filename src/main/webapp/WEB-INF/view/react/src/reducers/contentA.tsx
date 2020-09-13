//action types
const API_CALL_REQUEST = "API_CALL_REQUEST";
const API_CALL_SUCCESS = "API_CALL_SUCCESS";
const API_CALL_FAILURE = "API_CALL_FAILURE";

/* === REDUCER === */

export interface ContentA {
  fetching?: boolean;
  dog?: string;
  error?: string;
}

const initialState = {
  fetching: false,
  dog: 'weerrrr',
  error: null
};

export function contentA(state = initialState, action) {
  switch (action.type) {
    case API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };
      break;
    case API_CALL_SUCCESS:
      return { ...state, fetching: false, dog: action.dog };
      break;
    case API_CALL_FAILURE:
      return { ...state, fetching: false, dog: null, error: action.error };
      break;
    default:
      return state;
  }
}