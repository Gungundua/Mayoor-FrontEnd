import { useState } from "react"
import Login from "../Login"
import Home from "../Home"


const App = () => {

    const [user, setUser] = useState()

    return <>
        {
            user ? <Home user={user} /> : <Login setUser = {setUser} />
        }
    </>
}


export default App