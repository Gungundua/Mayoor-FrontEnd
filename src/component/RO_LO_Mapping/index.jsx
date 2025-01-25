import React, { useState } from "react";
import Wrapper from "./style";

const LOMapping = ({loItems, setLoItems}) => {
  // const [loList, setLoList] = useState([
  //   { id: 1, priority: "" , description:"title"},
  //   { id: 2, priority: "" , description:"title"},
  //   { id: 3, priority: "" , description:"title"},
  //   { id: 4, priority: "" , description:"title"},
  //   { id: 5, priority: "" , description:"title"},
  //   { id: 6, priority: "" , description:"title"},
  //   { id: 6, priority: "" , description:"title"},
  //   { id: 6, priority: "" , description:"title"},
  //   { id: 6, priority: "" , description:"title"},
  //   { id: 6, priority: "" , description:"title"},
  //   { id: 6, priority: "" , description:"title"},
  //   { id: 6, priority: "" , description:"title"},
  //   { id: 6, priority: "" , description:"title"},
  //   { id: 6, priority: "" , description:"title"},
  //   { id: 6, priority: "" , description:"title"},
  // ]);

  const handleClick = (id, priority) => {
    setLoItems((prev) =>
      prev.map((lo) =>
        lo.id === id
          ? { ...lo, priority: lo.priority === priority ? "" : priority } // Deselect if already selected
          : lo
      )
    );
  };

  const setPriority = (id, priority) => {
    setLoItems((prev) =>
      prev.map((lo) =>
        lo.id === id ? { ...lo, priority } : lo
      )
    );
  };

  return (
    <Wrapper>
      <div className="lo-list-container">
        <div className="lo-list">
          {loItems.map((lo) => (
            <div key={lo.id} className="lo-item">
              <div>
                <h2>LO {lo.id}</h2>
                <span>{lo.title}</span>
              </div>
              <div className="priority-buttons">
                <button
                  className={`priority-button ${
                    lo.priority === "H" ? "h" : ""
                  }`}
                  onClick={() => handleClick(lo.id, "H")}
                >
                  H
                </button>
                <button
                  className={`priority-button ${
                    lo.priority === "M" ? "m" : ""
                  }`}
                  onClick={() => handleClick(lo.id, "M")}
                >
                  M
                </button>
                <button
                  className={`priority-button ${
                    lo.priority === "L" ? "l" : ""
                  }`}
                  onClick={() => handleClick(lo.id, "L")}
                >
                  L
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="btns">
          <input type="button" value="Add New LO" className="add"/>
          <input type="button" value="Done" className="btn" />
        </div>
    </div>
    </Wrapper>
  );
};

export default LOMapping;
