const bycrpt=require('bcrypt');
const adminModel=require('../Model/adminModel');
const userModel=require('../Model/userModel')
const mongoose=require('mongoose')
const jwt = require('jsonwebtoken')

const JWT_SECRET_ADMIN=process.env.JWT_SECRET_ADMIN||'your_admin_secret_key'

//admin intialization

const intialization=async()=>{

try {
    const existadmin= await adminModel.findOne({username:'admin'});
    if(!existadmin){
        
        const hashpassword= await bycrpt.hash('admin@8848',10);
       await new adminModel({username: 'admin', password: hashpassword}).save();
        console.log('the admin initialized')
    }else{
        console.log('admin is already existing')
    }   
} catch (error) {
    
    console.log('there is a error'+error)
}

}
//login controller 

const adminlogin=async(req,res)=>{
    const {username,password}=req.body
try {
    const adminfind=await adminModel.findOne({username})
    if(!adminfind){
        return res.status(404).json({message:'the admin is not found'})
    }
    const checkcre=await bycrpt.compare(password,adminfind.password);
    console.log(checkcre)

    if(!checkcre){
        return res.status(404).json({message:'the credentails is not correct'});
        
    }
    const tokenadmin=jwt.sign({adminId:adminfind._id},process.env.JWT_SECRET_ADMIN,{expiresIn:"1h"})
                console.log(tokenadmin);
                
                res.status(200).json({message:'Login successful',tokenadmin:tokenadmin});

} catch (error) {
    
    console.log('some thing issue');
    res.status(500).json({message:'something error'});
}
}

//user reading

const getuser=async(req,res)=>{

    try {
        const usedata = await userModel.find();
        // console.log(req.body)
        res.status(200).json(usedata)
        // console.log(usedata)
    } catch (error) {
        res.status(500).json({error:'the user listing have a issue'})
    }


}

//delete the user

const deleteuser=async(req,res)=>{
  
    const {id}=req.params
      console.log(id)
    try {
        await userModel.findByIdAndDelete({_id:id})
        res.status(200).json({message:"the user is deleted"})

    } catch (error) {
        console.log(error)
    }

}
//edit user
const editUser = async (req,res)=>{
    try{
        console.log(req.body)  

       const {email, password} = req.body
       const {id}=req.params
       console.log(id)
       const hashPassword = await bycrpt.hash(password,10)
       const users = await userModel.findOneAndUpdate({_id:id},{$set:{email,password:hashPassword}})
        res.status(200).json(users);  
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Server Error" });

        
    }
}

//adduser

const adduser=async(req,res)=>{
    const {email,password}=req.body
    console.log('trigger')
    console.log(email,password)

try{

    const userexist=await userModel.findOne({email})
    if(userexist){

        return res.status(400).json({message:"this email is already exist"})
    }

    const hashpassword=await bycrpt.hash(password,10)
    const newuser=new userModel({email,password:hashpassword})


    await newuser.save()
    res.status(201).json({ message: 'New user added successfully.'});


}catch(error){
res.status(500).json({error:'there is issue'})
}

}


//search users

const searchuser=async(req,res)=>{

    const {query}=req.query
    console.log('triggered the seacrch')
    console.log(query)

    try {
        
        const users=await userModel.find({
            email:{$regex:query,$options:'i'}
        })
        console.log(users)
        res.status(200).json({users})
    } catch (error) {
        console.log(error);

        res.status(404).json({message:'the user is not found'})
    }
}

module.exports={intialization,adminlogin,getuser,deleteuser,editUser,adduser,searchuser}