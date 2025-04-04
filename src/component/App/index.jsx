import { use, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "../Login";
import Home from "../Home";
import HomeList from "../Homelist";
import ClassView from "../Classview/Classview";
import StudentList from "../Students/StudentSelect";
import ROlist from "../RO_List";
import LOlist from "../LO_List";
import AClist from "../AC_List";
import Dashboard from "../Dashboard";
const App = () => {
    const [user, setUser] = useState();
    const [loItems, setLoItems] = useState([]);
    const [acItems, setAcItems] = useState([]);
    const [studentsData, setStudentsData] = useState([]);
    
     return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/homelist" element={<HomeList />} />

                {/* Parent route for Home */}
                <Route path="/home/" element={<Home />}>
                    {/* Default redirect to /home/classview */}
                    <Route index element={<Navigate to="classview" replace />} />
                    <Route path="classview" element={<ClassView user={user} />} />
                    <Route path="students" element={<StudentList onStudentsData={setStudentsData} />} />
                    <Route path="ro" element={<ROlist loItems={loItems} setLoItems={setLoItems} acItems={acItems} />} />
                    <Route path="lo" element={<LOlist loItems={loItems} setLoItems={setLoItems} acItems={acItems} setAcItems={setAcItems} />} />
                    <Route path="ac" element={<AClist acItems={acItems} setAcItems={setAcItems} studentsData={studentsData} user={user} />} />
                    <Route path="dashboard" element={<Dashboard/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
