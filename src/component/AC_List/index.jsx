import React, { useState, useEffect } from "react";
import Wrapper from "./style";
import Delete from "../images/delete2.png";
import Edit from "../images/edit2.png";
import List from "../images/list.png";
import axios from "axios";
import Form_AC from "../Form_AC";

const AClist = ({ userData }) => {
  const [acList, setAcList] = useState([]);

  const [activeIndex, setActiveIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const toggleDropdown = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const loadAC = async () => {
    if (!userData.year || !userData.class || !userData.section || !userData.subject || !userData.quarter) {
      console.warn("Missing user data, skipping API call.");
      return;
    }

    const headers = {
      Authorization: "Bearer YOUR_ACCESS_TOKEN", // Replace with actual token
      "Content-Type": "application/json",
      year: userData.year,
      class: userData.class,
      section: userData.section,
      subject: userData.subject,
      quarter: userData.quarter,
    };

    try {
      const response = await axios.get(
        "http://10.33.0.41:8000/api/assessment_criterias",
        { headers }
      );

      const data = response.data;
      if (Array.isArray(data.assessments)) {
        setAcList(data.assessments);
        localStorage.setItem("acList", JSON.stringify(data.assessments)); // Store in localStorage
      } else {
        setAcList([]);
        console.warn("Unexpected API response format:", data);
      }
    } catch (error) {
      console.error("Error fetching assessment criteria:", error.response?.data || error.message);
      setAcList([]);
    }
  };

  useEffect(() => {
    // Retrieve stored data from localStorage if available
    const storedACList = localStorage.getItem("acList");
    if (storedACList) {
      setAcList(JSON.parse(storedACList));
    }

    // Fetch fresh data when userData changes
    loadAC();
  }, [userData]); // Fetch only when userData changes

  return (
    <Wrapper>
      <h2 className="ac-list-title">AC List</h2>
      <ul className="ac-list">
        {acList.map((item, index) => (
          <li key={item.id} className="ac-list-item">
            <div className="ac-header" onClick={() => toggleDropdown(index)}>
              <div className="list-icon-container">
                <img src={List} alt="" className="list-icon" />
              </div>
              <div className="ac-info">
                <p className="item-no">AC - {index + 1}</p>
                <p className="item-title">{item.name}</p>
              </div>
              <img src={Edit} alt="edit" className="edit" />
              <img src={Delete} alt="delete" className="delete" />
              <div className="ac-dropdown-icon">
                {activeIndex === index ? "▲" : "▼"}
              </div>
            </div>
            {activeIndex === index && (
              <div className="ac-dropdown-content">
                <p>Max Marks: {item.max_marks}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="add" onClick={() => setShowForm(true)}>+</div>
      {showForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <Form_AC closeForm={() => setShowForm(false)} userData={userData} loadAC={loadAC}/>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default AClist;
