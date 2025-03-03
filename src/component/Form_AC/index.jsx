import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Wrapper from "./style";

const Form_AC = ({ closeForm, loadAC, closeForm2, closeFormOnly, setShowSuccess, setShowFailed }) => {
  const [acName, setAcName] = useState("");
  const [maxMarks, setMaxMarks] = useState("");
  const [userData, setUserData] = useState(null);
  const [filteredLoList, setFilteredLoList] = useState([]);
  const [selectedLoIds, setSelectedLoIds] = useState([]); // Track selected lo_id
  const [loading, setLoading] = useState(false);
  const [addAssess, setAddAssess] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          loadLO(parsedUserData);
        }
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    }
  }, []);

  const loadLO = async (userData) => {
    setLoading(true);
    const headers = {
      Authorization: "Bearer YOUR_ACCESS_TOKEN",
      "Content-Type": "application/json",
      year: userData.year,
      classname: userData.class,
      section: userData.section,
      subject: userData.subject,
      quarter: userData.quarter,
    };
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/learning-outcome`, { headers });
      setFilteredLoList(response.data);
    } catch (error) {
      console.error("Error fetching report outcomes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (lo_id) => {
    setSelectedLoIds((prevSelected) =>
      prevSelected.includes(lo_id)
        ? prevSelected.filter((id) => id !== lo_id) 
        : [...prevSelected, lo_id] 
    );
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
  
    if (!acName.trim() || !maxMarks) {
      alert("Please fill in all fields.");
      setIsSubmitting(false);
      return;
    }
  
    if (!userData?.year || !userData?.class || !userData?.section || !userData?.subject || !userData?.quarter) {
      alert("Missing user details. Ensure all fields are filled in.");
      setIsSubmitting(false);
      return;
    }
  
    if (selectedLoIds.length === 0) {
      alert("Please select at least one Learning Outcome.");
      setIsSubmitting(false);
      return;
    }
  
    const headers = {
      Authorization: "Bearer YOUR_ACCESS_TOKEN",
      "Content-Type": "application/json",
      year: userData.year,
      classname: userData.class,
      section: userData.section,
      subject: userData.subject,
      quarter: userData.quarter,
    };
  
    const body = {
      name: acName.trim(),
      max_marks: parseInt(maxMarks, 10),
      lo_id: selectedLoIds, // Send only selected LO IDs
    };
  
    console.log("Payload being sent:", body); // Debugging log
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/assessment-criteria`,
        body,
        { headers }
      );
  
      if (response.status === 201) {
        // const newAssessment = response.data; // Assuming API returns only the newly added assessment
      
        // console.log("Newly Created Assessment:", newAssessment);
  
        setAcName("");
        setMaxMarks("");
        setSelectedLoIds([]);
        
        // loadAC(newAssessment); // Pass only the new assessment, not the full list
        closeForm();
  
        successTimeout.current = setTimeout(() => {
          setShowSuccess(true);
          successTimeout.current = setTimeout(() => setShowSuccess(false), 2000);
        }, 500);
      }
    } catch (error) {
      console.error("Error adding new AC:", error.response?.data || error.message);
      setShowFailed(true);
      setTimeout(() => setShowFailed(false), 2000);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Wrapper>
      <div className="form-box">
        <div className="toggle-buttons">
          <input
            type="button"
            value="Add Assessment"
            className={addAssess ? "active" : ""}
            onClick={() => setAddAssess(true)}
          />
          <input
            type="button"
            value="Final Assessment"
            className={!addAssess ? "active" : ""}
            onClick={() => setAddAssess(false)}
          />
        </div>
        <form>
          <input
            type="text"
            placeholder="Enter Assessment Criteria"
            value={acName}
            onChange={(e) => setAcName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Maximum Marks"
            value={maxMarks}
            onChange={(e) => setMaxMarks(e.target.value)}
          />
          <ul className="lo-list">
            {loading ? (
              <li>
                <p className="loading-message">Loading...</p>
              </li>
            ) : filteredLoList.length > 0 ? (
              filteredLoList.map((item) => (
                <li key={item.lo_id} className="lo-list-item">
                  <div className="lo-header">
                    <div className="lo-info">
                      <input
                        type="checkbox"
                        checked={selectedLoIds.includes(item.lo_id)}
                        onChange={() => handleCheckboxChange(item.lo_id)}
                      />
                      <p>{item.lo_name}</p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="no-results">
                <p className="no_results">No Learning Outcomes Found</p>
              </li>
            )}
          </ul>
          <div className="buttons">
            <input
              type="button"
              value="Close"
              onClick={() => {
                clearTimeout(successTimeout.current);
                setShowSuccess(false);
                closeFormOnly();
              }}
              className="closebtn"
            />
            <button
              type="button"
              className="savebtn"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default Form_AC;
