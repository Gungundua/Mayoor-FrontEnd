import React, { useState, useEffect, useRef } from "react";
import Wrapper from "./style";
import {FaArrowLeft} from "react-icons/fa";
import Student from "./Student.avif";
import axios from "axios";
import Done from "../assets/check.png";
const Assessment = ({ selectedAssessment, onBack, studentsData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState(null);
  const containerRef = useRef(null);
  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      setUserData(JSON.parse(userData));
    }
  }, [])
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }
  const handleMarksChange = (e, studentId) => {
    let value = e.target.value
    const maxMarks = selectedAssessment?.max_marks || 100;
    if (value > maxMarks || value < 0) {
      alert("Invalid")
      e.target.value = ""
    }
  }
  const handleSubmit = async () => {
    const payload = studentsData
      .filter((student) => student.marks !== "")
      .map((student) => ({
        student_id: student.id,
        obtained_marks: student.marks,
      }))
    if (payload.length === 0) {
      alert("No marks entered!");
      return
    }
    const headers = {
      Authorization: "Bearer YOUR_ACCESS_TOKEN",
      "Content-Type": "application/json",
      year: userData?.year,
      classname: userData?.class,
      section: userData?.section,
      quarter: userData?.quarter,
      subject: userData?.subject,
    }
    const requestBody = {
      ac_id: selectedAssessment?.id,
      scores: payload,
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/assessment-criteria-score`,
        requestBody,
        { headers }
      )
      alert("Marks submitted successfully!");
    } catch (error) {
      alert("Failed to submit marks. Please try again.");
    }
  }
  return (
    <Wrapper>
      <div className="profile-section">
        <div className="search-container">
          <button className="back-button" onClick={onBack}>
            <FaArrowLeft />
          </button>
          <input
            type="text"
            placeholder="Search RO..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>
        <div className="info-container">
          <h1 className="name">
            {selectedAssessment ? selectedAssessment.name : "AC-1"}
          </h1>
          <p className="max-marks">
            Max Marks: {selectedAssessment?.max_marks}
          </p>
        </div>
      </div>
      <div className="ac-container">
        <div className="student-list" ref={containerRef}>
          {studentsData.map((stu) => (
            <div className="ac-box" key={stu.id}>
              <div>
              <img src={Student} alt="Profile" className="profile-image" />
              </div>
              <div className="details">
              <h3 className="studentName">{stu.name}</h3>
              <p className="roll-number">Roll Number: {stu.id}</p>
              <input
                type="number"
                className="marks-input"
                value={stu.marks}
                onChange={(e) => handleMarksChange(e, stu.id)}
                placeholder="Enter Marks"
                min="0"
                max={selectedAssessment?.max_marks || 100}
                required
              />
              </div>
            </div>
          ))}
        </div>
        <img src={Done} alt="Done" className="done-button" onClick={handleSubmit}/>
        {/* <input
          className="done-button"
          type="button"
          value="Done"
          onClick={handleSubmit}
        /> */}
      </div>
    </Wrapper>
  )
}
export default Assessment