const mongoose = require('mongoose');


const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.Mongo_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected successfully");}
    catch(err){
        console.error("MongoDB connection failed", err);
        process.exit(1); // Exit the process with failure
    }
}

module.exports = connectDb;