import React, { useState, useEffect, useRef } from "react";
import Wrapper from "./style";
import List from "../images/list.png";
import axios from "axios";
import Form_AC from "../Form_AC";
import Assessment from "../Start_Assesment/index.jsx";
import Menu from "../MenuBar/index.jsx";
import MenuDots from "../MenuDots/index.jsx";
import SuccessfulDone from "../Popup_successful";
import Failed from "../Popup_Failed/index.jsx";
import AreYouSure from "../AreYouSure/index.jsx";
import DeleteFailed from "../DeleteFailed/index.jsx";
import DeletedSuccessfully from "../DeletedSuccessfully/index.jsx";
import ReactLoading from 'react-loading'
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from "react-router-dom";
import { HiOutlineDocumentText,HiOutlineDocumentPlus,HiOutlineExclamationTriangle } from "react-icons/hi2";
const AC_List = ({
  acItems,
  setAcItems,
  handleAcItems,
  studentsData,
  onLogout
}) => {
  const [acList, setAcList] = useState([]);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAcList, setFilteredAcList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [showDeleted, setshowDeleted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteAcId, setDeleteAcId] = useState(null);
  const [showDeleteFailed, setShowDeleteFailed] = useState(false);
  const [missingMarksCount, setMissingMarksCount] = useState({});
  const [heldAC, setHeldAC] = useState(null); // :fire: Track which RO is being held
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const holdTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      setUserData(JSON.parse(userData));
    }
  }, []);
  const loadAC = async () => {
    if (
      !userData ||
      !userData.year ||
      !userData.class ||
      !userData.section ||
      !userData.subject ||
      !userData.quarter
    ) {
      console.warn("Missing user data, skipping API call.");
      return;
    }
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
      year: userData.year,
      classname: userData.class,
      section: userData.section,
      subject: userData.subject,
      quarter: userData.quarter,
    };
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/assessment-criteria`,
        { headers }
      );
      console.log("Response Data:", response.data);
      const data = response.data;
      setAcList(data);
      setFilteredAcList(data);
      setAcItems(data);
    } catch (error) {
      console.error(
        "Error fetching assessment criteria:",
        error.response?.data || error.message
      );
      setAcList([]);
      setFilteredAcList([]);
      setAcItems([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadAC();
  }, [userData]);
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);
  useEffect(() => {
    if (showFailed) {
      const timer = setTimeout(() => {
        setShowFailed(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showFailed]);
  useEffect(() => {
    if (showDeleted) {
      const timer = setTimeout(() => {
        setshowDeleted(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showDeleted]);
  useEffect(() => {
    if (showDeleteFailed) {
      const timer = setTimeout(() => {
        setShowDeleteFailed(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showDeleteFailed]);
  useEffect(() => {
    if (!searchQuery) {
      setFilteredAcList(acList);
    } else {
      const filteredData = acList.filter((item) =>
        (item.ac_name || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAcList(filteredData);
    }
  }, [searchQuery, acList]);
  const handleStartAssessment = (item) => {
    if (activeMenuIndex !== null) {
      return;
    }
    setSelectedAssessment(item);
  };
  const handleBackToList = () => {
    setSelectedAssessment(null);
  };
  // Function to show the confirmation modal before deletion
  const handleDeleteClick = (acId) => {
    setDeleteAcId(acId);
    setShowConfirmation(true);
  };
  const handleConfirm = async () => {
    if (!deleteAcId) return;
    setLoading(true);
    try {
      const headers = {
        year: userData.year,
        classname: userData.class,
        section: userData.section,
        quarter: userData.quarter,
      };
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/assessment-criteria?id=${deleteAcId}`,{headers}
      );
      const updatedAcItems = filteredAcList.filter((item) => item.ac_id !== deleteAcId);
      setAcItems(updatedAcItems);
      setFilteredAcList(updatedAcItems);
      setshowDeleted(true);
    } catch (error) {
      setShowDeleteFailed(true);
      console.error(
        "Error deleting Assessment :",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
      setShowConfirmation(false);
      setDeleteAcId(null);
    }
  };
  const handleEdit = (item) => {
    setEditItem(item);
    setShowForm(true);
  };
  // The missingMarksChange function to handle missing marks update
  const onMissingMarksChange = (ac_id, count) => {
    setMissingMarksCount((prev) => ({
      ...prev,
      [ac_id]: count,
    }));
  };
  if (selectedAssessment) {
    return (
      <Assessment
        selectedAssessment={selectedAssessment}
        onBack={handleBackToList}
        studentsData={studentsData}
        onMissingMarksChange={onMissingMarksChange}  // Pass the function here
      />
    );
  }
  const handleTouchStart = (ac, event) => {
    if (!event || !event.currentTarget) return;  // Add safeguard against undefined event
    const targetElement = event.currentTarget.getBoundingClientRect();
    holdTimeoutRef.current = setTimeout(() => {
      setHeldAC(ac);
      const offsetX = 0;
      const offsetY = 0;
      const newPosition = {
        left: Math.min(targetElement.left + offsetX, window.innerWidth - 200),
        top: Math.min(targetElement.bottom + offsetY, window.innerHeight - 200)
      };
      setPopupPosition(newPosition);
    }, 800);
  };
  const handleTouchEnd = () => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    setHeldAC(null);
  };
  const handleMouseLeave = () => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    setHeldAC(null);
  };
  const handleReturnClick = () => {
    navigate("/user/homelist"); // Navigate to HomeList
  };
  return (
    <Wrapper>
      <div className="search-container">
        <div className="icon">
          <Menu/>
        </div>
        <input
          type="text"
          placeholder="Search Assessment Criteria..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>
      <div className='top-heading'><h1>Assessment Criteria</h1></div>
      <ul className="ac-list">
        {loading ? (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <li className="ac-skeleton-item" key={index}>
                <div className="skeleton-icon shimmer" />
                <div className="skeleton-info">
                  <div className="skeleton-line shimmer short" />
                  {/* <div className="skeleton-line shimmer" /> */}
                </div>
                <div className="skeleton-badge shimmer" />
                <div className="skeleton-badge2 shimmer" />
              </li>
            ))}
          </>
        ) : filteredAcList.length > 0 ? (
          filteredAcList.map((item, index) => (
            <li
              key={item.ac_id}
              className="ac-list-item"
              onClick={() => handleStartAssessment(item)}
              onTouchStart={(e) => handleTouchStart(item, e)}  // Pass 'event' here
              onTouchEnd={handleTouchEnd}
            >
              <div className="ac-header">
                <div className="list-icon-containers">
                  {/* <img src={List} alt="" className="list-icons" /> */}
                  <HiOutlineDocumentText size={30} color="#222"  />
                </div>
                <div className="ac-info">
                  <p className="item-title">{item.ac_name}</p>
                </div>
                <div >
                  {item.mapped_los?.length === 0 ? (<HiOutlineExclamationTriangle size={30} color="#FFA590" />) : "" }
                </div>
                <div className="mapCounter">
                {missingMarksCount[item.ac_id] ?? item.remaining_students ?? 0}
                </div>
                <div>
                  <MenuDots
                    index={index}
                    activeMenuIndex={activeMenuIndex}
                    setActiveMenuIndex={setActiveMenuIndex}
                    onEditClick={() => handleEdit(item)}
                    onDeleteClick={() => handleDeleteClick(item.ac_id)}
                  />
                </div>
              </div>
              {heldAC && (
                  <div className="held-popup" style={{ top: popupPosition.top, left: popupPosition.left }}>
                    <div className='mapLoItem'>{heldAC.ac_name}</div>
                  </div>
                )}
            </li>
          ))
        ) : (
          <li className="no-results">
            No Results Found
          </li>
        )}
      </ul>
      <div
        className="add"
        onClick={() => {
          setEditItem(null); // Reset editItem
          setShowForm(true);
        }}
      >
        <span className="plus"><HiOutlineDocumentPlus size={30} color="#000"/></span>
      </div>
      {showForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <Form_AC
              closeForm={() => {
                setShowForm(false);
                setShowSuccess(true);
              }}
              closeForm2={() => {
                setShowForm(false);
                setShowFailed(true);
              }}
              closeFormOnly={() => setShowForm(false)}
              loadAC={loadAC}
              setShowSuccess={setShowSuccess}
              setShowFailed={setShowFailed}
              editItem={editItem}
              setEditItem={setEditItem}
            />
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
      {showDeleted && (
        <div className="success-overlay">
          <DeletedSuccessfully />
        </div>
      )}
      {showConfirmation && (
        <div className="success-overlay">
          <AreYouSure
            onConfirm={handleConfirm}
            onCancel={() => setShowConfirmation(false)}
          />
        </div>
      )}
      {showDeleteFailed && (
        <div className="success-overlay">
          <DeleteFailed />
        </div>
      )}
    </Wrapper>
  );
};
export default AC_List