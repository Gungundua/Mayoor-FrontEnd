import React, { useState } from "react"; 
import Wrapper from "./style";

const ACMapping = () => {
  const [acList, setAcList] = useState([
    { id: 1, priority: "" , description:"title"},
    { id: 2, priority: "" , description:"title"},
    { id: 3, priority: "" , description:"title"},
    { id: 4, priority: "" , description:"title"},
    { id: 5, priority: "" , description:"title"},
    { id: 6, priority: "" , description:"title"},
    { id: 6, priority: "" , description:"title"},
    { id: 6, priority: "" , description:"title"},
    { id: 6, priority: "" , description:"title"},
    { id: 6, priority: "" , description:"title"},
    { id: 6, priority: "" , description:"title"},
    { id: 6, priority: "" , description:"title"},
    { id: 6, priority: "" , description:"title"},
    { id: 6, priority: "" , description:"title"},
    { id: 6, priority: "" , description:"title"},
  ]);


  const setPriority = (id, priority) => {
    setAcList((prev) =>
      prev.map((ac) =>
        ac.id === id ? { ...ac, priority } : ac
      )
    );
  };

  return (
    <Wrapper>
        <div className="ac-list-container">
        <div className="ac-list">
          {acList.map((ac) => (
            <div key={ac.id} className="ac-item">
              <div>
                <h2>AC {ac.id}</h2>
                <span>{ac.description}</span>
              </div>
              <div className="priority-buttons">
                <button
                  className={`priority-button ${
                    ac.priority === "H" ? "h" : ""
                  }`}
                  onClick={() => setPriority(ac.id, "H")}
                >
                  H
                </button>
                <button
                  className={`priority-button ${
                    ac.priority === "M" ? "m" : ""
                  }`}
                  onClick={() => setPriority(ac.id, "M")}
                >
                  M
                </button>
                <button
                  className={`priority-button ${
                    ac.priority === "L" ? "l" : ""
                  }`}
                  onClick={() => setPriority(ac.id, "L")}
                >
                  L
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="btns">
          <input type="button" value="Add New AC" className="add"/>
          <input type="button" value="Done" className="btn" />
        </div>
    </div>
    </Wrapper>
  );
};

export default ACMapping;
