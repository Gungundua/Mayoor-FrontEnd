import React, { useState, useEffect } from "react";
import Wrapper from "./style";
import { FaArrowLeft } from "react-icons/fa";
import Student from "./Student.avif";

const Assessment = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [acData, setAcData] = useState([]);
  const [isProfileVisible, setIsProfileVisible] = useState(true);
  
   // Load data from localStorage when the component mounts
   useEffect(() => {
    const storedData = localStorage.getItem("assessmentData");
    if (storedData) {
      setAcData(JSON.parse(storedData));
    } else {
      generateAcData(); 
    }
  }, []);

  useEffect(() => {
    if (acData.length > 0) {
      localStorage.setItem("assessmentData", JSON.stringify(acData));
      console.log("Updated Assessment Data:", acData); 
    }
  }, [acData]);

   // Send data in headers to the backend via a POST API using axios
  //  const sendDataToBackend = async () => {
  //   try {
  //     const headers = {
  //       "Content-Type": "application/json", // Set the content type to JSON
  //       "Assessment-Data": JSON.stringify(acData), // Add the data to the headers
  //     };

  //     const response = await axios.post("https://10.33.0.41:8000/api/assessment_criteria", {}, { headers });

  //     console.log("Data sent successfully:", response.data); // Log response from backend
  //   } catch (error) {
  //     console.error("Error sending data:", error);
  //   }
  // };

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

  useEffect(() => {
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

  const handleMarksChange = (e, id) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const updatedData = [...acData];
      updatedData[id - 1].marks = value;
      setAcData(updatedData);
    }
  };

  return (
    <Wrapper>
      <div className="search-container">
      <button className="back-button" onClick={handleBackButtonClick}>
          <FaArrowLeft />
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
              <input
              type="text"
              value={ac.marks}
              onChange={(e) => handleMarksChange(e, ac.id)}
              placeholder="Enter Marks"
              className="marks-input"
            /></div>
        ))}
      </div>
      
      <button className="done-button">Done</button>
    </Wrapper>
  );
}

export default Assessment;