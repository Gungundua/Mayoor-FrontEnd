import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Wrapper from "./style";

const Form_LO = ({ closeForm, loadLO, closeForm2, closeFormOnly, setShowSuccess, setShowFailed }) => {
  const [loInput, setLoInput] = useState("");
  const [filteredRoList, setFilteredRoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [selectedRoIds, setselectedRoIds] = useState([]);

  const successTimeout = useRef(null);

  useEffect(() => {
    return () => {
      if (successTimeout.current) {
        clearTimeout(successTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
        if (parsedUserData?.year && parsedUserData?.class) {
          loadRO(parsedUserData);
        } else {
          console.error("Invalid userData:", parsedUserData);
        }
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    } else {
      console.warn("No userData found in sessionStorage");
    }
  }, []);

  const loadRO = async (userData) => {
    if (!userData) return;
    setLoading(true);
    const headers = {
      Authorization: "Bearer YOUR_ACCESS_TOKEN",
      "Content-Type": "application/json",
      year: userData.year,
      classname: userData.class,
      section: userData.section,
      subject: userData.subject,
    };
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/report-outcome`,
        { headers }
      );

      console.log("API Response:", response.data); // Debugging log

      let finalData = [];
      if (Array.isArray(response.data?.ro)) {
        finalData = response.data.ro;
      } else if (Array.isArray(response.data)) {
        finalData = response.data;
      } else {
        console.warn("Unexpected API response format:", response.data);
      }

      // Ensure every item has an ro_id before setting state
      if (!finalData.every((item) => item.ro_id)) {
        console.error("Some items are missing ro_id:", finalData);
      }

      setFilteredRoList(finalData);
    } catch (error) {
      console.error("Error fetching ROs:", error.response?.data || error.message);
      alert(`Error loading RO data: ${error.response?.data?.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (ro_id) => {
    console.log("Selected RO ID:", ro_id); // Debugging log

    setselectedRoIds((prevSelected) =>
      prevSelected.includes(ro_id)
        ? prevSelected.filter((id) => id !== ro_id)
        : [...prevSelected, ro_id]
    );
  };

  const handleSubmit = async () => {
    if (loInput.trim() === "") {
      alert("Please enter a valid LO!");
      return;
    }
  
    if (selectedRoIds.length === 0) {
      alert("Please select at least one Reported Outcome!");
      return;
    }
  
    try {
      const headers = {
        Authorization: "Bearer YOUR_ACCESS_TOKEN",
        "Content-Type": "application/json",
        classname: userData.class,
        year: userData.year,
        subject: userData.subject,
        quarter: userData.quarter,
      };
  
      const body = {
        name: loInput, // LO name
        ro_id: selectedRoIds, // Array of selected RO IDs
      };
  
      console.log("Payload being sent:", body); // Debugging log
  
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/learning-outcome`,
        body,
        { headers }
      );
  
      if (response.status === 201) {
        setLoInput(""); // Reset input field
        setselectedRoIds([]); // Clear selection
        // loadLO(userData); // Refresh LO list
  
        successTimeout.current = setTimeout(() => {
          setShowSuccess(true);
          successTimeout.current = setTimeout(() => setShowSuccess(false), 2000);
        }, 500);
  
        closeForm(); // Close form after success
      } else {
        alert("Failed to add LO. Please try again!");
      }
    } catch (error) {
      console.error("Error adding new LO:", error.response || error.message);
      closeForm2();
      setShowFailed(true);
      setTimeout(() => setShowFailed(false), 2000);
    }
  };
  
  return (
    <Wrapper>
      <div className="form-container">
        <p className="header">Enter the LO you want to add :</p>
        <input
          type="text"
          placeholder="Enter Learning Outcome"
          className="input"
          value={loInput}
          onChange={(e) => setLoInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <ul className="ro-list">
          {loading ? (
            <li><p className="loading-message">Loading...</p></li>
          ) : filteredRoList.length > 0 ? (
            filteredRoList.map((item) => (
              <li key={item.ro_id} className="ro-list-item">
                <div className="ro-header">
                  <div className="ro-info">
                    <input type="checkbox" 
                      checked={selectedRoIds.includes(item.ro_id)}
                      onChange={() => handleCheckboxChange(item.ro_id)}
                    />
                    <p className="para">{item.ro_name}</p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="no-results">
              <p className="no_results">No Report Outcomes Found</p>
            </li>
          )}
        </ul>
        <div className="buttons">
          <input
            type="button"
            value="Close"
            onClick={() => {
              clearTimeout(successTimeout.current);
              setShowSuccess(false); // Ensure success popup is hidden when closing
              closeFormOnly();
            }}
            className="closebtn"
          />
          <input type="button" value="Add" className="submitbtn" onClick={handleSubmit} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Form_LO;
