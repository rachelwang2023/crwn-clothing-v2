import { createAction } from "../../utils/reducer/reducer.utils";
import  { USER_ACTION_TYPES } from '/Users/athenawang/Documents/GitHub/crwn-clothing-v2/src/store/user/user.types.js';

const setCurrentUser = (user) => createAction(
  USER_ACTION_TYPES.SET_CURRENT_USER, user
  ? {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    }
    : null,
);

export default setCurrentUser;