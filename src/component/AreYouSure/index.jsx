import React from 'react'
import Wrapper from './style';

function AreYouSure() {
  return (
    <Wrapper>
    <div className='mainContainer'>
    <div className='container1'>
        Are you sure?
    </div>
    <div className='container2'>
        <div>
            No
        </div>
        <div>
            Yes
        </div>
    </div>
    </div>
    </Wrapper>
  )
}

export default AreYouSure;