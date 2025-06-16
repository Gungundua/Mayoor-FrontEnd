import styled from "styled-components";
const Wrapper = styled.section`
 width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #21C2BA;
    overflow: hidden; /* Prevent overflowing of the container */
  .container {
    display: flex;
    flex-direction: column;
    // background-color: #21C2BA;
    width: 100%;
    align-items: center;
    max-width: 100%;
    box-sizing: border-box;
  }
  .top-heading{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0px;
    color: #00000096;
    font-size: larger;
    padding: 10px 20px;
  }

  .search-container {
    display: flex;
      gap: 5px;
      align-items: center;
      position: relative;
      padding: 10px;
      margin-left: -10px;
  }
  .icon {
    display: flex;
    align-items: center;
    margin-left: 20px
  }
  .search-bar {
    width: 100%;
    padding: 10px 40px 10px 15px;
    font-size: 16px;
    border-radius: 25px;
    border: 1px solid #ddd;
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
    margin: 10px;
  }
  .search-bar:focus {
    border-color: #00796B;
    box-shadow: 0 2px 4px rgba(0, 121, 107, 0.2);
    background-color: white;
  }
  .search-bar::placeholder {
    color: #aaa;
  }
  .list-icon-container {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  .list-icon {
    width: 18px;
    height: 18px;
    opacity: 0.7;
  }
  .studentlist {
    background-color: white;
    padding: 15px;
    flex: 1;
    /* box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); */
    // margin-top: -1px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    width: 100;
    overflow-y: auto;
  }
  .student-item {
    width: 95%;
    background-color: white;
    padding: 10px;
    margin: 10px auto;
    border-radius: 20px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 15px;
    min-height: 50px;
    cursor: pointer;
  }
  .student-avatar {
    width: 50px;
    height: 50px;
    background-color: #20B2AA;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
  }
  .student-name {
    font-size: 14px;
    color: #6C6C6C;
  }
  .no-results {
    text-align: center;
    color: gray;
    font-size: 16px;
    margin-top: 10px;
  }
  .circular{
    height: 50px;
    width: 50px;
    border: 5px solid lightgray;
    border-bottom: 5px solid rgb(127, 124, 124);
    position: absolute;
    top: 70px;
    left: 160px;
    border-radius: 50%;
    animation: loader 2s linear infinite;
}
@keyframes loader {
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
}
.loading-message{
    height: 100px;
    width: 100px;
    display: block;
    margin: auto;
    color: grey;
    }
      .loading-message div{
        height: 100px;
        width: 150px;
      font-size: x-large;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    // If using styled-components inside Wrapper
/* .skeleton-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.skeleton-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(255, 255, 255, 0.05);
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.skeleton-info {
  flex: 1;
} */
.custom-skeleton-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #ffffff0d;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
}

.avatar-skeleton {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #ccc;
  position: relative;
  overflow: hidden;
}

.text-skeleton-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.line-skeleton {
  height: 12px;
  border-radius: 4px;
  background: #ccc;
  position: relative;
  overflow: hidden;
}

.line-skeleton.short {
  width: 60%;
}

.shimmer::before {
  content: '';
  position: absolute;
  top: 0;
  left: -150px;
  height: 100%;
  width: 150px;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(300%);
  }
}

`
export default Wrapper;