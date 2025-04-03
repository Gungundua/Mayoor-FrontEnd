import React from 'react'
import Wrapper from './style'
import { Link } from 'react-router'

const Login = ({setUser}) => {
  return (
    <Wrapper>
        {/* <input type="button" value="Login" onClick={e => setUser("Shubham Gupta")} /> */}
        <Link to="/homelist">
        <input type="button"  value={Login} />
        </Link>
    </Wrapper>
  )
}

export default Login
