import React, { useState, useEffect } from 'react';
import Wrapper from './style';
import ACMapping from '../LO_AC_Mapping';
import List from '../images/list.png';
import axios from 'axios';
import Form_LO from '../Form_LO';
import MenuDots from '../MenuDots';
import Menu from '../MenuBar';

const LOlist = ({ acItems, setAcItems, loItems, setLoItems, handleLoItems, setIndex }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null); // For three-dot menu state
  const [filteredLoList, setFilteredLoList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingMapping, setPendingMapping] = useState({}); // State to hold pending counts

  const handleClick = () => setIndex(1);

  const toggleDropdown = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleProfileClick = () => alert("Go to Profile");
  const handleSettingsClick = () => alert("Open Settings");
  const handleLogoutClick = () => alert("Logging Out...");

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      setUserData(JSON.parse(userData));
    }
  }, []);

  const loadLO = async (userData) => {
    setLoading(true);
    const headers = {
      Authorization: 'Bearer YOUR_ACCESS_TOKEN',
      'Content-Type': 'application/json',
      year: userData.year,
      classname: userData.class,
      section: userData.section,
      subject: userData.subject,
      quarter: userData.quarter,
    };
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/learning-outcome`, { headers });
      const data = response.data;
      let finalData = [];
      if (Array.isArray(data)) {
        finalData = data;
      } else if (Array.isArray(data.ro)) {
        finalData = data.ro;
      } else if (Array.isArray(data.lo)) {
        finalData = data.lo;
      }
      handleLoItems(finalData);
      setFilteredLoList(finalData);
      calculatePendingMapping(finalData);
    } catch (error) {
      console.error('Error fetching report outcomes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate Pending Mapping for each LO
  const calculatePendingMapping = (loList) => {
    const pendingCounts = {};
    loList.forEach((lo) => {
      // Example logic: Calculate how many ACs are not mapped for this LO
      const relatedACs = acItems.filter((ac) => ac.loId === lo.id);
      const notMappedCount = relatedACs.filter((ac) => !ac.mapped).length;
      pendingCounts[lo.id] = notMappedCount;
    });
    setPendingMapping(pendingCounts);
  };

  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      loadLO(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredLoList(loItems);
    } else {
      const filteredData = loItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLoList(filteredData);
    }
  }, [searchQuery, loItems]);

  return (
    <Wrapper>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search LO..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        <div className="icon">
          <Menu
            onProfileClick={handleProfileClick}
            onSettingsClick={handleSettingsClick}
            onLogoutClick={handleLogoutClick}
            onReturnClick={handleClick}
          />
        </div>
      </div>
      <ul className="lo-list">
        {loading ? (
          <li>
            <p className="loading-message">Loading....</p>
          </li>
        ) : filteredLoList.length > 0 ? (
          filteredLoList.map((item, index) => (
            <li key={item.id} className={`lo-list-item ${activeIndex === index ? 'active' : ''}`}>
              <div className="lo-header" onClick={() => toggleDropdown(index)}>
                <div className="list-icon-containers">
                  <img src={List} alt="" className="list-icons" />
                </div>
                <div className="lo-info">
                  <p className="item-title">{item.name}</p>

                </div>
                <div>
                  <MenuDots
                    index={index}
                    activeMenuIndex={activeMenuIndex}
                    setActiveMenuIndex={setActiveMenuIndex}
                    onEditClick={() => alert(`Editing LO: ${item.name}`)}
                    onDeleteClick={() => alert(`Deleting LO: ${item.name}`)}
                  />
                </div>
              </div>
              <div className={`lo-dropdown-content ${activeIndex === index ? 'show' : 'hide'}`}>
                {activeIndex === index && (
                  <ACMapping acItems={acItems} setAcItems={setAcItems} loId={item.id} />
                )}
              </div>
            </li>
          ))
        ) : (
          <li className="no-results">
            <p className="no_results">No Results Found</p>
          </li>
        )}
      </ul>
      <div className="add" onClick={() => setShowForm(true)}><span className='plus'>+</span></div>
      {showForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <Form_LO closeForm={() => setShowForm(false)} loadLO={loadLO} />
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default LOlist;
