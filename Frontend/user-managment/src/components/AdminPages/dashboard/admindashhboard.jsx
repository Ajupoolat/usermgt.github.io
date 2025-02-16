import React, { useEffect, useState } from 'react'
import styles from './admindashboard.module.css'
import AddUserForm from '../../forms/adduser'
import { userData ,deleteUser,search} from '../../ReduxFeatures/userlist/userlistReducer'
import { useSelector,useDispatch } from 'react-redux'
import Editform from '../../forms/editforms/editform'

function Admindashhboard() {
  

  const dispatch=useDispatch();
  const{userlist,loading,error,update,newuser,searchdata}=useSelector((state)=>state.userdata)
  const{edited}=useSelector((state)=>state.auth)
  const [showform,setshowform]=useState(false)
  const [edit,setedit]=useState(false)
  const [query,setquery]=useState('')
  const logoutAdmin=()=>{


    localStorage.removeItem('tokenAdmin')
    window.location.href='/adminLogin'
  }
  const  adduserclick=()=>{
   
    setshowform(!showform)    

  }
  useEffect(()=>{

    dispatch(userData())
  },[dispatch,update,newuser,edited])
  console.log(searchdata)

  const handledelete=(userId)=>{
    alert('the user want to be delete!')
   dispatch(deleteUser(userId))
  }

  const edituser=(index)=>{
    
    setedit(edit===index?null:index);

  }

  const searching=(e)=>{
    e.preventDefault()
    const searcheddata={query}
     dispatch(search(searcheddata))
  }
  return (
      
      
    <section>
      <div className={styles.dashboardContainer}>
    <div className={styles.dashboardHeader}>
      <h1 className={styles.dashboardTitle}>User Management</h1>
      <div className={styles.searchBar}>
        <form action="" onSubmit={searching}>
        <input type="text" placeholder="Search users..." name='searchdata'  onChange={(e)=>setquery(e.target.value)} value={query}/>
        </form>
      </div>
      <button className={styles.addUserBtn} onClick={adduserclick}>+ Add User</button>
      {showform&&<AddUserForm setshowform={setshowform}/>}
      <button className={styles.logoutBtn} onClick={logoutAdmin}>logout</button>


    </div>
    <table className={styles.usersTable}>
      <thead>
        <tr>
          <th>User ID</th>

          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
 
           
      {Array.isArray(userlist) && userlist.length > 0 ? (
              userlist.map((user,index) => (
                <tr key={index}>
                  <td>##{index+1}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button className={styles.editBtn} onClick={()=>{
                        edituser(index)
                       
                      }}>Edit</button>
                      {edit===index&&<Editform setedit={setedit} user={user}/>}
                      <button className={styles.deleteBtn} onClick={()=>handledelete(user._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No users found</td>
              </tr>
            )}


 

      </tbody>
    </table>
  </div>
    </section>
  
  )
}

export default Admindashhboard;



