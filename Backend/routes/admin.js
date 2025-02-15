const express=require('express')
const {adminlogin,getuser,deleteuser,editUser,adduser,searchuser}=require('../Controller/adminController')

const router=express.Router()

router.post('/adminlogin',adminlogin)
router.get('/getuserdata',getuser)
router.delete('/deleteuser/:id',deleteuser)
router.patch('/edituser/:id',editUser)
router.post('/adduser',adduser)
router.get('/searchuser',searchuser)

module.exports=router;