import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import { USER_DETAILS_RESET } from "../constants/userConstants";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [officeTimings, setOfficeTimings] = useState("");
  const [leaveCount, setLeaveCount] = useState(0);

  const [message, setMessage] = useState("");

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      
      } else {
        setName(user.name);
        setEmail(user.email);
        setDepartment(user.department);
        setDesignation(user.designation);
        setEmployeeCode(user.employeeCode);
        setOfficeTimings(user.officeTimings);
        setLeaveCount(user.leaveCount);
      }
    }
  }, [dispatch, navigate, user, userInfo, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          name,
          email,
          password,
          department,
          designation,
          employeeCode,
          officeTimings,
        })
      );
      dispatch({ type: USER_DETAILS_RESET });
    }
  };

  return (
    <Grid templateColumns={{ sm: "1fr", md: "1fr 1fr" }} py="5" gap="10">
      <Flex w="full" alignItems="center" justifyContent="center" py="5">
        <FormContainer>
          <Heading as="h1" mb="8" fontSize="3xl">
            User Profile
          </Heading>

          {error && <Message type="error">{error}</Message>}
          {message && <Message type="error">{message}</Message>}

          <form onSubmit={submitHandler}>
            <FormControl id="name">
              <FormLabel htmlFor="name">Your Name</FormLabel>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <Spacer h="3" />

            <FormControl id="email">
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="username@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <Spacer h="3" />

            <FormControl id="password">
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Spacer h="3" />

            <FormControl id="confirmPassword">
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="************"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>

            <Spacer h="3" />

            <FormControl id="department">
              <FormLabel htmlFor="department">Department</FormLabel>
              <Input
                id="department"
                type="text"
                placeholder="enter a department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </FormControl>

            <Spacer h="3" />

            <FormControl id="designation">
              <FormLabel htmlFor="designation">Designation</FormLabel>
              <Input
                id="designation"
                type="text"
                placeholder="enter a designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
            </FormControl>

            <Spacer h="3" />

            <FormControl id="employeeCode">
              <FormLabel htmlFor="employeeCode">Employee Code</FormLabel>
              <Input
                id="employeeCode"
                type="text"
                placeholder="enter a employee code"
                value={employeeCode}
                onChange={(e) => setEmployeeCode(e.target.value)}
              />
            </FormControl>

            <Spacer h="3" />

            <FormControl id="officeTimings">
              <FormLabel htmlFor="officeTimings">Office Timings</FormLabel>
              <Input
                id="officeTimings"
                type="text"
                placeholder="enter a office timings"
                value={officeTimings}
                onChange={(e) => setOfficeTimings(e.target.value)}
              />
            </FormControl>
            <FormControl id="leaveCount">
            <FormLabel htmlFor="leaveCount">Leave Count</FormLabel>
            <Input
            disabled
              id="leaveCount"
              type="number"
              placeholder="Enter leave count"
              value={leaveCount}
              onChange={(e) => setLeaveCount(Number(e.target.value))}
            />
          </FormControl>

            <Button type="submit" colorScheme="teal" mt="4" isLoading={loading}>
              Update
            </Button>
          </form>
        </FormContainer>
      </Flex>
    </Grid>
  );
};

export default ProfileScreen;
