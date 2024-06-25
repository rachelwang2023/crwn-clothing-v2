import { categoriesReducer } from "./categories/categories.reducer";
import userReducer from "./user/user.reducer";
import { combineReducers } from "redux";
export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer
})