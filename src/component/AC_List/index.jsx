import React, { useState } from "react";
import Wrapper from "./style";
import Delete from '../images/delete2.png'
import Edit from '../images/edit2.png'
import List from '../images/list.png'

const AClist = ({acItems, setAcItems}) => {
  const [activeIndex, setActiveIndex] = useState(null);
 
  const deleteItem = (id, event) => {
    event.stopPropagation(); // Prevents event propagation to the parent
    setAcItems(acItems.filter((item) => item.id !== id));
  };

  return (
    <Wrapper>
      <h2 className="ac-list-title">AC List</h2>
      <ul className="ac-list">
        {acItems.map((item, index) => (
          <li key={item.id} className="ac-list-item">
            <div className="ac-header" >
              <div className="list-icon-container">
                <img src={List} alt="" className="list-icon"/>
              </div>
              <div className="ac-info">
                <p className="item-no">{item.number}</p>
                <p className="item-title">{item.title}</p>
              </div>
              <img src={Edit} alt="edit" className="edit" />
              <img src={Delete} alt="delete" className="delete" onClick={(event) => deleteItem(item.id, event)}/>
            </div>
          </li>
        ))}
      </ul>
      <div className="add">+</div>
    </Wrapper>
  );
};

export default AClist;
