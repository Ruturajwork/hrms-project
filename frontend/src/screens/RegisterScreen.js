import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  let redirect = searchParams.get("redirect") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [officeTimings, setOfficeTimings] = useState("");
  const [leaveCount, setLeaveCount] = useState(null);
  const [message, setMessage] = useState(null);
  const [successUser, setSuccessUser] = useState(false);

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, success } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        register(
          name,
          email,
          password,
          confirmPassword,
          department,
          designation,
          employeeCode,
          officeTimings,
          leaveCount
        )
      );
      setSuccessUser(true);
    }
  };

  useEffect(() => {
    if (success && successUser) {
      setSuccessUser(false);
      navigate("/admin/userlist");
    }
  }, [success, setSuccessUser]);

  return (<>
    <Link as={RouterLink} to="/admin/userlist">
    Go Back
  </Link>
    <Flex w="full" alignItems="center" justifyContent="center" py="5">
      <FormContainer>
        <Heading as="h1" mb="8" fontSize="3xl">
          Create User
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
              placeholder="Enter a department"
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
              placeholder="Enter a designation"
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
              placeholder="Enter an employee code"
              value={employeeCode}
              onChange={(e) => setEmployeeCode(e.target.value)}
            />
          </FormControl>

          <Spacer h="3" />

          <FormControl id="officeTimings">
            <FormLabel htmlFor="officeTimings">Office Timings</FormLabel>
            <Input
              id="officeTimings"
              type="time"
              placeholder="Enter office timings"
              value={officeTimings}
              onChange={(e) => setOfficeTimings(e.target.value)}
            />
          </FormControl>

          <Spacer h="3" />

          <FormControl id="leaveCount">
            <FormLabel htmlFor="leaveCount">Leave Count</FormLabel>
            <Input
              id="leaveCount"
              type="number"
              placeholder="Enter leave count"
              value={leaveCount}
              onChange={(e) => setLeaveCount(Number(e.target.value))}
            />
          </FormControl>

          <Spacer h="3" />

          <Button type="submit" colorScheme="teal" mt="4" isLoading={loading}>
            Register
          </Button>
        </form>
      </FormContainer>
    </Flex></>
  );
};

export default RegisterScreen;
