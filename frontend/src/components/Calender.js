import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import * as XLSX from "xlsx";
import { Button } from "@chakra-ui/react";
import { IoCloudDownload  } from "react-icons/io5";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ attendanceData }) => {
// *************DOWNLOAD ATTENDANCE ******************
  // Create a new workbook
  const handleDownload = () => {
    // flatten object like this {id: 1, title:'', category: ''};
    const rows = attendanceData.map((attendance) => ({
      id: attendance._id,
      loginTime: attendance.loginTime,
      logoutTime: attendance.logoutTime,
      status: attendance.status,
    }));

    // create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

    // customize header names
    XLSX.utils.sheet_add_aoa(worksheet, [
      ["Attendance ID", "Login Time", "Logout Time", "Status"],
    ]);

    XLSX.writeFile(workbook, "AttendanceReport.xlsx", { compression: true });
  };
//*********************END *****************************************/

  
  // Map attendance data to events
  const events = attendanceData.map((attendance) => ({
    title: attendance.status || "Unknown", // Customize as needed
    start: new Date(attendance.loginTime),
    end: attendance.logoutTime
      ? new Date(attendance.logoutTime)
      : new Date(attendance.loginTime),
    status: attendance.status, // Add status to event object for styling
  }));

  // Event style getter based on status
  const eventStyleGetter = (event) => {
    let backgroundColor = "blue"; // Default color
    if (event.status) {
      switch (event.status.toLowerCase()) {
        case "present":
          backgroundColor = "green";
          break;
        case "absent":
          backgroundColor = "red";
          break;
        // Add more cases for other statuses if needed
        default:
          backgroundColor = "blue"; // Default color
      }
    }

    const style = {
      backgroundColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };

    return {
      style: style,
    };
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
       <Button rightIcon={<IoCloudDownload  />} onClick={handleDownload} colorScheme='teal' variant='outline'mb="4">
   Download Attendance Report
  </Button>
  <div style={{ width: "80%" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 400, width: "100%" }} // Adjust height and width as needed
        eventPropGetter={eventStyleGetter} // Apply custom styles
      /></div>
    </div>
  );
};

export default MyCalendar;
