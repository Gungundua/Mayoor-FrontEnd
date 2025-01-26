import { useState } from "react"
// import Header from "../Header"
import Login from "../Login"
import Home from "../Home"
import RO_LO_Mapping from "../RO_LO_Mapping";
import ROList from "../RO_LO_Mapping";


const App = () => {

    const [user, setUser] = useState(null)

    return <>
        {
            user ? <Home user={user} /> : <Login setUser = {setUser} />
        }
    </>
}


export default App