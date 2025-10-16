import axios from "axios";
import {
  LEAVE_REQUEST_CREATE_REQUEST,
  LEAVE_REQUEST_CREATE_SUCCESS,
  LEAVE_REQUEST_CREATE_FAIL,
  LEAVE_REQUEST_LIST_REQUEST,
  LEAVE_REQUEST_LIST_SUCCESS,
  LEAVE_REQUEST_LIST_FAIL,
  LEAVE_REQUEST_LIST_REQUEST_ADMIN,
  LEAVE_REQUEST_LIST_SUCCESS_ADMIN,
  LEAVE_REQUEST_LIST_FAIL_ADMIN,
  LEAVE_REQUEST_UPDATE_REQUEST,
  LEAVE_REQUEST_UPDATE_SUCCESS,
  LEAVE_REQUEST_UPDATE_FAIL,
} from "../constants/approveConstants";

export const createLeaveRequestAction =
  (leaveRequest) => async (dispatch, getState) => {
    try {
      dispatch({ type: LEAVE_REQUEST_CREATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post("/api/leaves", leaveRequest, config);

      dispatch({ type: LEAVE_REQUEST_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: LEAVE_REQUEST_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listLeaveRequests = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LEAVE_REQUEST_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/leaves", config); // Adjust the endpoint as per your backend route

    dispatch({
      type: LEAVE_REQUEST_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LEAVE_REQUEST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listLeaveAdminRequests = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LEAVE_REQUEST_LIST_REQUEST_ADMIN });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/leaves/allrequest", config); // Adjust the endpoint as per your backend route

    dispatch({
      type: LEAVE_REQUEST_LIST_SUCCESS_ADMIN,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LEAVE_REQUEST_LIST_FAIL_ADMIN,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const updateLeaveRequest = ({id, pendingLeaves}) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LEAVE_REQUEST_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/leaves/${id}/status`, { pendingLeaves }, config);

    dispatch({
      type: LEAVE_REQUEST_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LEAVE_REQUEST_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


