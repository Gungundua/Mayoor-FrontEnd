
import styled from "styled-components";  

const Wrapper = styled.div`   
  margin:0;  
  padding: 0;  
  background-color:#fff;  
  display: flex;  
  justify-content: space-between;  
   min-height: 70vh;  
  .AppContainer {  
    background-color:  #21C3BC;  
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);   
    display: flex;  
    flex-direction: column;  
    align-items: stretch;  
    width: 100vw;   
    height: 70vh;  
    margin: 0 auto;  
  }  
   
  
  @media (min-width: 768px) {  
    .Header {  
      padding: 15px 20px;  
      font-size: 1.4rem;  
    }  
  }  
   .acHeader {  
    background-color: #21C3BC;
    color: white;
    text-align: center;
    padding: 30px;
    padding-left :0;
    font-size: 16px;
    font-weight: bold;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index:100;
    position: relative;
  }  
   
   
  .NavButton {  
    background: none;  
    border: none;  
    font-size: 1.5rem;  
    color: white;  
    cursor: pointer;  
  }  
  @media (min-width: 768px) {  
    .NavButton {  
      font-size: 1.8rem;  
    }  
  }  
    .initials {
    display: flex;
    justify-content: center; /* Horizontally center */
    align-items: center; /* Vertically center */
    height: 65px;
    width: 65px;
    font-size: 18px; /* Adjust size if needed */
    font-weight: bold;
    text-transform: uppercase;
    color: #fff;
    background-color: #135d5d;
    border-radius: 50%;
    margin-right: 30px;
}
    .container{
    position:relative;
    top: 15px;
    background-color:white;
    border-top-left-radius: 30px;  
    border-top-right-radius: 30px;
    height:100vh;
    width:100vw;

    }
  .ContentContainer {  
    padding: 15px;  
    display: flex;  
    flex-direction: column;  
    gap: 10px;  
    overflow-y: auto;  
    flex: 1;  
    width: 100%;  
    box-sizing: border-box;  
  }  
  @media (min-width: 768px) {  
    .ContentContainer {  
      padding: 20px;  
    }  
  }  
  .ProfileCard {  
    background-color: #f9f9f9;  
    padding: 15px;  
    border-radius: 20px;  
    display: flex;  
    align-items: center;  
    gap: 15px;  
    flex-wrap: wrap; 
      border: 1px solid #e0d8cc; 
    background: linear-gradient(white, white) padding-box, 
                linear-gradient(120deg, #f7f3e9, #fffdf5) border-box; /* Softer gradient */
    color: #444;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); 
  }  
  @media (min-width: 768px) {  
    .ProfileCard {  
      padding: 20px;  
      border-radius: 12px;  
      gap: 20px;  
    }  
  }  
  // .ProfilePic {  
  //   width: 60px;  
  //   height: 60px;  
  //   border-radius: 50%;  
  //   object-fit: cover;  
  // }  
  // @media (min-width: 768px) {  
  //   .ProfilePic {  
  //     width: 80px;  
  //     height: 80px;  
  //   }  
  // }  
  .ProfileInfo {  
    flex-grow: 1;  
    display: flex;  
    flex-direction: column;  
    gap: 5px; 
     
  }  
  .ProfileRow {  
    display: flex;  
    gap: 10px;  
    font-size: 0.9rem;  
    flex-wrap: wrap;  
  }  
  @media (min-width: 768px) {  
    .ProfileRow {  
      font-size: 1rem;  
    }  
  }  
  .Label {  
    font-weight: bold;  
  }  
  .Value {  
    flex-grow: 1;  
  }  
  
  
  .TableContainer {  
    overflow-x: auto; 
    width:100%; 
    
  }  
  .ScoresTable {  
    width: 100%;  
    border-collapse: collapse;  
    margin-top: 10px;  
    border: 1px solid #ddd;  
    border-radius: 8px;  
  }  
  @media (min-width: 768px) {  
    .ScoresTable {  
      border-radius: 12px;  
    }  
  }  
  .TableHeaderCell {  
    border: 1px solid #ddd;  
    padding: 8px;  
    text-align: center;  
    font-size: 0.9rem;  
    background-color: #f0f0f0;  
    font-weight: bold;  
  }  
  @media (min-width: 768px) {  
    .TableHeaderCell {  
      padding: 10px;  
      font-size: 1rem;  
    }  
  }  
  .TableDataCell {  
    border: 1px solid #ddd;  
    padding: 8px;  
    text-align: center;  
    font-size: 0.9rem;  
  }  
  @media (min-width: 768px) {  
    .TableDataCell {  
      padding: 10px;  
      font-size: 1rem;  
    }  
  }  
`;  

export default Wrapper;