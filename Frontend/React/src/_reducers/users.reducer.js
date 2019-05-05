import { userConstants } from '../_constants';

const initialState = {
  Profile: {},
  loading: true,
  error: null
};

export function user(state = initialState, action) {
  switch (action.type) {
    case userConstants.GET_REQUEST:
      return {
        loading: true
      };
    case userConstants.GET_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user
      };
    case userConstants.GET_FAILURE:
      return { 
        loading: false,
        error: action.error
      };
    default:
      return state
  }
}