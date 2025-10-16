import {
  LEAVE_REQUEST_CREATE_REQUEST,
  LEAVE_REQUEST_CREATE_SUCCESS,
  LEAVE_REQUEST_CREATE_FAIL,
  LEAVE_REQUEST_UPDATE_REQUEST,
  LEAVE_REQUEST_UPDATE_SUCCESS,
  LEAVE_REQUEST_UPDATE_FAIL,
  LEAVE_REQUEST_LIST_REQUEST,
  LEAVE_REQUEST_LIST_SUCCESS,
  LEAVE_REQUEST_LIST_FAIL,
  LEAVE_REQUEST_LIST_SUCCESS_ADMIN,
  LEAVE_REQUEST_LIST_FAIL_ADMIN,
  LEAVE_REQUEST_LIST_REQUEST_ADMIN,
  LEAVE_REQUEST_UPDATE_RESET
} from "../constants/approveConstants";

export const leaveRequestCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case LEAVE_REQUEST_CREATE_REQUEST:
      return { loading: true };
    case LEAVE_REQUEST_CREATE_SUCCESS:
      return { loading: false, success: true, leaveRequest: action.payload };
    case LEAVE_REQUEST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Reducer to manage leave request list state
export const leaveRequestListReducer = (
  state = { leaveRequests: [] },
  action
) => {
  switch (action.type) {
    case LEAVE_REQUEST_LIST_REQUEST:
      return { loading: true, leaveRequests: [] };
    case LEAVE_REQUEST_LIST_SUCCESS:
      return { loading: false, leaveRequests: action.payload };
    case LEAVE_REQUEST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const leaveRequestAdminListReducer = (
  state = { leaveListRequests: [] },
  action
) => {
  switch (action.type) {
    case LEAVE_REQUEST_LIST_REQUEST_ADMIN:
      return { loading: true, leaveListRequests: [] };
    case LEAVE_REQUEST_LIST_SUCCESS_ADMIN:
      return { loading: false, leaveListRequests: action.payload };
    case LEAVE_REQUEST_LIST_FAIL_ADMIN:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const leaveRequestUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case LEAVE_REQUEST_UPDATE_REQUEST:
      return { loading: true };
    case LEAVE_REQUEST_UPDATE_SUCCESS:
      return { loading: false, success: true, leaveRequest: action.payload };
    case LEAVE_REQUEST_UPDATE_FAIL:
      return { loading: false, error: action.payload };
      case LEAVE_REQUEST_UPDATE_RESET:
        return {}
    default:
      return state;
  }
};