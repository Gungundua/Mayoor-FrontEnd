import styled from "styled-components";

const Wrapper = styled.section`
    height : 100vh;    
    display: flex;
    flex-direction: column;
    .screen{
        flex : 1;
        display: flex;
        flex-direction: column;
        padding : 30px;
    }
    .bottom{
        display: flex;
        input{
            flex : 1;
            border : none;
            background : #292;
            color : #fff;
            padding : 15px;
            font-weight: bold;
            cursor: pointer;
            &.active{
                background-color: #070;
            }
        }
    }
`

export default Wrapper