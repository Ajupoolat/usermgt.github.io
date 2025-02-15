const userModel=require('../Model/userModel')
const bycrpt=require('bcrypt')
const jwt=require('jsonwebtoken')


const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'




//signup
const signup=async(req,res)=>{
    const {email,password}=req.body
    console.log(email,password)

try{

    const userexist=await userModel.findOne({email})
    if(userexist){

        return res.status(400).json({message:"this email is already exist"})
    }

    const hashpassword=await bycrpt.hash(password,10)
    const newuser=new userModel({email,password:hashpassword})


    await newuser.save()
    res.status(201).json({ message: 'User registered successfully.'});


}catch(error){
res.status(500).json({error:'there is issue'})
}

}

//login

const login=async(req,res)=>{

    const {email,password}=req.body;

    try{

        
    const userfind=await userModel.findOne({email})

    if(!userfind)return res.status(404).json({message:'the user is not found'})

        const matching=await bycrpt.compare(password,userfind.password)
        if(!matching)return res.status(404).json({message:'invalid username and password'})
            
            const token=jwt.sign({userId:userfind._id},process.env.JWT_SECRET,{expiresIn:"1h"})
            console.log(token);
            
            res.status(200).json({message:'Login successful',token:token});
    }catch(error){
console.log(error)
        res.status(500).json({message:'something error'});
    }


}

module.exports={signup,login}