import React, { useState, useEffect } from "react";
import Wrapper from "./style";
import Delete from '../images/delete2.png'
import Edit from '../images/edit2.png'
import List from '../images/list.png'
import axios from "axios";
import Form_AC from "../Form_AC";

const AClist = ({acItems, setAcItems, userData}) => {
  const [activeIndex, setActiveIndex] = useState(null);
 
  const deleteItem = (id, event) => {
    event.stopPropagation(); // Prevents event propagation to the parent
    setAcItems(acItems.filter((item) => item.id !== id));
  };
  const [acList, setAcList] = useState([]);
  const [showForm, setShowForm] = useState(false)
  const handleform = ()=>{
    setShowForm(true)
  }

  useEffect(() => {
    const storedLoList = sessionStorage.getItem('loList');
    if (storedLoList) {
      setAcList(JSON.parse(storedLoList)); // Load from session storage if available
    } else {
      const loadAC = async (userdata) => {
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
          const response = await axios.get('http://10.33.0.41:8000/api/assessment_criterias', { headers });
          const data = response.data;
    
          console.log("API Response Data:", data);
    
          // Handle the correct API response format
          if (data && Array.isArray(data.assessments)) {
            setAcList(data.assessments); // Use the `assessments` array from the response
          } else {
            console.warn("Unexpected API response format:", data);
            setAcList([]); // Default to empty if the format is unexpected
          }
        } catch (error) {
          console.error("Error fetching report outcomes:", error.response || error.message);
          setAcList([]);
        }
      };
    
      if (Object.keys(userData).length > 0) {
        loadAC(userData);
      } else {
        console.warn("userData is empty or invalid:", userData);
      }
    } 
  }, [userData]); // Dependency on userData to trigger the effect

  console.log('user data in ac :', userData);

  return (
    <Wrapper>
      <h2 className="ac-list-title">AC List</h2>
      <ul className="ac-list">
        {acList.map((item, index) => (
          <li key={item.id} className="ac-list-item">
            <div className="ac-header" >
              <div className="list-icon-container">
                <img src={List} alt="" className="list-icon"/>
              </div>
              <div className="ac-info">
                <p className="item-no">AC - {item.id}</p>
                <p className="item-title">{item.name}</p>
              </div>
              <img src={Edit} alt="edit" className="edit" />
              <img src={Delete} alt="delete" className="delete" onClick={(event) => deleteItem(item.id, event)}/>
            </div>
          </li>
        ))}
      </ul>
      <div className="add" onClick={handleform}>+</div>
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

export default AClist;
