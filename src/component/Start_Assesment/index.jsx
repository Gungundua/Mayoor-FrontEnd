import React, { useState, useEffect, useRef } from "react"
import Wrapper from "./style"
import { FaArrowLeft } from "react-icons/fa"
import axios from "axios"
import Done from "../assets/check.png"
const Assessment = ({ selectedAssessment, onBack, studentsData, onMissingMarksChange }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [userData, setUserData] = useState(null)
  const containerRef = useRef(null)
  const [students, setStudents] = useState(
    studentsData.map((stu) => ({ ...stu, marks: "" }))
  )
  const [scoresLoaded, setScoresLoaded] = useState(false)
  const missingMarksRef = useRef(null)
  // :white_check_mark: Prevent infinite re-render with state guard
  useEffect(() => {
    const userData = sessionStorage.getItem("userData")
    if (userData) {
      const parsedUserData = JSON.parse(userData)
      setUserData(parsedUserData)
      if (!scoresLoaded) {
        loadSavedScores(parsedUserData)
        setScoresLoaded(true)
      }
    }
  }, [selectedAssessment])
  // :white_check_mark: API call with loading state
  const [loading, setLoading] = useState(false)
  const loadSavedScores = async (userData) => {
    if (loading) return
    setLoading(true)
    const headers = {
      Authorization: "Bearer YOUR_ACCESS_TOKEN",
      "Content-Type": "application/json",
      year: userData?.year,
      classname: userData?.class,
      section: userData?.section,
      quarter: userData?.quarter,
      subject: userData?.subject,
      ac_id: selectedAssessment.ac_id
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/assessment-criteria-score`,
        { headers }
      )
      if (response.data && response.data.length > 0) {
        setStudents((prevStudents) =>
          prevStudents.map((stu) => {
            const score = response.data.find((item) => item.student_id === stu.id)
            return score
              ? {
                  ...stu,
                  marks: selectedAssessment.max_marks * score.value,
                  scoreId: score.id
                }
              : stu
          })
        )
      }
    } catch (error) {
      console.error("Error fetching saved scores:", error)
    } finally {
      setLoading(false)
    }
  }
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }
  const handleMarksChange = (e, studentId) => {
    let value = e.target.value
    if (!/^\d+(\.\d{0,1})?$/.test(value) && value !== "") {
      return
    }
    const maxMarks = selectedAssessment?.max_marks || 100
    if ((parseInt(value) > maxMarks || parseInt(value) < 0)) {
      alert("Invalid marks")
      return
    }
    setStudents((prevStudents) =>
      prevStudents.map((stu) => (stu.id === studentId ? { ...stu, marks: value } : stu))
    )
  }
  const submitNewScores = async (newScores, headers) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/assessment-criteria-score`,
        { ac_id: selectedAssessment.ac_id, scores: newScores },
        { headers }
      )
      console.log("New scores submitted successfully")
    } catch (error) {
      console.error("Error submitting new scores:", error.response?.data || error.message)
      alert("Failed to submit new scores. Please try again.")
    }
  }
  const updateScores = async (updateScores, headers) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/assessment-criteria-score/?ac_id=${selectedAssessment.ac_id}`,
        { scores: updateScores },
        { headers }
      )
      console.log("Scores updated successfully")
    } catch (error) {
      console.error("Error updating scores:", error.response?.data || error.message)
      alert("Failed to update scores. Please try again.")
    }
  }
  const handleSubmit = async () => {
    if (!selectedAssessment?.ac_id || !userData) {
      console.error("Missing required data: selectedAssessment or userData")
      return
    }
    const headers = {
      Authorization: "Bearer YOUR_ACCESS_TOKEN",
      "Content-Type": "application/json",
      year: userData?.year,
      classname: userData?.class,
      section: userData?.section,
      quarter: userData?.quarter,
      subject: userData?.subject
    }
    const newScores = []
    const updateScoresList = []
    students.forEach((student) => {
      if (student.marks !== null) {
        const marksValue = student.marks === "" ? 0 : Number(student.marks)
        if (!student.scoreId) {
          newScores.push({
            student_id: student.id,
            obtained_marks: marksValue
          })
        } else {
          updateScoresList.push({
            id: student.scoreId,
            student_id: student.id,
            obtained_marks: marksValue
          })
        }
      }
    })
    if (newScores.length > 0) await submitNewScores(newScores, headers)
    if (updateScoresList.length > 0) await updateScores(updateScoresList, headers)
    alert("Marks submitted successfully!")
    loadSavedScores(userData)
  }
  // :white_check_mark: Prevent redundant re-render using useRef
  useEffect(() => {
    const missingCount = students.filter((stu) => !stu.marks || stu.marks === "").length
    if (missingMarksRef.current !== missingCount) {
      missingMarksRef.current = missingCount
      onMissingMarksChange(selectedAssessment.ac_id, missingCount)
    }
  }, [students, selectedAssessment, onMissingMarksChange])
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
            {selectedAssessment ? selectedAssessment.ac_name : "AC-1"}
          </h1>
          <p className="max-marks">
            Max Marks: {selectedAssessment?.max_marks}
          </p>
        </div>
      </div>
      <div className="ac-container">
        <div className="student-list" ref={containerRef}>
          {students.map((stu) => (
            <div className="ac-box" key={stu.id}>
              <div className="student-avatar">
                {stu.name
                  .split(" ")
                  .slice(0, 2)
                  .map((word) => word[0].toUpperCase())
                  .join("")}
              </div>
              <div className="details">
                <h3 className="studentName">{stu.name}</h3>
                <p className="roll-number">Roll Number: {stu.id}</p>
                <input
                  type="number"
                  step="0.1"
                  className="marks-input"
                  value={stu.marks || ""}
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
        <img
          src={Done}
          alt="Done"
          className="done-button"
          onClick={handleSubmit}
        />
      </div>
    </Wrapper>
  )
}
export default Assessment