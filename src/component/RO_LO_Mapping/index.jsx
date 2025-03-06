import React, { useState, useEffect } from "react";
import Wrapper from "./style";
import Form_LO from "../Form_LO/index";
import axios from "axios";
const LOMapping = ({ roId, loItems, roData }) => {
  const [priorityMapping, setPriorityMapping] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log('roDta : ', roData)
  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      setUserData(JSON.parse(userData));
    }
    if (roData && Array.isArray(roData)) {
      const initialMapping = {};
      roData
        .flatMap((ro) => ro.assessment_criterias || []) // Ensure assessment_criterias exists
        .forEach((lo) => {
          if (lo && lo.priority !== null) { // Ensure lo is defined before accessing priority
            initialMapping[lo.lo_id] = lo.priority.toLowerCase();
          }
        });
      setPriorityMapping(initialMapping);
    }
  }, [roData]);
  const handleClick = (loid, priority) => {
    setPriorityMapping((prev) => ({
      ...prev,
      [loid]: prev[loid] === priority.toLowerCase() ? "" : priority.toLowerCase(),
    }));
  };
  const handleSubmit = async () => {
    setLoading(true);
    const formattedData = {
      data: Object.entries(priorityMapping)
        .filter(([_, priority]) => priority)
        .map(([lo_id, priority]) => ({
          lo_id: Number(lo_id),
          priority: priority.toLowerCase(),
        })),
    };
    if (formattedData.data.length === 0) {
      alert("No priorities selected.");
      setLoading(false);
      return;
    }
    console.log("Formatted Data being sent:", JSON.stringify(formattedData, null, 2));
    console.log(roId)
    const headers = {
      Authorization: `Bearer ${userData?.token}`,
      "Content-Type": "application/json",
      year: userData?.year,
      classname: userData?.class,
      section: userData?.section,
      subject: userData?.subject,
      quarter: userData?.quarter,
    };
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/report-outcome-mapping?ro_id=${roId}`,
        formattedData,
        { headers }
      );
      console.log("Priorities updated:", response.data);
      alert("Priorities updated successfully!");
    } catch (error) {
      console.error("Error updating priorities:", error.response?.data || error.message);
      alert("Failed to update priorities");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Wrapper>
      <div className="lo-list-container">
        <div className="lo-list">
          {roData?.flatMap((ro) => ro.learning_outcomes)?.map((lo) => {
            if (!lo?.lo_id) return null; // Ensure lo_id is defined
            const selectedPriority = priorityMapping[lo.lo_id] || "";
            return (
              <div key={lo.lo_id} className="lo-item">
                <div>
                  <span className="name">{lo.lo_name}</span>
                </div>
                <div className="priority-buttons">
                  <button
                    className={`priority-button ${selectedPriority === "h" ? "h" : ""}`}
                    onClick={() => handleClick(lo.lo_id, "H")} // Fix applied here
                  >
                    H
                  </button>
                  <button
                    className={`priority-button ${selectedPriority === "m" ? "m" : ""}`}
                    onClick={() => handleClick(lo.lo_id, "M")} // Fix applied here
                  >
                    M
                  </button>
                  <button
                    className={`priority-button ${selectedPriority === "l" ? "l" : ""}`}
                    onClick={() => handleClick(lo.lo_id, "L")} // Fix applied here
                  >
                    L
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="btns">
          <input
            type="button"
            value={loading ? "Updating..." : "Done"}
            className="btn"
            onClick={handleSubmit}
            disabled={loading}
          />
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