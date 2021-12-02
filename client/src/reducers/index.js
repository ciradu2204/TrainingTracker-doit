import { combineReducers } from "redux";

import weeklyPlans from "./weeklyPlans"
import auth from "./auth";

export default combineReducers({
    weeklyPlans, auth
})