import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css'; // Adjust the path as needed
import EditformUser from '../../forms/userEdit/userediting';
import { useDispatch, useSelector } from 'react-redux';
import { edit, fetchdata } from '../../ReduxFeatures/auth/authslce';
const Profile = () => {
    const [showform,setshowform]=useState(false);
 const {token,isdatareached,data,edited}=useSelector((state)=>state.auth)
    const dispatch=useDispatch();
    const [user,setuser]=useState('')

    useEffect(()=>{
      if(token){
        dispatch(fetchdata(token))
      }

    },[token,edited])

    
    useEffect(()=>{
      if(data){
        setuser(data)
      }
      
    },[data])

    console.log("data is commedd:"+data)
  return (
    <div className={styles.profilePage}>
      <h1 style={{color:'white'}}>Profile</h1>
      <div className={styles.profileContainer}>
        <div className={styles.profileInfo}>
          <div className={styles.profilePictureContainer}>
            {user?.profilePicture ? (
                       <img
                         src={user?.profilePicture}
                         alt="Profile"
                         className={styles.profilePicture }
                       />
                     ) : (
                       <div className={styles.defaultIcon}>👤</div> // Default icon if no profile picture
                     )}
          </div>
          <div className={styles.email}>
            <strong>Email:</strong> {user.email}
          </div>
          <button className={styles.editButton} onClick={()=>setshowform(!showform)}>Edit Profile</button>
        </div>
      </div>
      {showform&&<EditformUser setshowform={setshowform} user={user}/>}

    </div>

  );
};

export default Profile;