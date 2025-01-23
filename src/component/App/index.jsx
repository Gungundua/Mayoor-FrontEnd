import { useState } from "react"
import Header from "../Header"
import Login from "../Login"
import Home from "../Home"


const App = () => {

    const [user, setUser] = useState(null)

    return <>
        {
            user ? <Home user={user} /> : <Login setUser = {setUser} />
        }
    </>
}


export default App