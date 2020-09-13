import { combineReducers, Reducer } from 'redux';
import { userReducer, UserStore } from './user';
import { contentA, ContentA } from './contentA';


// The top-level state object
export interface ApplicationState {
  user: UserStore;
  contentA: ContentA;
}

export const rootReducer = combineReducers({
  user: userReducer,
  contentA: contentA
})
export default rootReducer;

