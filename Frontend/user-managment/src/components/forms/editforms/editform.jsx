import React,{useEffect, useState} from 'react'
import styles from './editform.module.css'
import { useDispatch,useSelector } from 'react-redux'
import { editUser } from '../../ReduxFeatures/userlist/userlistReducer'
function Editform({setedit,user}) {

    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(''); // Optional: Only update if changed
    const dispatch = useDispatch();
    const {loading,error}=useSelector((state)=>state. userdata)
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      const updatedData = { email };
      if (password) updatedData.password = password; // Include password only if changed
  
      dispatch(editUser({userId:user._id,updatedData }));
      console.log(user._id)
    };
    useEffect(()=>{
  if(!loading && !error){
    setedit(null)
  }
      
    },[loading,error,setedit])
    console.log(loading)
  return (


    <div className={styles.container}>
    <h2 className={styles.title}>Edit User</h2>
    <h1 className={styles.close} onClick={() => setedit(null)}>X</h1>
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className={styles.input}
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="password">Password (Optional)</label>
        <input
          type="password"
          id="password"
          className={styles.input}
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" className={styles.button} >update</button>
      {error && <p style={{color:'red'}}>{error}</p>}

    </form>
  </div>
  )
}

export default Editform