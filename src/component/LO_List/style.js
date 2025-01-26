import styled from "styled-components";

const Wrapper = styled.section`
    font-family: Arial, sans-serif;
    width: 100%;
    height: 90vh; /* Fix the height to the viewport size */
    display: flex;
    flex-direction: column;
    overflow: hidden; /* Prevent overflowing of the container */
    background-color: #21c3bc;

  
    .lo-list-title {
    text-align: center;
    color: white;
    margin-bottom: 10px;
    padding: 15px;
    height: 50px;
  }

  .lo-list {
    list-style: none;
    flex: 1; /* Allow the list to grow and take up available space */
    overflow-y: auto; /* Enable vertical scrolling */
    scrollbar-width: thin; /* For Firefox: thinner scrollbar */
    scrollbar-color: #ccc transparent;
    border-top-left-radius:30px;
    border-top-right-radius: 30px;
    background-color: #fff;
    padding: 10px;
  }

  .lo-list::-webkit-scrollbar {
    width: 8px; /* Width of the scrollbar for WebKit browsers */
  }

  .lo-list::-webkit-scrollbar-thumb {
    background-color: #ccc; /* Color of the scrollbar thumb */
    border-radius: 4px;
  }

  .lo-list-item {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 10px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 10px;
  }

  .lo-header {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .lo-info {
    flex: 1;
  }

  .lo-dropdown-icon {
    font-size: 18px;
    color: #00796b;
  }

  .lo-dropdown-content {
    padding: 10px;
    background: #e0f2f1;
    color: #004d40;
  }
  .add{
    background-color: #21c3bc;
    opacity: 0.7;
    font-weight: bold;
    width: 40px;
    height: 40px;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
    display: flex; /* Use flexbox for alignment */
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    text-align: center;
    position: fixed; /* Fixed positioning */
    bottom: 90px; /* Distance from the bottom */
    right: 40px; /* Distance from the right */
    z-index: 1000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2), /* Slight shadow below */
              0 -4px 6px rgba(0, 0, 0, 0.1), /* Slight shadow above */
              4px 0 6px rgba(0, 0, 0, 0.1), /* Slight shadow on the right */
              -4px 0 6px rgba(0, 0, 0, 0.1);
  }
  /* Delete button styling */
.delete{
  height: 25px;
  margin-right: 5px;
}
.edit{
  height: 25px;
  margin-right: 5px;
  color: green;
}
.list-icon{
  height: 20px;
  background-color: #21c3bc;
}
.list-icon-container{
  background-color: #21c3bc;
  margin-right: 10px;
  border-radius: 5px;
  padding: 2px;
}
.item-title{
  font-weight: bold;
}
`

export default Wrapper;
