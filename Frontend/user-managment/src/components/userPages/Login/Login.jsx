import React ,{useState, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { login } from '../../ReduxFeatures/auth/authslce';

import styles from './Login.module.css'; 

function Login() {


  
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const {loading,error}=useSelector((state)=>state.auth)
  const [nev,setnev]=useState(false)

  const handlesubmition= async(e)=>{

    e.preventDefault() 

    const result= await dispatch(login({email,password}));
console.log(password)

if(result.payload){
  setnev(!nev)
}
    
useEffect(()=>{
    
       if(nev){
        setTimeout(()=>{
        navigate('/')
        },2000)
       }
     },[nev,navigate])
   
      
  }
   
      

  return (
<div className={styles.parent}>
<div className={styles.loginForm}>
      <form
        className={styles.loginContent} 
       onSubmit={handlesubmition}
      >
        <div className={styles.logoContainer}></div>
        <div>
          <div className={styles.loginHeader}>Login to your account</div>
          <input
            className={styles.loginInput}
            type="text"
            id="email"
            name="email"
            placeholder="Enter Email"
            autoComplete="off"
            onChange={(e)=>setemail(e.target.value)}
            value={email}
          />
          <input
            className={styles.loginInput}
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            onChange={(e)=>setpassword(e.target.value)}
            value={password}
          />
          <button className={styles.loginButton} type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
          </button>
          {error&&<p style={{color:'red',marginLeft:'100px'}}>{error}</p>}
          <div className={styles.loginLinks}>
            <span>Don't have an account?</span>
            <Link to='/signup'  className={styles.loginLink}>
           
              
           Register Now</Link>
          </div>
        </div>
        </form>
    </div>
</div>

    
  )

}

export default Login
