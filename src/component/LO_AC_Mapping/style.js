import styled from "styled-components";

const Wrapper = styled.section`
/* Container for the RO list */
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .ac-list-container {
    width: 100%;
    /* max-width: 400px; */
    margin: auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow-y: scroll;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 80vh;
    overflow-y: auto; /* Add vertical scroll bar when content exceeds height */
    overflow-x: hidden; /* Prevent horizontal scrolling */
    scrollbar-width: thin; /* For Firefox - thin scrollbar */
    scrollbar-color: #ccc transparent; 
  }
  
  /* Header section of the RO list */
  .ac-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    padding: 16px;
    cursor: pointer;
  }
  
  /* LO list container */
  .ac-list {
    background-color: white;
    padding: 16px;
  }
  
  /* Individual LO item */
  .ac-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  
  /* Priority buttons container */
  .priority-buttons {
    display: flex;
    gap: 4px;
  }
  
  /* Priority button styles */
  .priority-button {
    padding: 6px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .priority-button.h {
    background-color: green;
    color: white;
  }
  
  .priority-button.m {
    background-color: yellow;
    color: black;
  }
  
  .priority-button.l {
    background-color: red;
    color: white;
  }
  
  /* Unselected state for priority buttons */
  .priority-button:not(.h):not(.m):not(.l) {
    background-color: white;
    color: black;
  }
  .ac-list-container {
    margin-bottom: 50px; 
  }
  .btns{
    margin : auto;
  }
  .btn{
    
    width: 100px;
    padding: 10px;
    background-color: rgb(235, 56, 56);
    color: white;
    border-color: white;
    border-radius: 20px;
    border: none;
    font-weight: bold;
  }
  .addBtn{
    margin-right: 20px;
    width: 100px;
    padding: 10px;
    background-color: rgb(100, 156, 75);
    color: white;
    border-color: white;
    border-radius: 20px;
    border: none;
    font-weight: bold;
  }
  
`
export default Wrapper