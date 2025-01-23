import styled from "styled-components";

const Wrapper = styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;
    form{
        display: flex;
        flex : 1;
        flex-direction: column;
        justify-content: space-evenly;
        select, input{
            width: 100%;
            padding : 15px;
        }
    }

`

export default Wrapper