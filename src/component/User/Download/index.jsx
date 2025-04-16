import React, { useState } from 'react';
import Wrapper from './style'
import { LuDownload } from "react-icons/lu";

const checklistItems = [
  { id: 1, name: 'Assessment Criteria' },
  { id: 2, name: 'Learning Outcome' },
  { id: 3, name: 'Reported Outcome' },
  { id: 4, name: 'Term-1' },
  { id: 5, name: 'Term-2' }
];

const DownloadChecklist = ({index}) => {
  const [showChecklist, setShowChecklist] = useState(false);
  // const [selectedItems, setSelectedItems] = useState([]);

  const toggleChecklist = () => setShowChecklist(!showChecklist);

  // const handleCheckboxChange = (id) => {
  //   setSelectedItems((prev) =>
  //     prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
  //   );
  // };

  // const handleDownload = () => {
  //   if (selectedItems.length === 0) {
  //     alert('Please select at least one file to download.');
  //     return;
  //   }

  //   const selectedNames = checklistItems
  //     .filter((item) => selectedItems.includes(item.id))
  //     .map((item) => item.name)
  //     .join(', ');

  //   alert(`You selected: ${selectedNames}`);
  //   setShowChecklist(false);
  // };

  return (
    <Wrapper>
      <div className="download-container">
        <LuDownload onClick={toggleChecklist} size={30}/>

      {showChecklist && (
        <div className="checklist-popup">
          {checklistItems.map((item) => (
            <label key={item.id}>
              <input
                type="checkbox"
              />
              {' '}{item.name}
            </label>
          ))}
          <button className="download-submit-btn" >
            Download
          </button>
        </div>
      )}
    </div>
    </Wrapper>
  );
};

export default DownloadChecklist;
