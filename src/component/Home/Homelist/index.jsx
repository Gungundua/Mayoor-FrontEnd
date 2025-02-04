import React, { useState, useEffect } from 'react';
import Wrapper from './style';
import notification from "./bell.png";
import student from './user.png';
import menu from "./menu.png";


const HomeList = ({ user, setIndex, msg }) => {
  console.log(user)
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const clearSessionStorageOnRefresh = () => {
      sessionStorage.clear();
    };
    window.addEventListener("beforeunload", clearSessionStorageOnRefresh);
    return () => {
      window.removeEventListener("beforeunload", clearSessionStorageOnRefresh);
    };
  }, []);

  const [selectedYear, setSelectedYear] = useState(sessionStorage.getItem("year") || 2024);
  const [selectedClass, setSelectedClass] = useState(sessionStorage.getItem("class") || 1);
  const [selectedSection, setSelectedSection] = useState(sessionStorage.getItem("section") || 'Orchid');
  const [selectedQuarter, setSelectedQuarter] = useState(sessionStorage.getItem("quarter") || '1');
  const [selectedSubject, setSelectedSubject] = useState(sessionStorage.getItem("subject") || '1');

  const updateSessionStorage = (key, value, setter) => {
    sessionStorage.setItem(key, value);
    setter(value);
  };

  const handleClick = () => {
    setIndex(2)
    const updatedUserdata = {
      year: parseInt(selectedYear, 10),
      class: parseInt(selectedClass, 10),
      section: selectedSection,
      quarter: parseInt(selectedQuarter, 10),
      subject: parseInt(selectedSubject, 10),
    };
    sessionStorage.setItem("userData", JSON.stringify(updatedUserdata));
    setUserData(updatedUserdata);

  }

  const toggle = e => {
    e.target.nextSibling.style.display = e.target.nextSibling.style.display === 'flex' ? 'none' : 'flex'
  }

  return (
    <Wrapper>
      <div id="user">
        <div id="detail">
          <p id="hi">Hi ,</p>
          <h1 id="name">{user.name}</h1>
        </div>
        <div id="image">
          <img id="notification" src={notification} alt="Notification" />
          <img id="profile" src={student} alt="User" />
          <img id="menu" src={menu} alt="Menu" />
        </div>
      </div>
      <form className="choice">
        <label htmlFor="year" onClick={toggle}>Year ({selectedYear})</label>

        <div className="options">
          <div tabIndex={0} className={selectedYear === 2025 ? "option active" : "option"} onClick={e => setSelectedYear(2025)}>2025</div>
          <div tabIndex={0} className={selectedYear === 2024 ? "option active" : "option"} onClick={e => setSelectedYear(2024)}>2024</div>
        </div>

        <label htmlFor="class" onClick={toggle}>Class ({selectedClass})</label>
        <div className="options">
          <div tabIndex={0} className={`option ${selectedClass === 1 ? 'active' : ''}`} onClick={e => setSelectedClass(1)}>1</div>
          <div tabIndex={0} className={`option ${selectedClass === 2 ? 'active' : ''}`} onClick={e => setSelectedClass(2)}>2</div>
          <div tabIndex={0} className={`option ${selectedClass === 3 ? 'active' : ''}`} onClick={e => setSelectedClass(3)}>3</div>
          <div tabIndex={0} className={`option ${selectedClass === 4 ? 'active' : ''}`} onClick={e => setSelectedClass(4)}>4</div>
          <div tabIndex={0} className={`option ${selectedClass === 5 ? 'active' : ''}`} onClick={e => setSelectedClass(5)}>5</div>
          <div tabIndex={0} className={`option ${selectedClass === 6 ? 'active' : ''}`} onClick={e => setSelectedClass(6)}>6</div>
          <div tabIndex={0} className={`option ${selectedClass === 7 ? 'active' : ''}`} onClick={e => setSelectedClass(7)}>7</div>
          <div tabIndex={0} className={`option ${selectedClass === 8 ? 'active' : ''}`} onClick={e => setSelectedClass(8)}>8</div>
        </div>
        
        <label htmlFor="section" onClick={toggle}>Section ({selectedSection})</label>
        <div className="options">
          <div tabIndex={0} className={selectedSection === "Orchid" ? "option active" : "option"} onClick={e => setSelectedSection("Orchid")}>Orchid</div>
          <div tabIndex={0} className={selectedSection === "Tulip" ? "option active" : "option"} onClick={e => setSelectedSection("Tulip")}>Tulip</div>
          <div tabIndex={0} className={selectedSection === "Daffodil" ? "option active" : "option"} onClick={e => setSelectedSection("Daffodil")}>Daffodil</div>
        </div>
        
        <label htmlFor="quarter" onClick={toggle}>Quarter ({selectedQuarter})</label>
        <div className="options">
          <div tabIndex={0} className={selectedQuarter === "1" ? "option active" : "option"} onClick={e => setSelectedQuarter("1")}>I</div>
          <div tabIndex={0} className={selectedQuarter === "2" ? "option active" : "option"} onClick={e => setSelectedQuarter("2")}>II</div>
          <div tabIndex={0} className={selectedQuarter === "3" ? "option active" : "option"} onClick={e => setSelectedQuarter("3")}>III</div>
          <div tabIndex={0} className={selectedQuarter === "4" ? "option active" : "option"} onClick={e => setSelectedQuarter("4")}>IV</div>
        </div>
        <label htmlFor="subject" onClick={toggle}>Subject ({selectedSubject})</label>
        <div className="options subjects">
          <div tabIndex={0} className={`option ${selectedClass === 1 ? 'active' : ''}`} onClick={e => setSelectedClass(1)}>English</div>
          <div tabIndex={0} className={`option ${selectedClass === 2 ? 'active' : ''}`} onClick={e => setSelectedClass(2)}>Hindi</div>
          <div tabIndex={0} className={`option ${selectedClass === 3 ? 'active' : ''}`} onClick={e => setSelectedClass(3)}>Mathematics</div>
          <div tabIndex={0} className={`option ${selectedClass === 4 ? 'active' : ''}`} onClick={e => setSelectedClass(4)}>Science</div>
          <div tabIndex={0} className={`option ${selectedClass === 5 ? 'active' : ''}`} onClick={e => setSelectedClass(5)}>Computer Sc.</div>
          <div tabIndex={0} className={`option ${selectedClass === 6 ? 'active' : ''}`} onClick={e => setSelectedClass(6)}>Social Studies</div>
          <div tabIndex={0} className={`option ${selectedClass === 7 ? 'active' : ''}`} onClick={e => setSelectedClass(7)}>III Language</div>
          <div tabIndex={0} className={`option ${selectedClass === 8 ? 'active' : ''}`} onClick={e => setSelectedClass(8)}>GP Values</div>
          <div tabIndex={0} className={`option ${selectedClass === 9 ? 'active' : ''}`} onClick={e => setSelectedClass(9)}>Music</div>
          <div tabIndex={0} className={`option ${selectedClass === 10 ? 'active' : ''}`} onClick={e => setSelectedClass(10)}>Dance/Dramatics</div>
          <div tabIndex={0} className={`option ${selectedClass === 11 ? 'active' : ''}`} onClick={e => setSelectedClass(11)}>Art</div>
          <div tabIndex={0} className={`option ${selectedClass === 12 ? 'active' : ''}`} onClick={e => setSelectedClass(12)}>Sports</div>
          <div tabIndex={0} className={`option ${selectedClass === 13 ? 'active' : ''}`} onClick={e => setSelectedClass(13)}>Discipline</div>
          <div tabIndex={0} className={`option ${selectedClass === 14 ? 'active' : ''}`} onClick={e => setSelectedClass(14)}>Attendance</div>
        </div>
        <button
          className="get-started"
          onClick={(e) => {
            e.preventDefault();
            handleClick();
          }}
          disabled={!selectedSubject}
        >
          Get Started
        </button>
      </form>
    </Wrapper>
  );
};

export default HomeList;
