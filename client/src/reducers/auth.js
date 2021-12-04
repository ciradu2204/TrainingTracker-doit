import {
  AUTH,
  SIGNINERROR,
  LOGOUT,
  SIGNUPERROR,
} from "../constants/actionTypes";
const initialState = { authData: null, signUpErrors: null, signInErrors: null }
const authReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AUTH:
       localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return {...initialState };
    case SIGNINERROR:
      return { ...state, signUpErrors: null, signInErrors: action?.errorMessage.error };
    case SIGNUPERROR:
       return { ...state, signInErrors: null, signUpErrors: action?.errorMessage.error };
    default:
      return state;
  }
};

export default authReducer;
