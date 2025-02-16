const userModel=require('../Model/userModel')
const bycrpt=require('bcrypt')
const jwt=require('jsonwebtoken')
const multer=require('multer')
const path=require('path')



const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'




// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Make sure this directory exists
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
    }
  });
  
  // Initialize upload variable
  const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5000000 }, // 5MB limit
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  }).single('profilePicture'); // 'profilePicture' should match the field name in the form
  
  // Check file type
  function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
  
  const signup = async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: "there is a error in uploating" });
      }
  
      const { email, password } = req.body;
      const profilePicture = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

  
      try {
        const userExist = await userModel.findOne({ email });
        if (userExist) {
          return res.status(400).json({ message: "This email already exists" });
        }
  
        const hashPassword = await bycrpt.hash(password, 10);
        const newUser = new userModel({ email, password: hashPassword, profilePicture });
  
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.' });
      } catch (error) {
        res.status(500).json({ error: 'There was an issue registering the user.' });
      }
    });
  };

//login

const login=async(req,res)=>{

    const {email,password}=req.body;

    try{

        
    const userfind=await userModel.findOne({email})

    if(!userfind){
        console.log('yes triggered')
        return res.status(404).json({message:'the user is not found'})
    }
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



//show profile picture 


const profileicon= async(req,res)=>{
  console.log('profileicon is worked')
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from header
console.log(token)
    try {
      const decoded = jwt.verify(token, JWT_SECRET); // Verify and decode JWT
      console.log('Decoded Token:', decoded);

      const user = await userModel.findOne({ _id: decoded.userId }); // Find user by ID
        
        console.log(user)
        res.status(200).json(user)

    } catch (error) {
        console.log(error)
    }

}

//edit option 
const edit = async (req, res) => {
  upload(req, res, async (err) => {

    console.log(req.file)
    console.log(req.files)
    if (err) {
      return res.status(400).json({ message: "there is a error in uploating" });
    }

    const { email, password } = req.body;
    const {id}=req.params
    console.log('SET oK')
    console.log(id)
    const user=await userModel.findOne({_id:id})
    const profilePicture = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : user.profilePicture;
    console.log(profilePicture)

    const hashPassword = await bycrpt.hash(password, 10);

    try {
      const users = await userModel.findOneAndUpdate({ _id:id },{$set:{email,password:hashPassword,profilePicture}});
      res.status(200).json(users);  

    } catch (error) {
      res.status(500).json({ error: 'There is a issue in editing' });
    }
  });
};

module.exports={signup,login,profileicon,edit}