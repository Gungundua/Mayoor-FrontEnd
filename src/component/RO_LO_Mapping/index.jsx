import React, { useState, useEffect } from "react";
import Wrapper from "./style";
import Form_LO from "../Form_LO/index"
import axios from "axios";

const LOMapping = ({userData, roId , loItems}) => {
  const [priorityMapping, setPriorityMapping] = useState({}); // Stores priorities by roId and acId
  const [showForm, setShowForm] = useState(false);

  const handleform = () => {
    setShowForm(true);
  };

  const handleClick = (loid, priority) => {
    setPriorityMapping((prev) => {
      const updatedPriorityMapping = { ...prev };

      // Initialize roId object if it doesn't exist
      if (!updatedPriorityMapping[roId]) {
        updatedPriorityMapping[roId] = { Data: {} }; // Directly initialize roId with Data
      }

      // Toggle the priority for the acId (if it's already selected, deselect it)
      updatedPriorityMapping[roId].Data[loid] = updatedPriorityMapping[roId].Data[loid] === priority ? "" : priority;

      return updatedPriorityMapping;
    });
  };

  const handleDone = async () => {
    // Prepare the data to send in the required format
    const body = {
      roId: roId,  // Include roId directly
      Data: priorityMapping[roId]?.Data || {}, // Get the Data for the specific roId
    };

    // Log the body data to check the format
    console.log("Data to be sent:", body);

    const headers = {
      Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with the actual token
      'Content-Type': 'application/json',
      year: userData.year,
      subject: userData.subject,
      quarter: userData.quarter,
      section: userData.section,
      classname: userData.class,
    };

    // Make the POST request to send the priorityMapping data via Axios
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/report-outcome-mapping`, // Replace with your actual API URL
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
      <div className="lo-list-container">
        <div className="lo-list">
          {loItems.map((lo, index) => (
            <div key={lo.id} className="lo-item">
              <div>
                {/* <h2>LO {index + 1}</h2> */}
                <span className="name">{lo.name}</span>
              </div>
              <div className="priority-buttons">
                <button
                  className={`priority-button ${
                    priorityMapping[roId]?.Data[lo.id] === "H" ? "h" : ""
                  }`}
                  onClick={() => handleClick(lo.id, "H")}
                  disabled={priorityMapping[roId]?.isLocked} // Disable button if locked
                >
                  H
                </button>
                <button
                  className={`priority-button ${
                    priorityMapping[roId]?.Data[lo.id] === "M" ? "m" : ""
                  }`}
                  onClick={() => handleClick(lo.id, "M")}
                  disabled={priorityMapping[roId]?.isLocked} // Disable button if locked
                >
                  M
                </button>
                <button
                  className={`priority-button ${
                    priorityMapping[roId]?.Data[lo.id] === "L" ? "l" : ""
                  }`}
                  onClick={() => handleClick(lo.id, "L")}
                  disabled={priorityMapping[roId]?.isLocked} // Disable button if locked
                >
                  L
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="btns">
          <input type="button" value="Add New LO" className="add" onClick={handleform}/>
          <input type="button" value="Done" className="btn" onClick={handleDone}/>
        </div>
    </div>
    {showForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <Form_LO closeForm={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default LOMapping;
