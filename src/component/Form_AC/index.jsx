import React from 'react';
import Wrapper from './style';

const Form_AC = ({ closeForm }) => {
  return (
    <Wrapper>
      <div className="form-container">
        <p>Enter the AC you want to add :</p>
        <input type="text" placeholder="AC Input" className="input" />
        <input type="text" placeholder="Maximum Marks" className="input" />
        <div className="buttons">
          <input type="button" value="Save" className="savebtn" />
          <input type="button" value="Close" className="closebtn" onClick={closeForm} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Form_AC;
