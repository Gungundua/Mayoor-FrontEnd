import React, { useState, useEffect } from "react"
import Wrapper from "./style"
import List from "../images/list.png"
import axios from "axios"
import Form_AC from "../Form_AC"
import Assessment from "../Start_Assesment/index.jsx"
import Menu from "../MenuBar/index.jsx"
import MenuDots from "../MenuDots/index.jsx"
import SuccessfulDone from "../Popup_successful"
import Failed from "../Popup_Failed/index.jsx"
const AC_List = ({ acItems, setAcItems, handleAcItems, studentsData, setIndex, user }) => {
  const [acList, setAcList] = useState([])
  const [activeMenuIndex, setActiveMenuIndex] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredAcList, setFilteredAcList] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedAssessment, setSelectedAssessment] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showFailed, setShowFailed] = useState(false)
  const [missingMarksCount, setMissingMarksCount] = useState({})
  const handleClick = () => setIndex(1)
  const [userData, setUserData] = useState(null)
  useEffect(() => {
    const userData = sessionStorage.getItem("userData")
    if (userData) setUserData(JSON.parse(userData))
  }, [])
  const loadAC = async () => {
    if (!userData || !userData.year || !userData.class || !userData.section || !userData.subject || !userData.quarter) {
      console.warn("Missing user data, skipping API call.")
      return
    }
    setLoading(true)
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      "Content-Type": "application/json",
      year: userData.year,
      classname: userData.class,
      section: userData.section,
      subject: userData.subject,
      quarter: userData.quarter
    }
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/assessment-criteria`, { headers })
      const data = response.data
      setAcList(data)
      setFilteredAcList(data)
      setAcItems(data)
    } catch (error) {
      console.error("Error fetching assessment criteria:", error.response?.data || error.message)
      setAcList([])
      setFilteredAcList([])
      setAcItems([])
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    loadAC()
  }, [userData])
  const handleMissingMarksCount = (acId, count) => {
    setMissingMarksCount((prev) => ({ ...prev, [acId]: count }))
  }
  const handleStartAssessment = (item) => {
    if (activeMenuIndex !== null) return
    setSelectedAssessment(item)
  }
  const handleBackToList = () => setSelectedAssessment(null)
  if (selectedAssessment) {
    return (
      <Assessment
        selectedAssessment={selectedAssessment}
        onBack={handleBackToList}
        studentsData={studentsData}
        onMissingMarksChange={handleMissingMarksCount}
      />
    )
  }
  return (
    <Wrapper>
      <div className="search-container">
        <div className="icon">
          <Menu
            onProfileClick={() => alert("Go to Profile")}
            onSettingsClick={() => alert("Open Settings")}
            onLogoutClick={() => alert("Logging Out...")}
            onReturnClick={handleClick}
          />
        </div>
        <input
          type="text"
          placeholder="Search AC..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>
      <ul className="ac-list">
        {loading ? (
          <li>
            <div className="circular"></div>
            <p className="loading-message">Loading....</p>
          </li>
        ) : filteredAcList.length > 0 ? (
          filteredAcList.map((item, index) => (
            <li key={item.ac_id} className="ac-list-item" onClick={() => handleStartAssessment(item)}>
              <div className="ac-header">
                <div className="list-icon-containers">
                  <img src={List} alt="" className="list-icons" />
                </div>
                <div className="ac-info">
                  <p className="item-title">{item.ac_name}</p>
                </div>
                <div className='mapCounter'>
                  {missingMarksCount[item.ac_id] ?? 0}
                </div>
                <div>
                  <MenuDots
                    index={index}
                    activeMenuIndex={activeMenuIndex}
                    setActiveMenuIndex={setActiveMenuIndex}
                    onEditClick={() => console.log("Edit")}
                    onDeleteClick={() => console.log("Delete")}
                  />
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="no-results">
            <p className="no_results">No Data Available</p>
          </li>
        )}
      </ul>
      <div className="add" onClick={() => setShowForm(true)}>
        <span className='plus'>+</span>
      </div>
      {showForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <Form_AC closeForm={() => setShowForm(false)} loadAC={loadAC} />
          </div>
        </div>
      )}
      {showSuccess && (
        <div className="success-overlay">
          <SuccessfulDone />
        </div>
      )}
      {showFailed && (
        <div className="success-overlay">
          <Failed />
        </div>
      )}
    </Wrapper>
  )
}
export default AC_List