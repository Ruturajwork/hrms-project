import {
  USER_CHECK_IN_FAIL,
  USER_CHECK_IN_SUCCESS,
  USER_CHECK_IN_REQUEST,
  USER_CHECK_OUT_FAIL,
  USER_CHECK_OUT_REQUEST,
  USER_CHECK_OUT_RESET,
  USER_CHECK_OUT_SUCCESS,
  GET_TODAYS_ATTENDANCE_REQUEST,
  GET_TODAYS_ATTENDANCE_SUCCESS,
  GET_TODAYS_ATTENDANCE_FAIL,
  USER_CHECK_IN_RESET,
  GET_ALL_ATTENDANCE_REQUEST,
  GET_ALL_ATTENDANCE_SUCCESS,
  GET_ALL_ATTENDANCE_FAIL,
  GET_ALL_ATTENDANCE_RESET,
  GET_ALL_USERS_ATTENDANCE_REQUEST,
  GET_ALL_USERS_ATTENDANCE_SUCCESS,
  GET_ALL_USERS_ATTENDANCE_FAIL,
  GET_ALL_USERS_ATTENDANCE_RESET,
} from "../constants/attendanceConstants";

export const checkInUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CHECK_IN_REQUEST:
      return { ...state, loading: true };
    case USER_CHECK_IN_SUCCESS:
      return { ...state, loading: false, success: true };
    case USER_CHECK_IN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case USER_CHECK_IN_RESET:
      return { loading: false, error: null, success: false, state: {} };
    default:
      return state;
  }
};

export const checkOutUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CHECK_OUT_REQUEST:
      return { ...state, loading: true };
    case USER_CHECK_OUT_SUCCESS:
      return { ...state, loading: false, success: true };
    case USER_CHECK_OUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case USER_CHECK_OUT_RESET:
      return { loading: false, error: null, success: false, state: {} };
    default:
      return state;
  }
};

export const todaysAttendanceReducer = (state = { attendance: {} }, action) => {
  switch (action.type) {
    case GET_TODAYS_ATTENDANCE_REQUEST:
      return { loading: true, attendance: {} };
    case GET_TODAYS_ATTENDANCE_SUCCESS:
      return { loading: false, attendance: action.payload };
    case GET_TODAYS_ATTENDANCE_FAIL:
      return { loading: false, error: action.payload, attendance: {} };
    default:
      return state;
  }
};

export const allAttendanceReducer = (state = { attendanceAll: [] }, action) => {
  switch (action.type) {
    case GET_ALL_ATTENDANCE_REQUEST:
      return { loading: true, attendanceAll: [] };
    case GET_ALL_ATTENDANCE_SUCCESS:
      return { loading: false, attendanceAll: action.payload };
    case GET_ALL_ATTENDANCE_FAIL:
      return { loading: false, error: action.payload, attendanceAll: [] };
    case GET_ALL_ATTENDANCE_RESET:
      return { attendanceAll: [] };
    default:
      return state;
  }
};


export const allUsersAttendanceReducer = (state = { attendance: [] }, action) => {
  switch (action.type) {
    case GET_ALL_USERS_ATTENDANCE_REQUEST:
      return { loading: true, attendance: [] };
    case GET_ALL_USERS_ATTENDANCE_SUCCESS:
      return { loading: false, attendance: action.payload };
    case GET_ALL_USERS_ATTENDANCE_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_USERS_ATTENDANCE_RESET:
      return { attendance: [] };
    default:
      return state;
  }
};