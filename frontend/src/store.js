import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";

import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducer";
import {
  checkInUserReducer,
  checkOutUserReducer,
  todaysAttendanceReducer,
  allAttendanceReducer,
  allUsersAttendanceReducer,
} from "./reducers/attendanceReducer";
import {
  leaveRequestCreateReducer,
  leaveRequestListReducer,
  leaveRequestAdminListReducer,leaveRequestUpdateReducer
} from "./reducers/approveReducer";


const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  checkInUser: checkInUserReducer,
  checkOutUser: checkOutUserReducer,
  todaysAttendance: todaysAttendanceReducer,
  allAttendance: allAttendanceReducer,
  leaveRequestCreate: leaveRequestCreateReducer,
  leaveRequestList: leaveRequestListReducer,
  leaveRequestAdminList: leaveRequestAdminListReducer,
  leaveRequestUpdate: leaveRequestUpdateReducer,
  allUsersAttendance:allUsersAttendanceReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
