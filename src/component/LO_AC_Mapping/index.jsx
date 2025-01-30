import React, { useState, useEffect } from "react";
import Wrapper from "./style";
import Form_AC from "../Form_AC/index";
import axios from "axios"; // Import axios

const ACMapping = ({ userData, loId }) => {
  const [acList, setAcList] = useState([]);
  const [priorityMapping, setPriorityMapping] = useState({}); // Stores priorities by loId and acId
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Get the AC list from localStorage
    const storedAcList = localStorage.getItem("acList");
    if (storedAcList) {
      setAcList(JSON.parse(storedAcList));
    } else {
      console.warn("No AC List found in localStorage");
    }
  }, []);

  const handleform = () => {
    setShowForm(true);
  };

  const handleClick = (acid, priority) => {
    setPriorityMapping((prev) => {
      const updatedPriorityMapping = { ...prev };

      // Initialize loid Data if it doesn't exist
      if (!updatedPriorityMapping[loId]) {
        updatedPriorityMapping[loId] = { Data: {} };
      }

      const loidData = updatedPriorityMapping[loId].Data;

      // Toggle the priority for the acId (if it's already selected, deselect it)
      loidData[acid] = loidData[acid] === priority.toLowerCase() ? "" : priority.toLowerCase();

      return updatedPriorityMapping;
    });
  };

  const handleDone = async () => {
    // Filter out empty priorities in priorityMapping
    const filteredPriorityMapping = { ...priorityMapping };

    Object.keys(filteredPriorityMapping).forEach((loIdKey) => {
      const loidData = filteredPriorityMapping[loIdKey].Data;
      Object.keys(loidData).forEach((acid) => {
        if (!loidData[acid]) {
          delete loidData[acid]; // Remove entry with empty priority
        }
      });

      // If no data remains for this loId, delete the loId entry itself
      if (Object.keys(loidData).length === 0) {
        delete filteredPriorityMapping[loIdKey];
      }
    });

    // Log the filtered priority mapping
    console.log("Filtered Priority Data:", filteredPriorityMapping);

    const body = {
      data: filteredPriorityMapping
    };

    const headers = {
      Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with the actual token
      'Content-Type': 'application/json',
      year: userData.year,
      subject: userData.subject,
      quarter: userData.quarter,
    };

    // Make the POST request to send the filtered priorityMapping data via Axios
    try {
      const response = await axios.post(
        'http://10.33.0.41:8000/api/lo_ac_mapping', // Replace with your actual API URL
        body,
        { headers }
      );
      // Handle the response from the API (if needed)
      console.log("API Response:", response.data);
    } catch (error) {
      // Handle error if request fails
      console.error("Error sending data:", error);
    }
  };

  return (
    <Wrapper>
      <div className="ac-list-container">
        <div className="ac-list">
          {acList.map((ac, index) => (
            <div key={ac.id} className="ac-item">
              <div>
                <h2>AC {index + 1}</h2>
                <span>{ac.name}</span>
              </div>
              <div className="priority-buttons">
                <button
                  className={`priority-button ${
                    priorityMapping[loId]?.Data[ac.id] === "h" ? "h" : ""
                  }`}
                  onClick={() => handleClick(ac.id, "h")}
                >
                  H
                </button>
                <button
                  className={`priority-button ${
                    priorityMapping[loId]?.Data[ac.id] === "m" ? "m" : ""
                  }`}
                  onClick={() => handleClick(ac.id, "m")}
                >
                  M
                </button>
                <button
                  className={`priority-button ${
                    priorityMapping[loId]?.Data[ac.id] === "l" ? "l" : ""
                  }`}
                  onClick={() => handleClick(ac.id, "l")}
                >
                  L
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="btns">
          <input type="button" value="Add New AC" className="addBtn" onClick={handleform} />
          <input type="button" value="Done" className="btn" onClick={handleDone} />
        </div>
      </div>
      {showForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <Form_AC closeForm={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default ACMapping;
