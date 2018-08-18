import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorsReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer
});
