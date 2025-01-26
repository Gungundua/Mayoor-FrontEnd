import React, { useState } from 'react';
import Wrapper from './style';
import HomeList from './Homelist';
import ROlist from '../RO_List';
import LOlist from '../LO_List';
import AClist from '../AC_List';
import StudentSelect from '../Students/StudentSelect';

const Home = ({ user }) => {
  const [index, setIndex] = useState(1);
  const [tabs, setTabs] = useState([
    { id: 1, title: 'Home' },
    { id: 2, title: 'Students' },
    { id: 3, title: 'RO' },
    { id: 4, title: 'LO' },
    { id: 5, title: 'AC' }
  ]);
  const [loItems, setLoItems] = useState([
    { id: 1, number: 'LO-1', title: 'Title of LO-1' },
    { id: 2, number: 'LO-2', title: 'Title of LO-2' },
    { id: 3, number: 'LO-3', title: 'Title of LO-3' },
    { id: 4, number: 'LO-4', title: 'Title of LO-4' },
    { id: 5, number: 'LO-5', title: 'Title of LO-5' },
    { id: 6, number: 'LO-6', title: 'Title of LO-6' },
    { id: 7, number: 'LO-7', title: 'Title of LO-7' },
    { id: 8, number: 'LO-8', title: 'Title of LO-8' },
    { id: 9, number: 'LO-9', title: 'Title of LO-9' },
    { id: 10, number: 'LO-10', title: 'Title of LO-10' },
    { id: 11, number: 'LO-11', title: 'Title of LO-11' },
    { id: 12, number: 'LO-12', title: 'Title of LO-12' },
    { id: 13, number: 'LO-13', title: 'Title of LO-13' },
    { id: 14, number: 'LO-14', title: 'Title of LO-14' },
    { id: 15, number: 'LO-15', title: 'Title of LO-15' }
  ]);
  const [acItems, setAcItems] = useState([
    { id: 1, number: 'AC-1', title: 'Title of AC-1' },
    { id: 2, number: 'AC-2', title: 'Title of AC-2' },
    { id: 3, number: 'AC-3', title: 'Title of AC-3' },
    { id: 4, number: 'AC-4', title: 'Title of AC-4' },
    { id: 5, number: 'AC-5', title: 'Title of AC-5' },
    { id: 6, number: 'AC-6', title: 'Title of AC-6' },
    { id: 7, number: 'AC-7', title: 'Title of AC-7' },
    { id: 8, number: 'AC-8', title: 'Title of AC-8' },
    { id: 9, number: 'AC-9', title: 'Title of AC-9' },
    { id: 10, number: 'AC-10', title: 'Title of AC-10' },
    { id: 11, number: 'AC-11', title: 'Title of AC-11' },
    { id: 12, number: 'AC-12', title: 'Title of AC-12' },
    { id: 13, number: 'AC-13', title: 'Title of AC-13' },
    { id: 14, number: 'AC-14', title: 'Title of AC-14' },
    { id: 15, number: 'AC-15', title: 'Title of AC-15' }
  ]);
  const [userData, setUserData] = useState({}); // State to hold user data from HomeList

  // Function passed to HomeList to update user data in the parent component
  const handleUserData = (data) => {
    setUserData(data); // Update user data in the parent state
  };
  
  console.log('user data in home:', userData);
  return (
    <Wrapper>
      <div className="screen">
        {index === 1 ? (
          <HomeList user={user} setIndex={setIndex} setUserData={handleUserData} userdata = {userData} />
        ) : index === 2 ? (
          <StudentSelect />
        ) : index === 3 ? (
          <ROlist loItems={loItems} setLoItems={setLoItems} />
        ) : index === 4 ? (
          <LOlist loItems={loItems} setLoItems={setLoItems} acItems={acItems} setAcItems={setAcItems} />
        ) : (
          <AClist acItems={acItems} setAcItems={setAcItems} />
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
