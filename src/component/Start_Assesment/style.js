import styled from "styled-components";
const Wrapper = styled.div`
width : 100%;
height: 75vh;
display: flex;
flex-direction: column;
overflow: hidden;
.search-container {
  display: flex;
  flex-drection: row;
  align-items: center;
  width: 100vw;
  margin-bottom: 20px;
  padding: 10px 0;
  width: 100%;
}
.search-bar {
  width: 190px;
  padding: 7px;
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
  margin-left: 3px;
}
.notificationIcon{
   height: 25px;
   width: 25x;
   margin:6px 5px 0px 12px;
}
.profileIcon{
height: 25px;
   width: 25x;
   margin:6px 3px 0px 1px;
}
.profile-section {
  text-align: center;
  width: 100%;
  height: 180px;
  background-color: #21C3BC;
  box-shadow: 0px 4px 6px rgba(244, 240, 240, 0.1);
  align-items: center;
  overflow: hidden;
}
.image-container {
  margin: 20px;
}
.profile-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #FFFFFF;
}
.name {
font-family: Sans-sarif;
  font-size: 25px;
  margin-top: 40px;
  color: black;
}
.title{
  font-size: 14px;
  color: white
}
.roll-number {
  font-size: 11px;
}
.done-button {
  background-color:rgb(53, 114, 130);
  color: white;
  font-size: 17px;
  font-weight: bold;
  text-align:center;
  padding: 10px 20px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  margin: auto;
  width:150px;
}
.ac-container {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  width: 100%;
  height: 145px;
  max-width: 100%;
  padding: 20px 10px;
  gap: 20px;
  border-top-left-radius: 30px;
  border-top-right-radius: 57px;
  background-color: white;
  margin-top: -20px;
}
.ac-box {
  flex: 0 0 30%;
  background-color: #FFFFFF;
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
  padding: 5px;
  font-size: 13px;
  text-align: center;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  margin-top: 9px;
}
.ac-container::-webkit-scrollbar {
  display: none;
}
`
export default Wrapper;