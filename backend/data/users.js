import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    department: "admin",
    designation: "admin",
    employeeCode: "A120",
    officeTimings: "10.30",
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
    department: "IT",
    designation: "empolyee",
    employeeCode: "B098",
    officeTimings: "10.30",
    isAdmin: false,
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
    department: "IT",
    designation: "HR",
    employeeCode: "C876",
    officeTimings: "10.30",
    isAdmin: false,
  },
];

export default users;
