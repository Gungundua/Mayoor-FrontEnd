import React, { useState } from "react";
import "./style.css"; 

const ROList = () => {
  const [expanded, setExpanded] = useState(false);
  const [loList, setLoList] = useState([
    { id: 1, priority: "" , description:"title"},
    { id: 2, priority: "" , description:"title"},
    { id: 3, priority: "" , description:"title"},
    { id: 4, priority: "" , description:"title"},
    { id: 5, priority: "" , description:"title"},
    { id: 6, priority: "" , description:"title"},
  ]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const setPriority = (id, priority) => {
    setLoList((prev) =>
      prev.map((lo) =>
        lo.id === id ? { ...lo, priority } : lo
      )
    );
  };

  return (
    <div className="ro-list-container">
      <div className="ro-header" onClick={toggleExpanded}>
        <div className="ro-info">
          <div>
            <h3>RO-1</h3>
            <p>Description</p>
          </div>
        </div>
        <div className="expand-icon">{expanded ? "▲" : "▼"}</div>
      </div>
      {expanded && (
        <div className="lo-list">
          {loList.map((lo) => (
            <div key={lo.id} className="lo-item">
              <div>
                <h2>LO {lo.id}</h2>
                <span>{lo.description}</span>
              </div>
              <div className="priority-buttons">
                <button
                  className={`priority-button ${
                    lo.priority === "H" ? "h" : ""
                  }`}
                  onClick={() => setPriority(lo.id, "H")}
                >
                  H
                </button>
                <button
                  className={`priority-button ${
                    lo.priority === "M" ? "m" : ""
                  }`}
                  onClick={() => setPriority(lo.id, "M")}
                >
                  M
                </button>
                <button
                  className={`priority-button ${
                    lo.priority === "L" ? "l" : ""
                  }`}
                  onClick={() => setPriority(lo.id, "L")}
                >
                  L
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ROList;
