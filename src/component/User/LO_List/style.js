  import styled from "styled-components";
  const Wrapper = styled.section`
      width: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden; /* Prevent overflowing of the container */
      background-color: #21C2BA;
      .search-container {
        display: flex;
        gap: 5px;
        align-items: center;
        position: relative;
        padding: 10px;
              margin-left: -10px;
      }
      .icon{
        display: flex;
        gap: 12px;
        align-items: center;
        margin-left: 20px;
        // padding-right: 15px;
      }
      .search-bar {
        width: 100%;
        padding: 10px 40px 10px 15px; /* Padding for space for the search icon */
        font-size: 16px;
        border-radius: 25px;
        border: 1px solid #ddd; /* Same border color as other elements */
        background-color: rgba(255, 255, 255, 0.6);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Light shadow for subtle depth */
        outline: none;
        transition: border-color 0.3s, box-shadow 0.3s; /* Smooth transition */
        margin: 10px;
      }
      .search-bar:focus {
        border-color: #00796B; /* Matching the color scheme */
        box-shadow: 0 2px 4px rgba(0, 121, 107, 0.2);
        background-color: white;/* Focus shadow effect */
      }
      .search-bar::placeholder {
        color: #aaa
        }
      .no-results{
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
      .no_results{
        color: gray;
        text-align: center;
      }
      /* .list-icon-container {
        position: absolute;
        left: 10px; 
        top: 50%;
        transform: translateY(-50%);
      }
      .list-icon {
        width: 18px;
        height: 18px;
        opacity: 0.7;
      } */

        .top-heading{
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px 0px;
          color: #00000096;
          font-size: larger;;
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
      padding: 10px 10px 100px 10px;
    }
    .lo-list::-webkit-scrollbar {
      width: 8px; /* Width of the scrollbar for WebKit browsers */
    }
    .held-popup {
      position: absolute;
      background: rgba(151, 150, 150, 0.8);
      color: white;
      padding: 5px;
      border-radius: 5px;
      z-index: 100;
      margin-top: 5px;
      display: flex;
      flex-wrap: wrap;
      max-width: 400px;
  }
  .mapLoItem{
    margin: 10px 10px 0 0;
    padding: 5px;
    text-align: center;
    width: 300px;
    white-space: normal; /* Allow text to wrap */
    word-wrap: break-word; /* Ensure long words wrap */
    overflow-wrap: break-word;
  }
    .lo-list::-webkit-scrollbar-thumb {
      background-color: #ccc; /* Color of the scrollbar thumb */
      border-radius: 4px;
    }
    .lo-list-item {
      width: 90%;
      background: white;
      margin: 10px auto;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      padding: 15px;
      border-radius: 10px;
      color: #6C6C6C;
      // overflow: hidden;
      // z-index: -1;
    }
    .lo-header {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .lo-info {
      flex: 1;
      flex-direction: row;
      overflow: hidden; /* Ensures text is clipped */
    }
    .lo-info p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
      margin-right: 30px;
    }
    .item-title{
    font-size: 16px;
    padding-bottom: 5px;
    color:rgb(47, 46, 46);
  }
      .item-info{
      font-size: small;
    }
    .lo-dropdown-icon {
      font-size: 18px;
      color: #00796B;
    }
    .lo-dropdown-content {
      padding: 10px;
      background:r;
      // color: #004D40;
      display : none;
      &.show{
        display : block;
      }
    }
      .dots{
      height: 40px;
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
      .plus{
      font-size: 40px;
      color: rgb(26, 24, 24)
      }
    .add{
      background-color: #21C2BA;
      opacity: 0.9;
      font-weight: bold;
      width: 60px;
      height: 60px;
      -moz-border-radius: 50px;
      -webkit-border-radius: 50px;
      border-radius: 50px;
      display: flex; /* Use flexbox for alignment */
      justify-content: center; /* Center horizontally */
      align-items: center; /* Center vertically */
      text-align: center;
      position: fixed; /* Fixed positioning */
      bottom: 100px; /* Distance from the bottom */
      right:20px; /* Distance from the right */
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
    .popup-menu{
    background-color: white
    }

  .list-icon-containers{
  // background-color: #21C2BA;
    margin-right: 10px;
    border-radius: 5px;
    padding: 2px;
  }
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Dim background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  // .popup-content {
  //   background: white;
  //   padding: 20px;
  //   border-radius: 10px;
  //   width: 300px;
  //   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  //   animation: popup 0.3s ease-in-out;
  // }
  @keyframes popup {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
  .form-container button {
    margin-top: 10px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .form-container button:hover {
    background-color: #F0F0F0;
  }
  .mapCounter{
      height: 20px;
      width: 20px;
      border-radius: 50%;
      background-color: gray;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: #fff;
      margin-right: 5px;
      padding: 2px;
  }
  .circular{
      height: 50px;
      width: 50px;
      border: 5px solid lightgray;
      border-bottom: 5px solid rgb(127, 124, 124);
      position: absolute;
      top: 150px;
      left: 180px;
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
  .success-overlay {
    position: fixed; /* Ensures full-page coverage */
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Keeps it on top */
  }
  .lo-list-item,
  .lo-header,
  .held-popup {
    user-select: none; /* Standard property (Chrome, Edge, Opera, etc.) */
    -webkit-user-select: none; /* Safari & older versions of Chrome */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
  }
  .loading-message{
      display: block;
      width: 100px;
      margin: 200px auto;
      }

      .no-lo {
    background-color: #ffcccc;  
  }

  /* .ac-skeleton-item {
    display: flex;
    align-items: center;
    padding: 14px 16px;
    background-color: rgba(255, 255, 255, 0.03);
    border-radius: 10px;
    margin-bottom: 12px;
    position: relative;
    gap: 16px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.08);
  }

  .skeleton-icon {
    width: 35px;
    height: 35px;
    border-radius: 6px;
    background-color: #ccc;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
  }

  .skeleton-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .skeleton-line {
    height: 10px;
    background-color: #ccc;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
  }

  .skeleton-line.short {
    width: 60%;
  }

  .skeleton-badge {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #ccc;
    position: relative;
    flex-shrink: 0;
  }

  .shimmer::before {
    content: '';
    position: absolute;
    top: 0;
    left: -150px;
    height: 100%;
    width: 150px;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: shimmer 1.2s infinite;
  }

  @keyframes shimmer {
    100% {
      transform: translateX(300%);
    }
  } */


.lo-skeleton-item {
  width: 88%;
  margin: 10px auto;
  padding: 20px 20px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
  list-style: none;
}

.skeleton-icon {
  width: 35px;
  height: 35px;
  border-radius: 5px;
  background-color: #dddddd;
  flex-shrink: 0;
}

.skeleton-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton-line {
  height: 10px;
  width: 80%;
  background-color: #dddddd;
  border-radius: 5px;
}

.skeleton-line.short {
  width: 50%;
}

.skeleton-badge {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #dddddd;
}
.skeleton-badge2 {
  width: 5px;
  height: 20px;
  background-color: #dddddd;
  border-radius: 4px;
}

/* Optional shimmer animation */
.shimmer {
  position: relative;
  overflow: hidden;
}

.shimmer::before {
  content: "";
  position: absolute;
  top: 0;
  left: -150px;
  width: 100px;
  height: 100%;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(255, 255, 255, 0.6) 50%,
    transparent 100%
  );
  animation: shimmer 1.2s infinite;
}

@keyframes shimmer {
  0% {
    left: -150px;
  }
  100% {
    left: 100%;
  }
}

  `
  export default Wrapper;