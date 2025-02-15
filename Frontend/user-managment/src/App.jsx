import React,{useState,useEffect} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  
} from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./components/userPages/Home/Home";
import Signup from "./components/userPages/Signup/Signup";
import Login from "./components/userPages/Login/Login";
import Admin from "./components/AdminPages/adminLogin/admin";
import Admindashhboard from "./components/AdminPages/dashboard/admindashhboard";
import AddUserForm from "./components/forms/adduser";
import Editform from "./components/forms/editforms/editform";


function App() {

  const {token}=useSelector((state)=>state.auth)
  const tokenadmin=useSelector((state)=>state.adminAuth)
  const [istoken,setistoken]=useState(localStorage.getItem('token'||''))
  const [isadmin,setadmin]=useState(localStorage.getItem('tokenAdmin'||''))
  

 useEffect(()=>{
    setistoken(localStorage.getItem('token'))
    setadmin(localStorage.getItem('tokenAdmin'))

   

},[token,tokenadmin])



  return (
    <div>
      <Router>
        <Routes>
          
            <Route path="/" element={!istoken?<Navigate to='/login'/>:<Home/>} />
           <Route path="/login" element={!istoken?<Login/>:<Navigate to='/'/>}/>
           <Route path="/signup" element={!istoken?<Signup/>:<Navigate to='/'/>} />
           <Route path='/adminLogin'element={!isadmin?<Admin/>:<Navigate to='/dashboard'/>}/>
           <Route path="/dashboard" element={!isadmin?<Navigate to='/adminLogin'/>:<Admindashhboard/>}/>
          
        </Routes>
      </Router>

    </div>
  );
}

export default App;
