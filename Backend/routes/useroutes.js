const express = require('express')
const {signup,login,profileicon,edit}=require('../Controller/useController')


const router=express.Router();


//login and signup routes
router.post('/signup',signup)
router.post('/login',login)
router.get('/profileicon',profileicon)
router.patch('/edit/:id',edit)

module.exports=router;