import mongoose from 'mongoose';

const connectDB= async()=>{
    try{
        const conn=await mongoose.connect(process.env.db_url);
        console.log(`connected to mongodb database ${mongoose.connection.host}`)
    }catch(err){
        console.log(err);

    }
}

export default connectDB;