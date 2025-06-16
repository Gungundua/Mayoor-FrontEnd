import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";
import StudentReport from "../Student_report/StudentReport.jsx";
import TeacherProfile from "../TeacherProfile/index.jsx";
import Menu from "../MenuBar/index.jsx";
import { useNavigate } from "react-router-dom";
import Wrapper from "./StudentSelectStyles.js";
import ReactLoading from 'react-loading'
import Skeleton from 'react-loading-skeleton'
import DownloadChecklist from "../Donwload/index.jsx";
const StudentList = ({ onStudentsData, setIndex, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showReport, setShowReport] = useState(null);
  const [showTeacherProfile, setShowTeacherProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);  // <-- Added loading state
  const navigate = useNavigate();
  const handleReport = (student) => {
    setShowReport(student);
  };
  const handleBackToList1 = () => {
    setShowReport(null);
  };
  const handleBackToList2 = () => {
    setShowTeacherProfile(false);
  };
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
    if (!searchQuery) {
      setFilteredStudents(students);
    } else {
      const filteredData = students.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStudents(filteredData);
    }
  }, [searchQuery, students]);
  useEffect(() => {
    const loadStudents = async () => {
      if (!userData || students.length > 0) return;
      setLoading(true);  // <-- Set loading to true before fetching
      try {
        const headers = {
          Authorization: "Bearer YOUR_ACCESS_TOKEN",
          "Content-Type": "application/json",
          year: userData.year,
          classname: userData.class,
          section: userData.section,
          subject: userData.subject,
        };
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/students`,
          { headers }
        );
        const Data = response.data;
        console.log(Data);
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
      } finally {
        setLoading(false);  // <-- Set loading to false after fetching
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
  const handleReturnClick = () => {
    navigate("/user/homelist"); // Navigate to HomeList
  };
  return (
    <Wrapper>
      <div className="search-container">
        <div className="icon">
          <Menu />
        </div>
        <input
          type="text"
          placeholder="Search Students..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>
      <div className='top-heading'>
        <div></div>
        <h1>Students</h1>
        <div className="download-icon">
          <DownloadChecklist />
        </div>
      </div>
      <div className="studentlist">
        {loading ? (
          <div className="skeleton-wrapper">
            {Array.from({ length: 12 }).map((_, i) => (
              <div className="custom-skeleton-card" key={i}>
                <div className="avatar-skeleton shimmer" />
                <div className="text-skeleton-wrapper">
                  <div className="line-skeleton shimmer short" />
                  {/* <div className="line-skeleton shimmer" /> */}
                </div>
              </div>
            ))}
          </div>
        ) : filteredStudents.length > 0 ? (
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
          <div className="no-results">No results found</div>
        )}
      </div>
    </Wrapper>
  );
};
export default StudentList;