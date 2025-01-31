import React, { useState, useEffect } from "react";
import styles from "./StudentSelectStyles"; // Importing styles
import bellIcon from "../assets/bell.png";
import userIcon from "../assets/user.png";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";

const StudentList = ({ userData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]); // Stores API student list
  const [filteredStudents, setFilteredStudents] = useState([]); // Stores search-filtered students
  const [isFocused, setIsFocused] = useState(false);

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

  // ✅ Fetch student data when `userData` changes
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const headers = {
          Authorization: "Bearer YOUR_ACCESS_TOKEN", // Replace with actual token
          "Content-Type": "application/json",
          year: userData.year,
          classname: userData.class,
          section: userData.section,
          subject: userData.subject,
        };

        const response = await axios.get("http://10.33.0.41:8000/api/students", { headers });
        console.log("Response Data:", response.data);

        if (response.data && Array.isArray(response.data.Students)) {
          setStudents(response.data.Students); // ✅ Extract `Students` array
        } else {
          console.warn("Expected an array but received:", response.data);
          setStudents([]); 
        }
      } catch (error) {
        console.error("Error fetching students:", error.response || error.message);
        setStudents([]);
      }
    };

    if (Object.keys(userData).length > 0) {
      loadStudents();
    }
  }, [userData]); // ✅ Runs when `userData` changes

  return (
    <div style={styles.container}>
      {/* Green Fixed Header */}
      <div style={styles.header}>
        <div style={styles.searchContainer}>
          {/* Search Bar */}
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

          {/* Icons */}
          <div style={styles.iconWrapper}>
            <img src={bellIcon} alt="Bell Icon" style={{ width: "22px", height: "22px" }} />
            <img src={userIcon} alt="User Icon" style={{ width: "22px", height: "22px" }} />
          </div>
        </div>
        {/* Title */}
        <h2 style={styles.title}>Student List</h2>
      </div>

      {/* Student List */}
      <div style={styles.listContainer}>
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => (
            <div key={index} style={styles.listItem}>{student.name}</div>
          ))
        ) : (
          <div style={styles.noResults}>No students found</div>
        )}
      </div>
    </div>
  );
};

export default StudentList;
