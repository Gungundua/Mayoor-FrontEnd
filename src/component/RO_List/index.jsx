import React, { useState, useEffect, useRef } from 'react';
import Wrapper from './style';
import LOMapping from '../RO_LO_Mapping';
import List from '../images/list.png';
import axios from 'axios';
import noData from "../assets/noData.png";
import Menu from '../MenuBar';
const ROlist = ({ loItems, setLoItems, setIndex, handleLoItems, acItems }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [roList, setRoList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRoList, setFilteredRoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [heldRO, setHeldRO] = useState(null); // :fire: Track which RO is being held
  const timeoutRef = useRef(null);
  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      loadRO(JSON.parse(userData));
    }
  }, []);
  const loadRO = async (userdata) => {
    setLoading(true);
    const headers = {
      Authorization: 'Bearer YOUR_ACCESS_TOKEN',
      'Content-Type': 'application/json',
      year: userdata.year,
      classname: userdata.class,
      section: userdata.section,
      subject: userdata.subject,
    };
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/report-outcome`, { headers });
      setRoList(response.data);
      setFilteredRoList(response.data);
    } catch (error) {
      console.error('Error fetching report outcomes:', error.response || error.message);
      setRoList([]);
      setFilteredRoList([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!searchQuery) {
      setFilteredRoList(roList);
    } else {
      const filteredData = roList.filter(item =>
        item.ro_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRoList(filteredData);
    }
  }, [searchQuery, roList]);
  // :fire: Touch and Hold Logic
  const handleTouchStart = (ro) => {
    timeoutRef.current = setTimeout(() => {
      setHeldRO(ro); // Store the RO being held
    }, 800); // 800ms delay for touch hold
  };
  const handleTouchEnd = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    setHeldRO(null); // Remove LO display
  };
  return (
    <Wrapper>
      <div className="search-container">
        <Menu onReturnClick={() => setIndex(1)} />
        <input
          type="text"
          placeholder="Search RO..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>
      <ul className="ro-list">
        {loading ? (
          <li className="loading-message">Loading...</li>
        ) : filteredRoList.length > 0 ? (
          filteredRoList.map((item) => (
            <li
              key={item.ro_id}
              className="ro-list-item"
              onTouchStart={() => handleTouchStart(item)}
              onTouchEnd={handleTouchEnd}
              onContextMenu={(e) => e.preventDefault()} // Prevent long-press menu
            >
              <div className="ro-header">
                <div className="list-icon-containers">
                  <img src={List} alt="" className="list-icons" />
                </div>
                <div className="ro-info">
                  <p className="item-title">{item.ro_name}</p>
                </div>
                <div className='mapCounter'>
                  {item.learning_outcomes ? item.learning_outcomes.length : 0}
                </div>
              </div>
              {/* :fire: Show LO names when held */}
              {heldRO && heldRO.ro_id === item.ro_id && (
                <div className="held-popup">
                  {heldRO.learning_outcomes.length > 0 ? (
                      heldRO.learning_outcomes.map((lo) => (
                        <div key={lo.lo_id} className='mapLoItem'>{lo.lo_name}</div>
                      ))
                    ) : (
                      <div>No Learning Outcome Mapped</div>
                    )}
                </div>
              )}
            </li>
          ))
        ) : (
          <li className="no-results">
            <img className='no-results' src={noData} alt="No Data" />
          </li>
        )}
      </ul>
    </Wrapper>
  );
};
export default ROlist;