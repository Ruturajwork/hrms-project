import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Icon,
  Flex,
  Heading,
  Grid,
  Table,
  Tr,
  Th,
  Thead,
  Tbody,
  Td,
} from "@chakra-ui/react";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  IoCheckmarkCircleSharp,
  IoCloseCircleSharp,
  IoPencilSharp,
  IoTrashBinSharp,
  IoAdd,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  createLeaveRequestAction,
  listLeaveRequests,
} from "../actions/approveAction"; // Replace with your actual action
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { getUserDetails } from "../actions/userActions";
const RequestLeaveScreen = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");
  const [successCreate, setSuccessCreate] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const leaveRequestCreate = useSelector((state) => state.leaveRequestCreate);
  const { loading, error, success } = leaveRequestCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const leaveRequestList = useSelector((state) => state.leaveRequestList);
  const { loading: myLoading, error: myList, leaveRequests } = leaveRequestList;
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(listLeaveRequests());
      dispatch(getUserDetails("profile"));
    }
  }, [userInfo, navigate, dispatch]);

  useEffect(() => {
    if (success && successCreate) {
      dispatch(listLeaveRequests());
      setSuccessCreate(false);
    }
  }, [dispatch, successCreate, success]);
  // console.log(userInfo)
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createLeaveRequestAction({
        startDate,
        endDate,
        leaveType,
        reason,
      })
    );
    setSuccessCreate(true);
  };

  return (
    <>
      <Grid templateColumns={{ sm: "1fr", md: "1fr 1fr" }} py="5" gap="10">
        <Flex w="full" alignItems="center" justifyContent="center" py="5">
          <FormContainer>
            <Heading as="h2" mb="4">
              Request leave
            </Heading>
            {error && <Message type="error">{error}</Message>}
            {success &&successCreate ?<Message type="success">SuccessFully Created A Request</Message>:null}
            <form onSubmit={submitHandler}>
              <FormControl id="startDate" isRequired mb={4}>
                <FormLabel>Start Date</FormLabel>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </FormControl>

              <FormControl id="endDate" isRequired mb={4}>
                <FormLabel>End Date</FormLabel>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </FormControl>

              <FormControl id="pendingLeaves" isRequired mb={4}>
                <FormLabel>Pending Leaves</FormLabel>
                <Input
                  type="number"
                  value={user.leaveCount} // Ensure this is provided by the backend
                  readOnly
                  disabled
                />
              </FormControl>

              <FormControl id="leaveType" isRequired mb={4}>
                <FormLabel>Leave Type</FormLabel>
                <Select
                  placeholder="Select leave type"
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                >
                  <option value="sick">Sick</option>
                  <option value="vacation">Vacation</option>
                  <option value="personal">Personal</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>

              <FormControl id="reason" isRequired mb={4}>
                <FormLabel>Reason</FormLabel>
                <Textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </FormControl>

              <Button
                mt={4}
                colorScheme="teal"
                isLoading={loading}
                type="submit"
                isFullWidth
              >
                Submit
              </Button>
            </form>
          </FormContainer>
        </Flex>
        <Flex direction="column">
          <Heading as="h2" mb="4">
            My Requests
          </Heading>

          <Table variant="striped" colorScheme="gray" size="sm">
            <Thead>
              <Tr>
                <Th>Sr No</Th>
                <Th>Leave Type</Th>
                <Th>Start Date</Th>

                <Th>End Date</Th>
                <Th>Reason</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {leaveRequests?.map((leave, index) => (
                <Tr key={leave._id}>
                  <Td>{index + 1}</Td>
                  <Td>{leave.leaveType}</Td>
                  <Td>{leave.startDate.substring(0, 10)}</Td>
                  <Td>{leave.endDate.substring(0, 10)}</Td>
                  <Td>{leave.reason}</Td>
                  <Td>{leave.status}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
      </Grid>
    </>
  );
};

export default RequestLeaveScreen;
