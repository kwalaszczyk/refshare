import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorsReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";
import refsReducer from "./refsReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
  refs: refsReducer
});
