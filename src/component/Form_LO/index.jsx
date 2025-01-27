import React from 'react'
import Wrapper from './style';

const Form_LO = ({ closeForm }) => {
  return (
    <Wrapper>
    <div className="form-container">
      <p>Enter the LO you want to add :</p>
      <input type="text" placeholder='LO Input' className='input'/>
      <div className='buttons'>
      <input type="button" value="Save" className="savebtn" />
      <input type="button" value="Close" className="closebtn" onClick={closeForm} />
      </div>
    </div>
    </Wrapper>
  );
};

export default Form_LO;