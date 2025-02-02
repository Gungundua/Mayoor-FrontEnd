import React, { useState } from "react";
import Wrapper from "./style";
import Form_AC from "../Form_AC/index";
import axios from "axios"; // Import axios

const ACMapping = ({ userData, loId, acItems }) => {
  const [priorityMapping, setPriorityMapping] = useState({}); // Stores priorities by loId and acId
  const [showForm, setShowForm] = useState(false);

  const handleform = () => {
    setShowForm(true);
  };

  const handleClick = (acid, priority) => {
    setPriorityMapping((prev) => {
      const updatedPriorityMapping = { ...prev };

      // Initialize loId object if it doesn't exist
      if (!updatedPriorityMapping[loId]) {
        updatedPriorityMapping[loId] = { Data: {} }; // Directly initialize loId with Data
      }

      // Toggle the priority for the acId (if it's already selected, deselect it)
      updatedPriorityMapping[loId].Data[acid] = updatedPriorityMapping[loId].Data[acid] === priority ? "" : priority;

      return updatedPriorityMapping;
    });
  };

  const handleDone = async () => {
    // Prepare the data to send in the required format
    const body = {
      loId: loId,  // Include loId directly
      Data: priorityMapping[loId]?.Data || {}, // Get the Data for the specific loId
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
        `${process.env.REACT_APP_API_URL}/api/learning-outcome-mapping`, // Replace with your actual API URL
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
          {acItems.map((ac, index) => (
            <div key={ac.id} className="ac-item">
              <div>
                <span className="name">{ac.name}</span>
              </div>
              <div className="priority-buttons">
                <button
                  className={`priority-button ${
                    priorityMapping[loId]?.Data[ac.id] === "H" ? "h" : ""
                  }`}
                  onClick={() => handleClick(ac.id, "H")}
                >
                  H
                </button>
                <button
                  className={`priority-button ${
                    priorityMapping[loId]?.Data[ac.id] === "M" ? "m" : ""
                  }`}
                  onClick={() => handleClick(ac.id, "M")}
                >
                  M
                </button>
                <button
                  className={`priority-button ${
                    priorityMapping[loId]?.Data[ac.id] === "L" ? "l" : ""
                  }`}
                  onClick={() => handleClick(ac.id, "L")}
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
