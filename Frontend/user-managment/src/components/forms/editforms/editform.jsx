import React,{useEffect, useState} from 'react'
import styles from './editform.module.css'
import { useDispatch,useSelector } from 'react-redux'
import { editUser } from '../../ReduxFeatures/userlist/userlistReducer'
function Editform({setedit,user}) {

    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(''); // Optional: Only update if changed
    const dispatch = useDispatch();
    const {loading,error}=useSelector((state)=>state. userdata)
    const [erroremail,seterroremail]=useState('')
    const [passworderror, seterrorPassword] = useState(''); 

    const[errorof,seterror]=useState('')
  
    const handleSubmit = (e) => {


      e.preventDefault();


      const stringemail=toString(email)

      if(stringemail.trim()===''||password.trim()===''){

         return seterror('require all feilds')
      }else{
        seterror('')
      }

      
      
      const emalvalidation=(email)=>{
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email)

      }
      console.log(stringemail)
      if(!emalvalidation(email)){

      return  seterroremail('Please enter a valid email address (e.g., example@domain.com).')
      }else{

        seterroremail('')
      }
       
      if(password.length<6){
       return  seterrorPassword('Password must be at least 6 characters long.')
      }else{
        seterrorPassword('')
      }
     
        
      const updatedData = { email };
      if (password) updatedData.password = password; // Include password only if changed
      

      
  
      dispatch(editUser({userId:user._id,updatedData }));
      setedit()
      console.log(user._id)
    };
 
      
  
  return (


    <div className={styles.container}>
    <h2 className={styles.title}>Edit User</h2>
    <h1 className={styles.close} onClick={() => setedit(null)}>X</h1>
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
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
      {erroremail&&<p style={{color:'red'}}>{erroremail}</p>}

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
              {passworderror&&<p style={{color:"red"}}>{passworderror}</p>}

      </div>


      <button type="submit" className={styles.button} >update</button>
        
        {errorof&&<p style={{color:'red'}}>{errorof}</p>}

    </form>
  </div>
  )
}

export default Editform