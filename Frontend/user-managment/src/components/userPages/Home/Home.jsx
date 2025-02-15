import React from 'react';
import styles from './Home.module.css'; 
import { logout } from '../../ReduxFeatures/auth/authslce';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
 const dispatch=useDispatch()
 const navigate=useNavigate()


const logoutbt=()=>{
  localStorage.removeItem("token");
  dispatch(logout()); // Clear Redux state
  window.location.href = "/login"; // Ensure immediate redirect
}
  return (
    
    <div className={styles.mainOfHome}>
      <div className={styles.navbar}>  
        <h1>Home</h1>
        <button className={styles.logoutBtn} onClick={logoutbt}>Logout</button>
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
