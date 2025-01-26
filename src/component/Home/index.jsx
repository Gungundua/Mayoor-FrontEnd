import React, { useState } from 'react'
import Wrapper from './style'
import HomeList from './Homelist'
import RO_LO_Mapping from '../RO_LO_Mapping'
import ACList from '../LO_AC_Mapping'
import LOList from '../RO_LO_Mapping'

const Home = ({user}) => {

    const [index, setIndex] = useState(1)
    const [tabs, setTabs] = useState([{
        id : 1,
        title : "Home"
    },{
        id : 2,
        title : "Students"
    },{
        id : 3,
        title : "RO"
    },{
        id : 4,
        title : "LO"
    },{
        id : 5,
        title : "AC" 
    }])

  return (
    <Wrapper>
        <div className="screen">
            {
                index === 1
                ? <HomeList user={user} setIndex={setIndex} />
                : (index === 2
                    ? "Students List"
                    : (index === 3
                        ? <LOList/>
                        : (index === 4
                            ?<ACList/>
                            : "AC Lists"
                    )
                )
            )}
        </div>
        <div className="bottom">
            {
                tabs.map(tab => <input className={index === tab.id ? 'active' : ''} type="button" value={tab.title} onClick={e => setIndex(tab.id)} />)
            }
        </div>
    </Wrapper>
  )
}

export default Home
