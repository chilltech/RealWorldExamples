import { userConstants } from '../_constants';
import { userLocalDb } from '../_storelocal';

const initialState = {
  token: "",
  isLoggedIn: false
};

export function authentication(state = initialState, action) {
  let token = userLocalDb.getTokenSync() ||"";

  if (typeof token !== "undefined" && token.length > 0) {
    state.token = token;
  }

  switch (action.type) {
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        isLoggedIn: true
      };
    case userConstants.LOGOUT,
      userConstants.LOGIN_FAILURE:
      return initialState;
    default:
      return state;
  }
}