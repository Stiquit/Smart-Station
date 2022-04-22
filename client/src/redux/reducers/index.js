import { combineReducers } from "redux";
import token from "./tokenReducer";
import client from "./clientReducer";
export default combineReducers({
  token,
  client,
});
