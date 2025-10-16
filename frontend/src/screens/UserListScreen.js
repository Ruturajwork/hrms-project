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
  
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { useEffect ,useState} from "react";
import {
  IoCheckmarkCircleSharp,
  IoCloseCircleSharp,
  IoPencilSharp,
  IoTrashBinSharp,IoAdd
} from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { deleteUser, listUsers } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { USER_DETAILS_RESET, USER_UPDATE_RESET } from "../constants/userConstants";

import MyCalendar from "../components/Calender";
import { getAllUsersAttendance } from "../actions/attendanceAction";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  
  const allUsersAttendance = useSelector((state) => state.allUsersAttendance);
  const { attendance } = allUsersAttendance;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
      dispatch(getAllUsersAttendance())
      dispatch({type:USER_UPDATE_RESET})
      dispatch({type:USER_DETAILS_RESET})
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, success]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id));
    }
  };

  // ***************Drawer Open *******************//
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedUserAttendance, setSelectedUserAttendance] = useState([]);
  const handleOpenDrawer = (userId) => {
    const userAttendance = attendance.filter((item) => item.userId === userId);
    setIsDrawerOpen(true);
    setSelectedUserAttendance(userAttendance);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    
  };


  return (
    <>
       <Flex mb="5" alignItems="center" justifyContent="space-between">
        <Heading as="h1" fontSize="3xl" mb="5">
          Users
        </Heading>
        <Button  as={RouterLink}
                        to={`/admin/register`}colorScheme="teal">
          <Icon as={IoAdd} mr="2" fontSize="xl" fontWeight="bold" />
          Create User
        </Button>
      </Flex>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Box bgColor="white" rounded="lg" shadow="lg" px="5" py="5">
          <Table variant="striped" colorScheme="gray" size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>NAME</Th>
                <Th>EMAIL</Th>
                <Th>DEPARTMENT</Th>
                <Th>DESIGNATION</Th>
                <Th>EMPLOYEECODE</Th>
                <Th>OFFICETIMINGS</Th>
                <Th>ATTENDANCES</Th>
                <Th>ADMIN</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user._id}>
                  <Td>{user._id}</Td>
                  <Td>{user.name}</Td>
                  <Td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </Td>
                  <Td>{user.department}</Td>
                  <Td>{user.designation}</Td>
                  <Td>{user.employeeCode}</Td>
                  <Td>{user.officeTimings}</Td>
                  <Td>
                  <Button
                        mr="4"
                        onClick={() => handleOpenDrawer(user._id)}
                        colorScheme="teal"
                      >
                        <Icon as={SlCalender} color="white" size="sm" />
                      </Button></Td>
                  <Td>
                    {user.isAdmin ? (
                      <Icon
                        as={IoCheckmarkCircleSharp}
                        color="green.600"
                        w="8"
                        h="8"
                      />
                    ) : (
                      <Icon
                        as={IoCloseCircleSharp}
                        color="red.600"
                        w="8"
                        h="8"
                      />
                    )}
                  </Td>
                  <Td>
                    <Flex justifyContent="flex-end" alignItems="center">
                      <Button
                        mr="4"
                        as={RouterLink}
                        to={`/admin/user/${user._id}/edit`}
                        colorScheme="teal"
                      >
                        <Icon as={IoPencilSharp} color="white" size="sm" />
                      </Button>
                      <Button
                        mr="4"
                        colorScheme="red"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <Icon as={IoTrashBinSharp} color="white" size="sm" />
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          
      <Drawer onClose={handleCloseDrawer} isOpen={isDrawerOpen} size="xl" >
        <DrawerOverlay />
        <DrawerContent style={{ top: '5rem' }} > 
          <DrawerCloseButton />
          <DrawerHeader>Calendar</DrawerHeader>
          <DrawerBody >
            {/* Render the calendar component */}
            
            <MyCalendar attendanceData={selectedUserAttendance}/>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
        </Box>
      )}
    </>
  );
};

export default UserListScreen;
