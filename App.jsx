
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login";
import Profile from "./components/Profile";

// Firebase configuration
const App = () => {

  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Login />} />
      <Route path = "/profile" element = { <Profile />} />
    </Routes>
    </BrowserRouter>
  );
}


export default App