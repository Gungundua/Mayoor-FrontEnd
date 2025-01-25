import React, {useState} from 'react'
import Wrapper from './style'
import LOMapping from '../RO_LO_Mapping';
import List from '../images/list.png'

const ROlist = ({loItems, setLoItems}) => {
    const [activeIndex, setActiveIndex] = useState(null);

  const toggleDropdown = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  }
  const roItems = [
    { id: 1, number : "RO-1", title : "Title of RO-1" },
    { id: 2, number : "RO-2", title : "Title of RO-2" },
    { id: 3, number : "RO-3", title : "Title of RO-3" },
    { id: 4, number : "RO-4", title : "Title of RO-4" },
    { id: 5, number : "RO-5", title : "Title of RO-5" },
    { id: 6, number : "RO-6", title : "Title of RO-6" },
    { id: 7, number : "RO-7", title : "Title of RO-7" },
    { id: 8, number : "RO-8", title : "Title of RO-8" },
    { id: 1, number : "RO-1", title : "Title of RO-1" },
    { id: 2, number : "RO-2", title : "Title of RO-2" },
    { id: 3, number : "RO-3", title : "Title of RO-3" },
    { id: 4, number : "RO-4", title : "Title of RO-4" },
    { id: 5, number : "RO-5", title : "Title of RO-5" },
    { id: 6, number : "RO-6", title : "Title of RO-6" },
    { id: 7, number : "RO-7", title : "Title of RO-7" },
    { id: 8, number : "RO-8", title : "Title of RO-8" },
  ]
  return (
    <Wrapper>
      <h2 className="ro-list-title">RO List</h2>
      <ul className="ro-list">
        {roItems.map((item, index) => (
          <li key={item.id} className="ro-list-item">
            <div className="ro-header" onClick={() => toggleDropdown(index)}>
              <div className="list-icon-container">
                <img src={List} alt="" className="list-icon"/>
              </div>
              <div className="ro-info">
              <p className="item-no">{item.number}</p>
              <p className="item-title">{item.title}</p>
              </div>
              <div className="ro-dropdown-icon">
                {activeIndex === index ? "▲" : "▼"}
              </div>
            </div>
            {activeIndex === index && (
              <div className="ro-dropdown-content">
                <LOMapping loItems={loItems} setLoItems={setLoItems}/>
              </div>
            )}
          </li>
        ))}
      </ul>
    </Wrapper>
  )
}

export default ROlist
