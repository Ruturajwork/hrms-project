import axios from "axios";
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
  GET_ALL_ATTENDANCE_REQUEST,
  GET_ALL_ATTENDANCE_SUCCESS,
  GET_ALL_ATTENDANCE_FAIL,GET_ALL_USERS_ATTENDANCE_REQUEST,
  GET_ALL_USERS_ATTENDANCE_SUCCESS,
  GET_ALL_USERS_ATTENDANCE_FAIL,
  GET_ALL_USERS_ATTENDANCE_RESET,
} from "../constants/attendanceConstants";

// Action to handle user check-in
export const checkIn = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_CHECK_IN_REQUEST });

    // Get user information from Redux state
    const {
      userLogin: { userInfo },
    } = getState();

    // Construct headers with authorization token
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    // Perform API call to check in the user, pass user information in the request headers
    const { data } = await axios.post("/api/attendance/checkin", {}, config);

    dispatch({
      type: USER_CHECK_IN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_CHECK_IN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action to handle user check-out
export const checkOut = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_CHECK_OUT_REQUEST });

    // Get user information from Redux state
    const {
      userLogin: { userInfo },
    } = getState();

    // Construct headers with authorization token
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    // Perform API call to check out the user, pass user information in the request headers
    const { data } = await axios.put("/api/attendance/checkout", {}, config);

    dispatch({
      type: USER_CHECK_OUT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_CHECK_OUT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action to reset check-out state
export const resetCheckOut = () => (dispatch) => {
  dispatch({ type: USER_CHECK_OUT_RESET });
};

export const getTodaysAttendanceAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TODAYS_ATTENDANCE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Use Axios to make the API call
    const response = await axios.get("/api/attendance/today", config);

    dispatch({
      type: GET_TODAYS_ATTENDANCE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_TODAYS_ATTENDANCE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllAttendance = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_ATTENDANCE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/attendance/allattendance`, config);

    dispatch({
      type: GET_ALL_ATTENDANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_ATTENDANCE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getAllUsersAttendance = () => async (dispatch,getState) => {
  try {
    dispatch({ type: GET_ALL_USERS_ATTENDANCE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/attendance/all",config); // Adjust the API endpoint accordingly

    dispatch({
      type: GET_ALL_USERS_ATTENDANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_ATTENDANCE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};