import { connect } from 'mongoose';

const connDB = async () =>{
    try{
        const conn = await connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(error){
        console.log(`MongoDB connection error: ${error.message}`);
        process.exit();
    }
};

export default connDB;