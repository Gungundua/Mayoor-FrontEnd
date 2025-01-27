import React, { useState, useEffect } from "react";
import Wrapper from "./style";
import Delete from '../images/delete2.png';
import Edit from '../images/edit2.png';
import ACMapping from "../LO_AC_Mapping";
import List from '../images/list.png';
import axios from "axios";
import Form_LO from "../Form_LO";

const LOlist = ({ loItems, setLoItems, acItems, setAcItems, userData }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [loList, setLoList] = useState([]);

  const toggleDropdown = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
   const [showForm, setShowForm] = useState(false);
    const handleform = () => {
      setShowForm(true); // Set to true when button is clicked
    };

  // const deleteItem = (id, event) => {
  //   event.stopPropagation(); // Prevents event propagation to the parent
  //   setLoItems(loItems.filter((item) => item.id !== id));
  // };


  useEffect(() => {
    const loadLO = async (userdata) => {
      const headers = {
        Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with the actual token
        'Content-Type': 'application/json',
        year: userdata.year,
        class: userdata.class,
        section: userdata.section,
        subject: userdata.subject,
        quarter: userdata.quarter,
      };
  
      console.log("Headers:", headers);
  
      try {
        const response = await axios.get('http://10.33.0.41:8000/api/learning_outcomes', { headers });
        const data = response.data;
  
        console.log("API Response Data:", data);
  
        if (Array.isArray(data)) {
          setLoList(data);
        } else if (Array.isArray(data.ro)) {
          setLoList(data.ro);
        } else if (Array.isArray(data.lo)) {
          setLoList(data.lo);
        } else {
          console.warn("Unexpected API response format:", data);
          setLoList([]);
        }
      } catch (error) {
        console.error("Error fetching report outcomes:", error.response || error.message);
        setLoList([]);
      }
    };
  
    if (Object.keys(userData).length > 0) {
      loadLO(userData);
    } else {
      console.warn("userData is empty or invalid:", userData);
    }
  }, [userData]);
   // Dependency on userData to trigger the effect

  console.log('user data in lo :', userData);

  return (
    <Wrapper>
      <h2 className="lo-list-title">LO List</h2>
      <ul className="lo-list">
        {loList.map((item, index) => (
          <li key={item.id} className="lo-list-item">
            <div className="lo-header" onClick={() => toggleDropdown(index)}>
              <div className="list-icon-container">
                <img src={List} alt="" className="list-icon" />
              </div>
              <div className="lo-info">
                <p className="item-no">LO - {item.id}</p>
                <p className="item-title">{item.name}</p>
              </div>
              <img src={Edit} alt="edit" className="edit" />
              <img
                src={Delete}
                alt="delete"
                className="delete"
                //onClick={(event) => deleteItem(item.id, event)}
              />
              <div className="lo-dropdown-icon">
                {activeIndex === index ? "▲" : "▼"}
              </div>
            </div>
            {activeIndex === index && (
              <div className="lo-dropdown-content">
                <ACMapping acItems={acItems} setAcItems={setAcItems} />
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="add" onClick={handleform}>+</div>
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

export default LOlist;
