import React, { useState } from "react";
import Wrapper from "./style";
import Delete from '../images/delete2.png'
import Edit from '../images/edit2.png'
import ACMapping from "../LO_AC_Mapping";
import List from '../images/list.png'

const LOlist = ({loItems, setLoItems, acItems, setAcItems}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleDropdown = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const deleteItem = (id, event) => {
    event.stopPropagation(); // Prevents event propagation to the parent
    setLoItems(loItems.filter((item) => item.id !== id));
  };

  return (
    <Wrapper>
      <h2 className="lo-list-title">LO List</h2>
      <ul className="lo-list">
        {loItems.map((item, index) => (
          <li key={item.id} className="lo-list-item">
            <div className="lo-header" onClick={() => toggleDropdown(index)}>
              <div className="list-icon-container">
                <img src={List} alt="" className="list-icon"/>
              </div>
              <div className="lo-info">
              <p className="item-no">{item.number}</p>
              <p className="item-title">{item.title}</p>
              </div>
              <img src={Edit} alt="edit" className="edit" />
              <img src={Delete} alt="delete" className="delete" onClick={(event) => deleteItem(item.id, event)}/>
              <div className="lo-dropdown-icon">
                {activeIndex === index ? "▲" : "▼"}
              </div>
            </div>
            {activeIndex === index && (
              <div className="lo-dropdown-content">
                <ACMapping acItems={acItems} setAcItems={setAcItems}/>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="add">+</div>
    </Wrapper>
  );
};

export default LOlist;
