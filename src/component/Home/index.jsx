import React, { useState } from 'react';
import Wrapper from './style';
import HomeList from './Homelist';
import ROlist from '../RO_List';
import LOlist from '../LO_List';
import AClist from '../AC_List';
import stuIcon from '../assets/Graduate.png';
import homeIcon from '../assets/Smart Home.png';
import listIcon from '../assets/Audit.png';
import StudentList from '../Students/StudentSelect';

const Home = ({ user }) => {
  const [index, setIndex] = useState(1);
  const [tabs, setTabs] = useState([
    { id: 1, title: 'Home', icon: homeIcon },
    { id: 2, title: 'Students', icon: stuIcon },
    { id: 5, title: 'AC', icon: listIcon },
    { id: 4, title: 'LO', icon: listIcon },
    { id: 3, title: 'RO', icon: listIcon },
  ]);
  const [loItems, setLoItems] = useState([]);
  const [acItems, setAcItems] = useState([]);
  const [userData, setUserData] = useState({});
  const [studentsData, setStudentsData] = useState([]); // New state to store students data

  // Function passed to HomeList to update user data in the parent component
  const handleUserData = (data) => {
    setUserData(data);
  };

  // Function passed to LOlist to update loItems in the parent component
  const handleLoItems = (data) => {
    setLoItems(data);
  };

  const handleAcItems = (data) => {
    setAcItems(data);
  };

  // New function to handle the students data
  const handleStudentsData = (data) => {
    setStudentsData(data); // Update students data in the parent state
  };

  return (
    <Wrapper>
      <div className="screen">
        {index === 1 ? (
          <HomeList user={user} setIndex={setIndex} setUserData={handleUserData} userdata={userData} />
        ) : index === 2 ? (
          <StudentList userData={userData} onStudentsData={handleStudentsData} />
        ) : index === 3 ? (
          <ROlist loItems={loItems} setLoItems={setLoItems} userData={userData} />
        ) : index === 4 ? (
          <LOlist loItems={loItems} handleLoItems={handleLoItems} acItems={acItems} setAcItems={setAcItems} userData={userData} />
        ) : (
          <AClist acItems={acItems} setAcItems={setAcItems} userData={userData} handleAcItems={handleAcItems} studentsData={studentsData}/>
        )}
      </div>
      {index !== 1 && (
        <div className="bottom">
          {tabs.map((tab) => (
            <input
              key={tab.id}
              className={index === tab.id ? 'active' : ''}
              type="button"
              value={tab.title}
              onClick={() => setIndex(tab.id)}
            />
          ))}
        </div>
      )}
    </Wrapper>
  );
};

export default Home;
