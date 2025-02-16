require('dotenv').config();
const express=require('express')
const cors=require('cors')
const connnectDB=require('./DB/connectDB')
const routes=require('./routes/useroutes')
const bodyparser=require('body-parser')
const adminroutes=require('./routes/admin')
const path = require('path');
//creating the application 

const app = express()


//using the all application middleware 

app.use(cors({
    origin:'http://localhost:5173'
}));
// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyparser.json())
app.use('/api/data',routes)
app.use('/api/admindata',adminroutes)
//connecting the database 

connnectDB();


//setting the server 

app.listen(4000,()=>{
console.log('the 4000 server is running')
})