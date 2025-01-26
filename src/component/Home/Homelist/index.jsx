import React, { useState } from 'react';
import Wrapper from './style';

const HomeList = ({ user, setIndex }) => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedQuarter, setSelectedQuarter] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedClass('');
    setSelectedSection('');
    setSelectedQuarter('');
    setSelectedSubject('');
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setSelectedSection('');
    setSelectedQuarter('');
    setSelectedSubject('');
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
    setSelectedQuarter('');
    setSelectedSubject('');
  };

  const handleQuarterChange = (e) => {
    setSelectedQuarter(e.target.value);
    setSelectedSubject('');
  };

  return (
    <Wrapper>
      <div id='user'>
        <h1>Hi, {user.name}</h1>
        <p>Please select your choices!</p>
      </div>

      <form className="choice">
      <label for='year'>Year</label>
        <select id='year'
          value={selectedYear}
          onChange={handleYearChange}
        >
          <option value="" disabled selected={!selectedYear}>
            -- Select year --
          </option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>

        <label for='class'>Class</label>
        <select id='class'
          value={selectedClass}
          onChange={handleClassChange}
          disabled={!selectedYear}
        >
          <option value="" disabled selected={!selectedClass}>
            -- Select class --
          </option>
          <option value="1">I</option>
          <option value="2">II</option>
          <option value="3">III</option>
        </select>

        <label for='section'>Section</label>
        <select id='section'
          value={selectedSection}
          onChange={handleSectionChange}
          disabled={!selectedClass}
        >
          <option value="" disabled selected={!selectedSection}>
            -- Select section --
          </option>
          <option value="1">A</option>
          <option value="2">B</option>
          <option value="3">C</option>
        </select>

        <label for='quarter'>Quarter</label>
        <select id='quarter'
          value={selectedQuarter}
          onChange={handleQuarterChange}
          disabled={!selectedSection}
        >
          <option value="" disabled selected={!selectedQuarter}>
            -- Select quarter --
          </option>
          <option value="1">I</option>
          <option value="2">II</option>
          <option value="3">III</option>
          <option value="4">IV</option>
        </select>

        <label for="subject">Subject</label>
        <select id='subject'
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          disabled={!selectedQuarter}
        >
          <option value="" disabled selected={!selectedSubject}>
            -- Select subject --
          </option>
          <option value="1">English</option>
          <option value="2">Hindi</option>
          <option value="3">Maths</option>
          <option value="4">Computers</option>
        </select>

        <input
          type="submit"
          value="Next" id='submit'
          onClick={(e) => {
            e.preventDefault();
            setIndex(2);
          }}
          disabled={!selectedSubject}
        />
      </form>
    </Wrapper>
  );
};

export default HomeList;
