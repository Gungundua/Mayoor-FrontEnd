import styled from "styled-components";

const Wrapper = styled.section`
position: fixed;
  .container {
    display: flex;
    flex-direction: column;
    background-color: #21c2ba;
    width: 100vw;
    align-items: center;
    max-width: 100%;
    box-sizing: border-box;
  }

  .header {
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: #21c2ba;
  }

  .search-container {
    display: flex;
    gap: 7px;
    align-items: center;
    position: relative;
    margin-top: 17px;
    padding: 10px;
    width: 100%;
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
    border-color: #00796b;
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
    /* box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); */
    margin-top: -1px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    position: relative;
    width: 93%;
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
    background-color: #20b2aa;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
  }

  .student-name {
    font-size: 14px;
    color: #6c6c6c;
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
`;

export default Wrapper;
