const mongoose=require('mongoose')

//connect the database

const conncetDb=async()=>{

    
    try{
        const conn=await mongoose.connect('mongodb://localhost:27017/ReduxUserManagment')
        console.log(`'mongo database connected':${conn.connection.host}`)
    }catch(error){
        console.log(`ERROR:${error.message}`)
        process.exit(1)//exit code failure
    }

}

module.exports=conncetDb;