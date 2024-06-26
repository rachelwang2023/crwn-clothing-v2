import { CATEGORIES_ACTION_TYPES } from "./categories.types";


export const CATEGORIES_INITIAL_STATE = {
  categories: []
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => 
{
  //console.log('Reducer State:', state); 
  //console.log('Reducer Action:', action); 
  const { type, payload } = action;

  switch(type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
      return {...state, categories: payload};
    default:
      return state;
  }
}

