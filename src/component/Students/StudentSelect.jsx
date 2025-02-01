import React, { useState, useEffect } from "react";
import styles from "./StudentSelectStyles"; // Importing styles
import bellIcon from "../assets/bell.png";
import userIcon from "../assets/user.png";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";
import StudentReport from "../Student_report/StudentReport.jsx";
import TeacherProfile from "../TeacherProfile";
// import StudentReport from "../Student_report/StudentReport";

const StudentList = ({ userData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]); // Stores API student list
  const [filteredStudents, setFilteredStudents] = useState([]); // Stores search-filtered students
  const [isFocused, setIsFocused] = useState(false);
  const [showReport, setShowReport] = useState(null);

  const handleShowReport = (student) => {
    setShowReport(student); // Pass the entire student object
  };

  const handleBackToList = () => {
    setShowReport(null); // Reset showReport to null to go back to student list
  };

  // ✅ Update filtered students when `students` or `searchTerm` changes
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilteredStudents(
        Array.isArray(students)
          ? students.filter((student) =>
              student.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : []
      );
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, students]);

  useEffect(() => {
    const loadStudents = async () => {
      if (Object.keys(userData).length === 0) return;
  
      // Check local storage first
      const storedStudents = localStorage.getItem("students");
      if (storedStudents) {
        setStudents(JSON.parse(storedStudents));
        return; // Use cached data instead of fetching again
      }
  
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
          "http://10.33.0.41:8000/api/students",
          { headers }
        );
  
        if (response.data && Array.isArray(response.data.Students)) {
          setStudents(response.data.Students);
          localStorage.setItem("students", JSON.stringify(response.data.Students)); // Store in local storage
        } else {
          setStudents([]);
        }
      } catch (error) {
        setStudents([]);
      }
    };
  
    loadStudents();
  }, [userData]);
  

  if (showReport) {
    return <StudentReport student={showReport} onBack={handleBackToList} />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.searchContainer}>
          <div
            style={{
              ...styles.searchBox,
              backgroundColor: isFocused ? "white" : "rgba(255, 255, 255, 0.6)",
            }}
          >
            <input
              type="text"
              placeholder="Search"
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <IoSearchOutline style={styles.searchIcon} />
          </div>

          <div style={styles.iconWrapper}>
            <img src={bellIcon} alt="Bell Icon" style={{ width: "22px", height: "22px" }} />
            <img src={userIcon} alt="User Icon" style={{ width: "22px", height: "22px" }} />
          </div>
        </div>
        <h2 style={styles.title}>Student List</h2>
      </div>

      <div style={styles.listContainer}>
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => (
            <div
              key={index}
              style={styles.listItem}
              onClick={() => handleShowReport(student)}
            >
              {student.name}
            </div>
          ))
        ) : (
          <div style={styles.noResults}>Loading Students...</div>
        )}
      </div>
    </div>
  );
};

export default StudentList;