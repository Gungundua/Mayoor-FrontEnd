import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const LearningOutcomeForm = ({ userData, editItem, loadLO, closeForm }) => {
  const [loInput, setLoInput] = useState("");
  const [selectedRoIds, setSelectedRoIds] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const isSubmittingRef = useRef(false);
  const successTimeout = useRef(null);

  useEffect(() => {
    if (editItem) {
      setLoInput(editItem.name);
      setSelectedRoIds(editItem.ro_id || []);
    }
    return () => clearTimeout(successTimeout.current);
  }, [editItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setIsSubmitting(true);

    if (loInput.trim() === "") {
      alert("Please enter a valid LO!");
      isSubmittingRef.current = false;
      setIsSubmitting(false);
      return;
    }

    if (selectedRoIds.length === 0) {
      alert("Please select at least one Reported Outcome!");
      isSubmittingRef.current = false;
      setIsSubmitting(false);
      return;
    }

    const headers = {
      Authorization: "Bearer YOUR_ACCESS_TOKEN",
      "Content-Type": "application/json",
      classname: userData.class,
      year: userData.year,
      subject: userData.subject,
      quarter: userData.quarter,
    };

    const body = {
      name: loInput,
      ro_id: selectedRoIds,
    };

    try {
      let response;
      if (editItem) {
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/learning-outcome?id=${editItem.lo_id}`,
          body,
          { headers }
        );
      } else {
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/learning-outcome`,
          body,
          { headers }
        );
      }

      if (response.status === 200 || response.status === 201) {
        setLoInput("");
        setSelectedRoIds([]);
        loadLO(userData);
        closeForm();

        successTimeout.current = setTimeout(() => {
          setShowSuccess(true);
          successTimeout.current = setTimeout(() => setShowSuccess(false), 2000);
        }, 500);
      }
    } catch (error) {
      console.error("Error saving LO:", error.response?.data || error.message);
      setShowFailed(true);
      setTimeout(() => setShowFailed(false), 2000);
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Learning Outcome:
        <input
          type="text"
          value={loInput}
          onChange={(e) => setLoInput(e.target.value)}
        />
      </label>
      <label>
        Select Reported Outcomes:
        <select
          multiple
          value={selectedRoIds}
          onChange={(e) =>
            setSelectedRoIds(Array.from(e.target.selectedOptions, (option) => option.value))
          }
        >
          <option value="1">Outcome 1</option>
          <option value="2">Outcome 2</option>
          <option value="3">Outcome 3</option>
        </select>
      </label>
      <button type="submit" disabled={isSubmitting}>
        {editItem ? "Update" : "Create"} Learning Outcome
      </button>
      {showSuccess && <p>Success! Learning Outcome saved.</p>}
      {showFailed && <p>Failed to save Learning Outcome.</p>}
    </form>
  );
};

export default LearningOutcomeForm;
