const express = require('express')
const {signup,login}=require('../Controller/useController')


const router=express.Router();


//login and signup routes
router.post('/signup',signup)
router.post('/login',login)

module.exports=router;