import React, { useEffect, useState } from "react";
import styles from './admin.module.css';
import { adminLogin } from "../../ReduxFeatures/auth/authAdmin";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";



function Admin() {
const [username,setusername]=useState('');
const [password,setpassword]=useState('');
const dispatch=useDispatch();
const {tokenadmin,error}=useSelector((state)=>state.adminAuth)
const navigate=useNavigate()


const submitform=async(e)=>{
  e.preventDefault()   
const result= await dispatch(adminLogin({username,password}));
console.log(username,password)
console.log(result)
if(result.payload){
  
  navigate('/dashboard')

}

}



  return (
    <div className={styles.wrapper}>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h2>Admin Login</h2>
          {error&&(<p>{error}</p>)}
          {/* {issue&&(<p style={{color:"red"}}>{issue}</p>)} */}
          <form onSubmit={submitform}>
            {/* Display the error message from the server */}
            <h4 className={styles.errorMsg} id="message" style={{ color: "red" }}></h4>
            {/* For error messages */}
            <div className={styles.formGroup}>
              <label htmlFor="username">Username</label>
              <input type="text" value={username} id="username" name="username" autoComplete="off" onChange={(e)=>setusername(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input type="password" value={password} id="password" name="password" onChange={(e)=>setpassword(e.target.value)} />
            </div>
            <button className={styles.loginBtn} type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Admin;
