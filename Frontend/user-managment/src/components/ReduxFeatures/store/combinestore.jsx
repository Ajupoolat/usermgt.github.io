import { combineReducers } from "redux";
import userlistedReducer from "../userlist/userlistReducer";
import adminAuthReducer from '../auth/authAdmin';
import authReducer from '../auth/authslce';


const rootReducer=combineReducers({

    userdata:userlistedReducer,
    adminAuth:adminAuthReducer,
    auth:authReducer
})

export default rootReducer;