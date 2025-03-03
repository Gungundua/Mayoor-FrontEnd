import React, { useState, useEffect } from 'react';
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

  const handleClick = () => {
    setIndex(1);
  };

  const toggleDropdown = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      setUserData(JSON.parse(userData));
    }
  }, []);

  const handleProfileClick = () => alert("Go to Profile");
  const handleSettingsClick = () => alert("Open Settings");
  const handleLogoutClick = () => alert("Logging Out...");

  useEffect(() => {
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
        const data = response.data;
        console.log('Response data : ', data)
        setRoList(data);
        setFilteredRoList(data);
      } catch (error) {
        console.error('Error fetching report outcomes:', error.response || error.message);
        setRoList([]);
        setFilteredRoList([]);
      } finally {
        setLoading(false);
      }
    };

    if (userData && Object.keys(userData).length > 0) {
      loadRO(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredRoList(roList);
    } else {
      const filteredData = roList.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRoList(filteredData);
    }
  }, [searchQuery, roList]);

  return (
    <Wrapper>
      <div className="search-container">
      <div className="icon">
          <Menu
            onProfileClick={handleProfileClick}
            onSettingsClick={handleSettingsClick}
            onLogoutClick={handleLogoutClick}
            onReturnClick={handleClick}
          />
        </div>
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
          <li>
            <div class="circular"></div>
            <p className='loading-message'>Loading....</p>
          </li>
        ) : filteredRoList.length > 0 ? (
          filteredRoList.map((item, index) => {
            return (
              <li key={item.ro_id} className="ro-list-item">
                <div className="ro-header" onClick={() => toggleDropdown(index)}>
                  <div className="list-icon-containers">
                    <img src={List} alt="" className="list-icons" />
                  </div>
                  <div className="ro-info">
                    <p className="item-title">{item.ro_name}</p>
                  </div>
                  <div className='mapCounter'>1</div>
                </div>
                {activeIndex === index && (
                  <div className="ro-dropdown-content">
                    <LOMapping 
                      loItems={loItems} 
                      userData={userData} 
                      roId={item.id} 
                    />
                  </div>
                )}
              </li>
            );
          })
        ) : (
          <li className="no-results">
            <img className='no-results' src={noData} />
          </li> 
        )}
      </ul>
    </Wrapper>
  );
};

export default ROlist;
