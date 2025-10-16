import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GiCancel } from "react-icons/gi";
import {
  IoCheckmarkCircleSharp,
  IoCloseCircleSharp,
  IoPencilSharp,
  IoTrashBinSharp,
  IoAdd
} from "react-icons/io5";
import { IoCheckbox } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listLeaveAdminRequests, updateLeaveRequest } from "../actions/approveAction";
import { LEAVE_REQUEST_UPDATE_RESET } from "../constants/approveConstants";

const LeaveRequestListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [successAction,setSuccessAction]=useState(null)

  const leaveRequestAdminList = useSelector((state) => state.leaveRequestAdminList);
  const { loading, error, leaveListRequests } = leaveRequestAdminList;

  const leaveRequestUpdate = useSelector((state) => state.leaveRequestUpdate);
  const { loading:Update, error:errorUpdate, success } = leaveRequestUpdate;


  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listLeaveAdminRequests());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);


  useEffect(() => {
    if (success && successAction) {
      dispatch(listLeaveAdminRequests());
      setSuccessAction(false);
      dispatch({type:LEAVE_REQUEST_UPDATE_RESET})
    }
  }, [dispatch, successAction, success]);
  const handleAction = (id, action) => {
    
    dispatch(updateLeaveRequest({id,  pendingLeaves:action }));
    setSuccessAction(true);
  };
  return (
    <>
      <Flex mb="5" alignItems="center" justifyContent="space-between">
        <Heading as="h1" fontSize="3xl" mb="5">
          Requested Approval List
        </Heading>
      </Flex>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Box bgColor="white" rounded="lg" shadow="lg" px="5" py="5">
          {errorUpdate ? (
        <Message type="error">{errorUpdate}</Message>):null}
          <Table variant="striped" colorScheme="gray" size="sm">
            <Thead>
              <Tr>
                <Th>Sr No</Th>
                <Th>Requested User Name</Th>
                
                <Th>Leave Type</Th>
                <Th>Starts Date</Th>
                <Th>Ends Date</Th>
                <Th>Reason</Th>
                <Th>Pending Leaves</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {leaveListRequests.map((request, index) => (
                <Tr key={request._id}>
                  <Td>{index + 1}</Td>
                  <Td>{request.user.name}</Td>
                 
                  <Td>{request.leaveType}</Td>
                  <Td>{request.startDate.substring(0, 10)}</Td>
                  <Td>{request.endDate.substring(0, 10)}</Td>
                  <Td>{request.reason}</Td>
                  <Td>{request.pendingLeaves}</Td>
                  <Td>{request.status}</Td>
                  <Td>
                    {request.status === 'Pending' && (
                      <>
                        <Button
                          colorScheme="green"
                          disabled={request.status !== 'Pending'}
                          mr="4"
                          onClick={() => handleAction(request._id, 'Approved')}
                        
                        >
                         <Icon as={FaCheckCircle} color="white" size="sm" />
                        </Button>
                        <Button
                         
                          disabled={request.status !== 'Pending'}
                          mr="4"
                          colorScheme="red"
                          onClick={() => handleAction(request._id, 'Rejected')}
                        >
                            <Icon as={GiCancel} color="white" size="sm" />
                       
                        </Button>
                      </>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </>
  );
};

export default LeaveRequestListScreen;
