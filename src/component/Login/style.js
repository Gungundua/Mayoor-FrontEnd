import styled from "styled-components";

const Wrapper = styled.section`

    text-align: center;
    line-height: 100vh;
    input{
        border : none;
        background : #292;
        color : #fff;
        padding : 10px 30px;
        border-radius: 3px;
        font-weight: bold;
        box-shadow: 2px 2px 5px #ccc;
        cursor: pointer;
        &:hover{
            box-shadow: 5px 5px 5px #ccc;
        }
    }

`

export default Wrapper