import React, { useState, useEffect } from "react";
import Wrapper from "./style";
import { FaArrowLeft } from "react-icons/fa";
import Student from './Student.avif';
import NotificationIcon from './bell.png';
import ProfileIcon from './user.png';
import axios from "axios";

const Assessment = ({ selectedAssessment, onBack, userData }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [acData, setAcData] = useState([])
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const storedStudents = localStorage.getItem("students");
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents)); // ✅ Get from localStorage
    }
  }, []);
  useEffect(() => {
    const storedData = localStorage.getItem("assessmentData")
    if (storedData) {
      setAcData(JSON.parse(storedData))
    } else {
      generateAcData()
    }
  }, [])
  useEffect(() => {
    if (acData.length > 0) {
      localStorage.setItem("assessmentData", JSON.stringify(acData));
    }
  }, [acData]);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  };
  const generateAcData = () => {
    let data = [];
    for (let i = 1; i <= 100; i++) {
      data.push({ id: i, acName: `Student-${i}`, marks: '' })
    }
    setAcData(data)
  }
  const handleMarksChange = (e, id) => {
    const value = e.target.value
    if (/^\d*$/.test(value)) {
      const updatedData = [...acData]
      updatedData[id - 1].marks = value
      setAcData(updatedData)
    }
  };
  const handleSubmit = async () => {
    const payload = acData
      .filter(student => student.marks !== '') // Only send students with marks
      .map(student => ({
        student_id: student.id,
        obtained_marks: student.marks // Change 'marks' to 'obtained_marks'
      }));
    if (payload.length === 0) {
      alert("No marks entered!");
      return;
    }
    const headers = {
      Authorization: "Bearer YOUR_ACCESS_TOKEN", // Replace with actual token
      "Content-Type": "application/json",
      year: userData.year,
      classname: userData.class,
      section: userData.section,
      quarter: userData.quarter,
      subject: userData.subject,
    };
    const requestBody = {
      ac_id: selectedAssessment?.id, // Ensure the ac_id is correct
      scores: payload, // The array of student data with student_id and obtained_marks
    };
    // Console log the data before sending it
    console.log("Data being sent to the backend:", requestBody);
    try {
      const response = await axios.post('http://10.33.0.41:8000/api/assessment-criteria-score', requestBody, { headers });
      console.log("Response from backend:", response.data);
      alert("Marks submitted successfully!");
    } catch (error) {
      console.error("Error submitting marks:", error.response || error.message);
      alert("Failed to submit marks. Please try again.");
    }
  };
  return (
    <Wrapper>
      <div className="profile-section">
        <div className="search-container">
          <button className="back-button" onClick={onBack}>
            <FaArrowLeft />
          </button>
          <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchChange} className="search-bar" />
          <img src={NotificationIcon} alt="Profile" className="notificationIcon"/>
          <img src={ProfileIcon} alt="Profile" className="profileIcon"/>
        </div>
        <div className="info-container">
          <h1 className="name">{selectedAssessment ? selectedAssessment.name : "AC-1"}</h1>
        </div>
      </div>
      <div className="ac-container">
        {students.map((stu) => (
          <div className="ac-box" key={stu.id}>
            <img src={Student} alt="Profile" className="profile-image"/>
            <h3>{stu.name}</h3>
            <p className="roll-number">Roll Number: 12345</p>
            <input
              type="text"
              value={stu.marks}
              onChange={(e) => handleMarksChange(e, stu.id)}
              placeholder="Enter Marks"
              className="marks-input"
            />
          </div>
        ))}
      </div>
      <input className="done-button" type="button" value="Done" onClick={handleSubmit} />
    </Wrapper>
  )
}
export default Assessment;