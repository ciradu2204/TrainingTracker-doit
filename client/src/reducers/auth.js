import {
  AUTH,
  SIGNINERROR,
  LOGOUT,
  SIGNUPERROR,
} from "../constants/actionTypes";

const authReducer = (
  state = { authData: null, signUpErrors: null, signInErrors: null },
  action
) => {
  switch (action.type) {
    case AUTH:
       localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    case SIGNINERROR:
      return { ...state, signUpErrors: null, signInErrors: action?.errorMessage.error };
    case SIGNUPERROR:
       return { ...state, signInErrors: null, signUpErrors: action?.errorMessage.error };
    default:
      return state;
  }
};

export default authReducer;
