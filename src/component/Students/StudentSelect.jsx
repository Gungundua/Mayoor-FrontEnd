import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import dropUp from '../assets/dropup-image.png';
import dropDown from '../assets/dropdown-image.png';
import ProfileIcon from '../assets/profile-simple.png';
import NotificationIcon from '../assets/notification.png';
import NewIcon1 from '../assets/Audit.png';
import NewIcon2 from '../assets/Graduate.png';
import NewIcon3 from '../assets/Machine Learning.png';
import NewIcon4 from '../assets/Search.png';
import NewIcon5 from '../assets/Smart Home.png';
import axios from "axios";

import styles from './StudentSelectStyles.js'; // Import styles from the new StudentSelectStyles.js

const StudentSelect = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  // const [students, setStudents] = useState([])

  // const loadStudents = () => {
  //   axios.get(`http://10.33.0.41:8000/api/students`)
  //   .then(({data}) => setStudents(data))
  //   .catch(err => {console.log(err)})
  //   .finally(_ => {console.log('compiled !')})
  // }

  // useEffect(loadStudents,[])

  const students = [
    "Student 1", "Student 2", "Student 3", "Student 4", "Student 5", 
    "Student 6", "Student 7", "Student 8", "Student 9",
    "Student 1", "Student 2", "Student 3", "Student 4", "Student 5",
    "Student 6", "Student 7", "Student 8", "Student 9"
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <div style={styles.greeting}>
            <h2 style={styles.title}>Hi, Ritika</h2>
            <p style={styles.subtitle}>Good Morning</p>
          </div>
          <div style={styles.icons}>
            <img src={ProfileIcon} alt="Profile" style={styles.icon} />
            <img src={NotificationIcon} alt="Notifications" style={styles.icon} />
          </div>
        </div>

        {/* Search Container with hover and focus animation */}
        <div 
          style={{ 
            ...styles.searchContainer,
            ...(isFocused ? { backgroundColor: "ffffff", boxShadow: "0 4px 6px rgba(10, 10, 100, 10)" } : {}) // Apply focus styles
          }}
        >
          <input 
            type="text" 
            placeholder="Search" 
            style={{ 
              ...styles.searchInput, 
              ...(isFocused ? { width: "100%" } : {}) // Apply active input styles
            }}
            onFocus={() => setIsFocused(true)} // Set focus state
            onBlur={() => setIsFocused(false)}  // Remove focus state
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

      {/* <div style={styles.bottomNav}>
        <button style={styles.navButton}>
          <img src={NewIcon2} alt="Icon 1" style={styles.navIcon} />
        </button>
        <button style={styles.navButton}>
          <img src={NewIcon1} alt="Icon 2" style={styles.navIcon} />
        </button>
        <button style={{ ...styles.navButton, ...styles.activeNavItem }}>
          <img src={NewIcon5} alt="Icon 3" style={styles.navIcon} />
        </button>
        <button style={styles.navButton}>
          <img src={NewIcon4} alt="Icon 4" style={styles.navIcon} />
        </button>
        <button style={styles.navButton}>
          <img src={NewIcon3} alt="Icon 5" style={styles.navIcon} />
        </button>
      </div> */}
    </div>
  );
};

export default StudentSelect;
