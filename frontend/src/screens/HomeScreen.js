import React, { useState, useEffect } from "react";
import {
  Heading,
  Button,
  Box,
  Flex,
  Icon,
  Skeleton,
  layout,
} from "@chakra-ui/react";
import { IoGitPullRequestSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import moment from "moment-timezone";
import {
  checkIn,
  checkOut,
  getTodaysAttendanceAction,
  getAllAttendance,
} from "../actions/attendanceAction";
import {
  USER_CHECK_IN_RESET,
  USER_CHECK_OUT_RESET,
} from "../constants/attendanceConstants";
import Message from "../components/Message";
import MyCalendar from "../components/Calender";

const HomeScreen = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);

  const todaysAttendance = useSelector((state) => state.todaysAttendance);
  const { loading, error, attendance } = todaysAttendance;
  const allAttendance = useSelector((state) => state.allAttendance);
  const {
    loading: allAttandance,
    error: allError,
    attendanceAll,
  } = allAttendance;

  const checkInUser = useSelector((state) => state.checkInUser);
  const {
    loading: checkInLoading,
    error: checkInError,
    success: checkInSuccess,
  } = checkInUser;

  const checkOutUser = useSelector((state) => state.checkOutUser);
  const {
    loading: checkOutLoading,
    error: checkOutError,
    success: checkOutSuccess,
  } = checkOutUser;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [navigate]);

  // Fetch today's attendance when component mounts
  useEffect(() => {
    dispatch(getTodaysAttendanceAction());
    dispatch(getAllAttendance());
  }, [dispatch]);

  // Function to update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [latestRecord, setLatestRecord] = useState(null);

  useEffect(() => {
    if (success && (checkInSuccess || checkOutSuccess)) {
      setLatestRecord(null);
      dispatch(getTodaysAttendanceAction());
      setSuccess(false);
      dispatch({ type: USER_CHECK_OUT_RESET });
      dispatch({ type: USER_CHECK_IN_RESET });
    }
  }, [success, checkInSuccess, checkOutSuccess, dispatch]);

  // Set latestRecord when attendance data changes
  useEffect(() => {
    if (!loading) {
      setLatestRecord(attendance); // Set the latest record or null if no attendance data
    }
  }, [attendance, loading]);

  const convertToIST = (time) => {
    if (!time) return null;
    return moment
      .tz(time, "UTC")
      .tz("Asia/Kolkata")
      .format("DD-MM-YYYY hh:mm A");
  };

  const buttonStyle = {
    height: "40px", // Adjust the height as needed
    width: "120px", // Adjust the width as needed
  };

  const calculateTotalTimeWorked = (record) => {
    if (!record || !record.loginTime || !record.logoutTime)
      return { totalHours: 0, totalMinutes: 0 };

    const loginTime = new Date(record.loginTime);
    const logoutTime = new Date(record.logoutTime);
    const totalMilliseconds = logoutTime - loginTime;

    const totalHours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
    const totalMinutes = Math.floor(
      (totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );

    return { totalHours, totalMinutes };
  };

  const totalTime = calculateTotalTimeWorked(latestRecord);

  // console.log(totalTime);
  const isEmpty = (obj) => {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
  };

  // Initialize latestRecord as null
  const handleCheckInOrOut = () => {
    if (!isEmpty(latestRecord) && !latestRecord.logoutTime) {
      dispatch(checkOut());
    } else {
      dispatch(checkIn());
    }
    setSuccess(true); // Set success to true to trigger the useEffect
  };

  return (
    <>
      <Flex mb="5" alignItems="center" justifyContent="space-between">
        <Heading as="h1" mb="8" fontSize="xl">
          HRMS Attendance
        </Heading>
        <Button as={RouterLink} to={`/requestleave`} colorScheme="teal">
          <Icon
            as={IoGitPullRequestSharp}
            mr="2"
            fontSize="xl"
            fontWeight="bold"
          />
          Request Leave
        </Button>
      </Flex>

      <Box bgColor="white" rounded="lg" shadow="lg" px="5" py="5">
        <Flex mb="5" alignItems="center" gap="10">
          <Box flex="50%">
            <Heading as="h2" mb="4" fontSize="xl">
              Current Time
            </Heading>
            <Heading as="h2" mb="8" fontSize="xl">
              {currentTime}
            </Heading>
          </Box>
          <Box flex="50%">
            <Heading as="h2" mb="4" fontSize="xl">
              Punching
            </Heading>
            {checkInError || checkOutError ? (
              <Message type="error">{checkInError || checkOutError}</Message>
            ) : null}
            <Heading as="h2" mb="4" fontSize="xl">
              {loading || checkInLoading || checkOutLoading ? (
                // Show loading indicator while processing
                <Skeleton
                  height={buttonStyle.height}
                  width={buttonStyle.width}
                />
              ) : // Show check-in or check-out button based on the latestRecord
              attendance && !isEmpty(attendance) ? (
                <Button
                  colorScheme={
                    latestRecord && !latestRecord.logoutTime ? "red" : "teal"
                  }
                  style={buttonStyle}
                  onClick={handleCheckInOrOut}
                >
                  {latestRecord && !latestRecord.logoutTime
                    ? "Check Out"
                    : "Check In"}
                </Button>
              ) : (
                <Button
                  colorScheme="teal"
                  style={buttonStyle}
                  onClick={handleCheckInOrOut}
                >
                  Check In
                </Button>
              )}
            </Heading>
            <Heading as="h2" mb="8" fontSize="xl">
              Login Time: {convertToIST(latestRecord?.loginTime)}
            </Heading>
            <Heading as="h2" mb="8" fontSize="xl">
              Logout Time: {convertToIST(latestRecord?.logoutTime)}
            </Heading>
            <Heading as="h2" mb="8" fontSize="xl">
              Attendance Status: {latestRecord?.status}
            </Heading>
          </Box>
        </Flex>
        <Flex>
          <Box>
            <Heading as="h2" mb="4" fontSize="xl">
              Total Time Worked Today
            </Heading>
            <Heading as="h2" mb="4" fontSize="xl">
              {" "}
              {totalTime.totalHours}h {totalTime.totalMinutes}m
            </Heading>
          </Box>
        </Flex>{" "}
        <Heading as="h2" mb="8" fontSize="xl" alignItems="center">
          All Attandance
        </Heading>
        {latestRecord && <MyCalendar attendanceData={attendanceAll} />}{" "}
        {/* Conditionally render MyCalendar */}
      </Box>
    </>
  );
};

export default HomeScreen;
