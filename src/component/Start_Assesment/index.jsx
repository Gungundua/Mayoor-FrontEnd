import React, { useState } from 'react';
import Wrapper from './style';
import { FaArrowLeft } from 'react-icons/fa';
import Student from './Student.avif';
import StudentSelect from '../Students/StudentSelect';

const Profile = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [acData, setAcData] = useState([]);
  const [isProfileVisible, setIsProfileVisible] = useState(true);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const generateAcData = () => {
    let data = [];
    for (let i = 1; i <= 100; i++) {
      data.push({ id: i, acName: `AC-${i}`, marks: '' });
    }
    setAcData(data);
  };

  React.useEffect(() => {
    generateAcData();
  }, []);  
  
  const handleBackButtonClick = () => {
    setIsProfileVisible(false);
   };

  if (!isProfileVisible) {
    return (
      <Wrapper>
        <div className="black-page">
          <h1>This is the Black Page</h1>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="search-container">
      <button className="back-button" onClick={handleBackButtonClick}>
          <StudentSelect />
        </button>
        <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchChange} className="search-bar" />
      </div>

      <div className="profile-section">
        <div className="image-container">
          <img src={Student} alt="Profile" className="profile-image"/>
        </div>
        <div className="info-container">
          <h1 className="name">Student's Name</h1>
          <p className="roll-number">Roll Number: 12345</p>
        </div>
      </div>

      <div className="ac-container">
        {acData.map((ac) => (
            <div className="ac-box" key={ac.id}>
              <h2>{ac.acName}</h2>
              <input type="text" value={ac.marks} onChange={(e) => { const updatedData = [...acData]; updatedData[ac.id - 1].marks = e.target.value; setAcData(updatedData)}} placeholder="Enter Marks" className="marks-input" />
            </div>
        ))}
      </div>

    </Wrapper>
  );
}

export default Profile;


