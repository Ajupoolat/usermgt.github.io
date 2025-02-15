import React, { useState } from "react";
import styles from './adduser.module.css'
import { useDispatch, useSelector } from "react-redux";
import { addnewuser } from "../ReduxFeatures/userlist/userlistReducer";






const AddUserForm = ({setshowform}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('')
  const dispatch=useDispatch();
  const {error,loading}=useSelector((state)=>state.userdata)


  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleSubmit=(e)=>{
    e.preventDefault()
    const formdata={email,password}

    dispatch(addnewuser({formdata}))
    setshowform()
  }

  const close=()=>{
 
    setshowform()

  }

  return (
    <div>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
            <button onClick={close} className={styles.closeBtn} style={{color:"red",marginTop:'10px'}}>X</button>
          <h2>Add New User</h2>
          <p>Create a new user account</p>
        </div>
        <form id="addUserForm" onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter user's email"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <span className={styles.errorText} id="emailError">
              Please enter a valid email address
            </span>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={togglePassword}
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>
            <span className={styles.errorText} id="passwordError">
              Password must be at least 8 characters
            </span>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Add User
          </button>

          <div className={styles.formFooter}>All fields are required</div>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
