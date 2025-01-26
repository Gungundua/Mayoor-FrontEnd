import styled from "styled-components";

const Wrapper = styled.div`
width : 100%;
height: 75vh;
display: flex;
flex-direction: column;
overflow: hidden;

.search-container {
  display: flex;
  align-items: center;
  width: 100vw;
  margin-bottom: 20px;
  padding: 10px 0;
  width: 100%;
}

.search-bar {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 25px;
  border: 1px solid #00D09E;
  margin-right: 10px;
}

.back-button {
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #000000;
  margin-right: 15px;
}

.profile-section {
  text-align: center;
  width: 100%;
  background-color: #00D09E;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  
}

.image-container {
  margin: 20px;
}

.profile-image {
  width: 100px; 
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #ffffff;
}

.name {     
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 0px;
}

.roll-number {
  font-size: 16px;
  margin-top: 0px;
}

.ac-container {
  display: flex;
  overflow-x: auto;
  width: 100%;
  max-width: 100%;
  padding: 20px 0;
  gap: 20px;
  scroll-snap-type: x mandatory;
}

.ac-box {
  flex: 0 0 30%;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  scroll-snap-align: start;
}

.ac-box h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}

.marks-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 1;
  box-sizing: border-box;
}

.ac-container::-webkit-scrollbar {
  display: none;
}

`
export default Wrapper;