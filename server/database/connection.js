//Stabilishing DB connection
const mongoose = require('mongoose')

const connectDB=async() => {
    try{
        //mongodb connection string
        mongoose.set("strictQuery", false);
        const con= await mongoose.connect(process.env.MONGO_url,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
     
        })
        console.log(`DB connected:${con.connection.host}`)
    }
    catch(err){
        console.log(err);
        process.exit(1);

    }
}

module.exports=connectDB;