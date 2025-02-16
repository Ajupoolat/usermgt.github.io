import React, { useEffect, useState } from 'react';
import styles from './Home.module.css'; 
import { logout } from '../../ReduxFeatures/auth/authslce';
import { useSelector,useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchdata } from '../../ReduxFeatures/auth/authslce';

function Home() {
 const dispatch=useDispatch()
 const navigate=useNavigate()
 const {token,isdatareached,data}=useSelector((state)=>state.auth)
 const [user,setuserdata]=useState('')
 const tokensender=localStorage.getItem('token')||null




useEffect(()=>{
  if (token) {
    dispatch(fetchdata(token)); 
  }
},[token])


useEffect(()=>{
  if(data){
    setuserdata(data)
  }
  
},[data])
console.log(data+':the data')
 console.log(user.profilePicture)

const logoutbt=()=>{
  localStorage.removeItem("token");
  dispatch(logout()); // Clear Redux state
  window.location.href = "/login"; // Ensure immediate redirect
}
  return (
    
    <div className={styles.mainOfHome}>
      <div className={styles.navbar}>
        <h1>Home{user.email}</h1>
        <div className={styles.navRight}>
          {/* Display the profile picture or a default icon */}
          <Link to='/profile'>
          {user?.profilePicture ? (
            <img
              src={user?.profilePicture}
              alt="Profile"
              className={styles.profileIcon}
            />
          ) : (
            <div className={styles.defaultIcon}>👤</div> // Default icon if no profile picture
          )}
          </Link>
        
          <button className={styles.logoutBtn} onClick={logoutbt}>
            Logout
          </button>
        </div>
      </div>
      <div className={styles.hero}>
        <div className={styles.welcomeCard}>
          <h2>Welcome to Home Page</h2>
        </div>
      </div>
    </div>
  );
}

export default Home;
