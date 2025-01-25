import React, { useState, useEffect } from 'react';
import Wrapper from './style';
import axios from 'axios';

const HomeList = ({ user, setIndex }) => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedQuarter, setSelectedQuarter] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [students, setStudents] = useState([]);
  const [userdata, setUserdata] = useState({});

  const handleClick = () => {
    const updatedUserdata = {
      year: parseInt(selectedYear, 10),
      class: parseInt(selectedClass, 10),
      section: selectedSection,
      quarter: parseInt(selectedQuarter, 10),
      // subject: parseInt(selectedYear, 10),
    };
    setUserdata(updatedUserdata); // Update userdata state
    // localStorage.setItem('userdata', JSON.stringify(updatedUserdata)); // Store in localStorage
    console.log('User Data:', updatedUserdata);
    loadStudents(updatedUserdata);
  };
  const loadStudents = (userdata) => {
    const headers = {
      Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with the actual token
      'Content-Type': 'application/json',
      year: userdata.year,         // Extracting 'year' from userdata
      class: userdata.class,   // Extracting 'class' (or className) from userdata
      section: userdata.section,   // Extracting 'section' from userdata
    };
  
    axios
      .get('http://10.33.0.41:8000/api/students', { headers })
      .then(({ data }) => {
        console.log('Response Data:', data);
        setStudents(data); // Assuming setStudents is a state setter function
      })
      .catch((err) => {
        console.error('Error:', err.response || err.message);
      })
      .finally(() => {
        console.log('API request completed.');
      });
  };

  useEffect(() => {
    if (Object.keys(userdata).length > 0) {
      loadStudents(userdata);
    }
  }, [userdata]);

  return (
    <Wrapper>
      <div id='user'>
        <h1>Hi, {user.name}</h1>
        <p>Please select your choices!</p>
      </div>

      <form className="choice">
        <label htmlFor='year'>Year</label>
        <select
          id='year'
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="" disabled>
            -- Select year --
          </option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>

        <label htmlFor='class'>Class</label>
        <select
          id='class'
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          disabled={!selectedYear}
        >
          <option value="" disabled>
            -- Select class --
          </option>
          <option value="1">I</option>
          <option value="2">II</option>
          <option value="10">10</option>
        </select>

        <label htmlFor='section'>Section</label>
        <select
          id='section'
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          disabled={!selectedClass}
        >
          <option value="" disabled>
            -- Select section --
          </option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>

        <label htmlFor='quarter'>Quarter</label>
        <select
          id='quarter'
          value={selectedQuarter}
          onChange={(e) => setSelectedQuarter(e.target.value)}
          disabled={!selectedSection}
        >
          <option value="" disabled>
            -- Select quarter --
          </option>
          <option value="1">I</option>
          <option value="2">II</option>
          <option value="3">III</option>
          <option value="4">IV</option>
        </select>

        <label htmlFor="subject">Subject</label>
        <select
          id='subject'
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          disabled={!selectedQuarter}
        >
          <option value="" disabled>
            -- Select subject --
          </option>
          <option value="1">English</option>
          <option value="2">Hindi</option>
          <option value="3">Maths</option>
          <option value="4">Computers</option>
        </select>

        <button
          id='submit'
          onClick={(e) => {
            e.preventDefault();
            handleClick();
            setIndex(2);
          }}
          disabled={!selectedSubject}
        >
          Next
        </button>
      </form>
    </Wrapper>
  );
};

export default HomeList;
