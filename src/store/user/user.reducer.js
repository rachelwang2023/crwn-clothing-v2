import  { USER_ACTION_TYPES } from '/Users/athenawang/Documents/GitHub/crwn-clothing-v2/src/store/user/user.types.js';

const INITIL_STATE = {
  currentUser: null
}

const userReducer = (state = INITIL_STATE, action) => {
  const { type, payload } = action;

  switch(type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER: 
      return {
        ...state,
        currentUser: payload
      }
    default:
      return state;
  }
}

export default userReducer;






