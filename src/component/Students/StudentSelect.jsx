import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";
import StudentReport from "../Student_report/StudentReport.jsx";
import TeacherProfile from "../TeacherProfile/index.jsx";
import Menu from "../MenuBar/index.jsx";
import Wrapper from "./StudentSelectStyles.js";

const StudentList = ({ onStudentsData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showReport, setShowReport] = useState(null);
  const [showTeacherProfile, setShowTeacherProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState(null);

  const handleReport = (student) => {
    setShowReport(student);
  };

  const handleBackToList1 = () => {
    setShowReport(null);
  };

  const handleBackToList2 = () => {
    setShowTeacherProfile(false);
  };

  const handleProfileClick = () => alert("Go to Profile");
  const handleSettingsClick = () => alert("Open Settings");
  const handleLogoutClick = () => alert("Logging Out...");

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      setUserData(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilteredStudents(
        students.filter((student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, students]);

  useEffect(() => {
    const loadStudents = async () => {
      if (!userData || students.length > 0) return;

      try {
        const headers = {
          Authorization: "Bearer YOUR_ACCESS_TOKEN",
          "Content-Type": "application/json",
          year: userData?.year,
          classname: userData?.class,
          section: userData?.section,
          subject: userData?.subject,
        };

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/students`,
          { headers }
        );

        let re = /(\b[a-z](?!\s))/g;
        response.data.students.map(
          (student) =>
            (student.name = student.name
              .toLowerCase()
              .replace(re, (x) => x.toUpperCase()))
        );

        if (response.data && Array.isArray(response.data.students)) {
          setStudents(response.data.students);
          onStudentsData(response.data.students);
        } else {
          console.warn("Expected an array but received:", response.data);
          setStudents([]);
        }
      } catch (error) {
        console.error(
          "Error fetching students:",
          error.response || error.message
        );
        setStudents([]);
      }
    };

    if (userData && Object.keys(userData).length > 0 && students.length === 0) {
      loadStudents();
    }
  }, [userData]);

  if (showReport) {
    return <StudentReport student={showReport} onBack={handleBackToList1} />;
  }

  if (showTeacherProfile) {
    return <TeacherProfile onBack={handleBackToList2} />;
  }

  return (
    <Wrapper>
      <div className="container">
        <div className="search-container">
          <div className="icon">
            <Menu
              onProfileClick={handleProfileClick}
              onSettingsClick={handleSettingsClick}
              onLogoutClick={handleLogoutClick}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Search Students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-bar"
            />
          </div>
        </div>

        <div className="studentlist">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student, index) => (
              <div
                key={index}
                className="student-item"
                onClick={() => handleReport(student)}
              >
                <div className="student-avatar">
                  {student.name
                    .split(" ")
                    .slice(0, 2)
                    .map((word) => word[0].toUpperCase())
                    .join("")}
                </div>
                <div className="student-name">{student.name}</div>
              </div>
            ))
          ) : (
            <div className="no-results">Loading...  <div class="circular"></div></div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default StudentList;
