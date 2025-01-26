import React from "react";
import Wrapper from "./style";
import { useState } from "react";
import Form_AC from "../Form_AC"


const ACMapping = ({ acItems, setAcItems }) => {
  const setPriority = (id, priority) => {
    setAcItems((prev) =>
      prev.map((ac) =>
        ac.id === id ? { ...ac, priority } : ac
      )
    );
  };

  const handleClick = (id, priority) => {
    setAcItems((prev) =>
      prev.map((ac) =>
        ac.id === id
          ? { ...ac, priority: ac.priority === priority ? "" : priority } // Deselect if already selected
          : ac
      )
    )
  }
  const [showForm, setShowForm] = useState(false)
  const handleform = ()=>{
    setShowForm(true)
  }
  return (
    <Wrapper>
      <div className="ac-list-container">
        <div className="ac-list">
          {acItems.map((ac) => (
            <div key={ac.id} className="ac-item">
              <div>
                <h2>AC {ac.id}</h2>
                <span>{ac.title}</span>
              </div>
              <div className="priority-buttons">
                <button
                  className={`priority-button ${
                    ac.priority === "H" ? "h" : ""
                  }`}
                  onClick={() => handleClick(ac.id, "H")}
                >
                  H
                </button>
                <button
                  className={`priority-button ${
                    ac.priority === "M" ? "m" : ""
                  }`}
                  onClick={() => handleClick(ac.id, "M")}
                >
                  M
                </button>
                <button
                  className={`priority-button ${
                    ac.priority === "L" ? "l" : ""
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
          <input type="button" value="Done" className="btn" />
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
