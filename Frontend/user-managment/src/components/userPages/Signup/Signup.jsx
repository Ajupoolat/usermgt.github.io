import React,{useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios'
import styles from './Signup.module.css'; 

function Signup() {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
const [message,setmessage]=useState('')
const navigate=useNavigate();

  const handleText = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmition=async(e)=>{
      e.preventDefault()

      try {
        const response=await axios.post("http://localhost:4000/api/data/signup", formdata)
        setmessage(response.data.message)
        navigate('/login')
        nev
      } catch (error) {
        console.log(error);
        setmessage(error.response?.data?.message)
      }
  }

  return (
    <div className={styles.main}>
      <form className={styles.signupForm} onSubmit={handleSubmition}>
        <h4 id="message" className={styles.errorMsg}> 
          {/* Error Message */}
        </h4>
        <div className={styles.logoContainer} />
        <div className={styles.signupContent}>
        {message && (
            <p style={{color:'red'}}>{message}</p>
          )}  
          <div className={styles.signupHeader}>Register to your account</div>
          <input
            className={styles.signupInput}
            type="text"
            name="email"
            id="email"
            placeholder="Enter email"
            autoComplete="off"
            onChange={handleText}
            value={formdata.email}
          />
          <input
            className={styles.signupInput}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleText}
            value={formdata.password}
          />
          {/* <input
            className={styles.signupInput}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
          /> */}
          <button className={styles.signupButton} type="submit">
            Register
          </button>
          <div className={styles.signupLinks}>
             <Link to='/login'>
                        <a className={styles.loginLink} style={{color:'#32445c'}} >
                          login
                        </a></Link>
          </div>
        </div>
               </form>
    </div>
  );
}
 export default Signup;
