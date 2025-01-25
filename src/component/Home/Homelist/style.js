import styled from "styled-components";

const Wrapper = styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #21C3BC;

    #user {
        padding: 40px 0px 70px 40px;
        font-size: 17px;
    }

    p {
    font-size: 15px;
    }

    form{
        background-color: white;
        border-radius: 30px 30px 0 0;
        display: flex;
        flex : 1;
        flex-direction: column;
        gap: 20px;
        align-items: center;
        padding-top: 50px;
        
        select{
            width: 80%;
            padding : 15px;
            font-weight: 600;
            border-radius: 50px;
            background-color: #B3E4F4C7;
        }
    }

    label {
        align-self: flex-start;
        padding-left: 11%;
        line-height: 1;
    }

    #submit {
        width: 25%;
        padding : 15px;
        border-radius: 50px;
        background-color: #409FF3;
        margin-top: 50px;
        margin-bottom: 50px;
        color: white;
        font-weight: bold;
        cursor: pointer;
    }

    #submit:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    select:disabled {
        cursor: not-allowed;
    }

`

export default Wrapper