import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
        validate : validator.isEmail
    },
    password:{
        type:String,
        required:[true,'password is required'],
        minlength:[6,"should atleast be 6 characters"]
    },
    location:{
        type:String,
        default:'India'
    }
},{timestamps:true})

userSchema.pre('save',async function(next){
    const user=this;
    if(!user.isModified('password')) return next();
    try{
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(user.password,salt);
        user.password=hashedPassword;
        next();
    }
    catch(err){
        console.log(err);
    }

})
userSchema.methods.comparepassword=async function(candidatepassword){
    try{
        const ismatch = await bcrypt.compare(candidatepassword,this.password);
        return ismatch; 
    }catch(err){
        throw err;
    }
 }
 const User=mongoose.model('User',userSchema);
 export default User;