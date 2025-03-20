const styles = `

  .class-header {
    height: 120px;
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
  flex: 1;  
   margin-top: -20px; 
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  overflow: hidden;  /* Ensure content respects border radius */
  background-color: white;

  }


  .info-box {
    width: 85%;
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-radius: 22px; /* Keep a slight curve */
    margin-top: 18px;
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

  width: 100%;
  padding: 6px 0px;
  border: 2px solid rgb(33, 194, 186,0.7);
  border-radius: 8px;
  background-color: rgba(117, 210, 234, 0.2);
  color: #444;
  font-size: 14px;
  transition: background-color 1.0s ease-in-out, border-color 0.5s ease-in-out;
  box-sizing: border-box;
  text-align:center;
  appearance: none;
  cursor: pointer !important;
   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); 
}

/* Prevents white background & black border when selected */
.chart-dropdown:focus,
.chart-dropdown:active,
.chart-dropdown:focus-visible {
  background-color: rgba(117, 210, 234, 0.2) !important; 
  color: #444 !important; /* Ensures text color stays */
  outline: none;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.19); /* Optional shadow */
}

.chart-selection {
  margin: 20px 0;
}

.custom-dropdown {
  position: relative;
  width: 150px;
}

.chart-dropdown option {
  background-color: white; /* Keeps dropdown options readable */
  color: black;
}

.percentage p {
  font-size: 11px;
  margin-top: 5px;
}

.chart-wrapper {
  width: 100%; 
overflow-x: auto; /* Enable horizontal scrolling */
overflow-y: hidden; /* Prevent vertical overflow */
padding-bottom: 10px;
}


.chart-container {
  width: 100%; 
  height: 250px;
  // margin: 10px;

}


  .header-image {
    width: 24px;
    height: 24px;
  }
  .header-image-menu {
    width: 34px;
    height: 34px;
  }

  
`

const styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = styles
document.head.appendChild(styleSheet)

export default styles

