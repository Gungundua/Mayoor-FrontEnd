import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import dropUp from "../assets/dropup-image.png";
import dropDown from "../assets/dropdown-image.png";
import ProfileIcon from "../assets/profile-simple.png";
import NotificationIcon from "../assets/notification.png";
import Assessment from "../Start_Assesment/index.jsx";
import TeacherProfile from "..//TeacherProfile/index.jsx";
import styles from "./StudentSelectStyles.js";

const StudentSelect = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false); // State to toggle profile page
  const [showTeacherProfile, setshowTeacherProfile] = useState(false)
  const students = [
    "Student 1", "Student 2", "Student 3", "Student 4", "Student 5",
    "Student 6", "Student 7", "Student 8", "Student 9",
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  }

  const handleStartAssessment = () => {
    setShowAssessment(true); 
  }

  const handleTeacherProfile = () => {
    setshowTeacherProfile(true);
  }

  if (showAssessment) {
    return <Assessment goBack={() => setShowAssessment(false)} />; 
  }
  if(showTeacherProfile) {
    return <TeacherProfile goBack={() => setshowTeacherProfile(false)}/>;
  }
  // Render the student list page
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <div style={styles.greeting}>
            <h2 style={styles.title}>Hi, Ritika</h2>
            <p style={styles.subtitle}>Good Morning</p>
          </div>
          <div style={styles.icons}>
            <img src={ProfileIcon} alt="Profile" style={styles.icon} onClick={handleTeacherProfile} />
            <img src={NotificationIcon} alt="Notifications" style={styles.icon} />
          </div>
        </div>

        <div
          style={{
            ...styles.searchContainer,
            ...(isFocused ? { backgroundColor: "#ffffff", boxShadow: "0 4px 6px rgba(10, 10, 100, 0.1)" } : {}),
          }}
        >
          <input
            type="text"
            placeholder="Search"
            style={{
              ...styles.searchInput,
              ...(isFocused ? { width: "100%" } : {}),
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <IoSearchOutline style={styles.searchIcon} />
        </div>
      </div>

      <div style={styles.whiteLayer}>
        <div style={styles.buttonsContainer}>
          <h3 style={styles.sectionTitle}>Student List</h3>
          <button
            style={{ ...styles.button, backgroundColor: isHovered ? "white" : "#3CB3D0" }}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
            onClick={handleStartAssessment} // Navigate to Profile page
          >
            Start Assessment
          </button>
        </div>
        <div style={styles.studentList}>
          {students.map((student, index) => (
            <div key={index}>
              <div style={styles.studentItem} onClick={() => toggleExpand(index)}>
                {student}
                <img src={expandedIndex === index ? dropUp : dropDown} alt="arrow" style={styles.arrow} />
              </div>
              {expandedIndex === index && (
                <div style={styles.studentDetails}>Details about {student}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentSelect;
