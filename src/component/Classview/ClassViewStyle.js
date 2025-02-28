const styles = `

  .class-header {
    height: 110px;
    align-items: center;
    color: white;
    background-color: #21c2ba;
    display: flex;
    flex-direction: row;
    gap: 60px
  }

  .icon{
  width: 30px;
  margin-left: 20px
  }
  .class-container{
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  flex: 1;  
   margin-top: -20px; 
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  overflow: hidden;  /* Ensure content respects border radius */
  background-color: white;

  }

  // .info-box {
  //   width: 80%;
  //   display: flex;
  //   justify-content: space-between;
  //   padding: 15px;
  //   border-radius: 10px;
  //   margin-top: 10px;
  //   border: 1px solid #3b82f6;
  //   color: black;
  //   font-size: 14px;
  //   line-height: 1.5;
  //   text-align: right;
  //   align-items: center;
  // }
  .info-box {
    width: 85%;
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-radius: 22px; /* Keep a slight curve */
    margin-top: 10px;
    border: 1px solid #E0D8CC; /* Soft cream border */
    background: linear-gradient(white, white) padding-box,
                linear-gradient(120deg, #F7F3E9, #FFFDF5) border-box; /* Softer gradient */
    color: #444;
    font-size: 14px;
    line-height: 1.5;
    text-align: right;
    /* Add shadow for better visibility */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}
  .info-text {
    width: 100%;
    text-align: left;
  }
  .chart-dropdown {
    background-color: rgb(32,178,170,0.7);
    color: white;
    padding: 10px 7px 10px 7px ;
    border: none;
    border-radius: 5px;
    margin-top: 20px;
    // cursor: pointer;
    overflow: hidden ;
  }
  /* Percentage Circles */
 .percentage-container {
  border-radius: 15px;
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
  flex-wrap: wrap; /* Allow wrapping for responsiveness */
}

.percentage {
  text-align: center;
  width: 90px; /* Adjust width as needed */
  flex: 1 1 100px; /* Allow flexibility in size */
  max-width: 120px; /* Set a maximum width */
}

.percentage p {
  font-size: 11px;
  margin-top: 5px;
}
  // .info-text {
  //   width: 100%;
  //   text-align: left;
  // }

  // .chart-dropdown {
  //   background-color: #75D2EA;
  //   color: white;
  //   padding: 10px;
  //   border: none;
  //   border-radius: 5px;
  //   margin-top: 10px;
  //   cursor: pointer;
  // }

  .chart-wrapper {
    width: 90%;
    overflow-x: auto;
    margin-top: 50px;
  }

  .chart-container {
    width: 150%;
    height: 250px;
    margin-top: 10px;
  }

  .header-image {
    width: 24px;
    height: 24px;
  }
  .header-image-menu {
    width: 34px;
    height: 34px;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default styles