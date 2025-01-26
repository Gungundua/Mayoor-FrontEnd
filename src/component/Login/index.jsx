import React from 'react'
import Wrapper from './style'

const Login = ({setUser}) => {
  return (
    <Wrapper>
        <input type="button" value="Login" onClick={e => setUser({name : "Shubham Gupta"})} />
    </Wrapper>
  )
}

export default Login
