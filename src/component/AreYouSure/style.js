import styled from "styled-components";

const Wrapper = styled.section`
  /* Full-screen centered layout with a blurred background */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent dark overlay */

  .mainContainer {
    background: white; /* Clean white box */
    padding: 30px;
    border-radius: 12px; /* Rounded corners */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Soft shadow */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    min-width: 300px;
    text-align: center;

  }

  .container1 {
    font-size: 1.8rem;
    font-weight: bold;
    color: #333; /* Darker text */
  }

  .container2 {
    display: flex;
    flex-direction: row;
    gap: 15px;
  }

  .container2 div {
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s ease-in-out;
  }

  /* Yes button */
  .container2 div:first-child {
    background: #dedede; 
    color: #6c6c6c;
    border: none;
  }

  /* No button */
  .container2 div:last-child {
    background: #21c2ba; 
    color: white;
  
`;

export default Wrapper;
