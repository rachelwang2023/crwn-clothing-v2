import { CATEGORIES_ACTION_TYPES } from "./categories.types";


const setCategories = (categories) => {
  return {
    type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES,
    payload: categories
  }
}

export default setCategories;