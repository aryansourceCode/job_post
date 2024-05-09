import User from "../models/userModels.js"
 import {generatetoken,jwtauthmiddleware} from "../jwt.js";
export const registerController = async (req,res,next)=>{
    try{
        const {name,email,password} =req.body;
        if(!name){
            next("enter name");
        }
        if(!email){
            next("please provide email");
        }
        if(!password){
            next("password is required and greater than 6 characters");
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            next("user already created");
        }
        const user = await User.create({name,email,password})
        const payload={
            id:user.id
        }
        console.log(JSON.stringify(payload));
        const token=generatetoken(payload);
        console.log(token);
        res.status(200).json({name:user.name,
            lastname:user.lastname,
            email:user.email,
            location:user.location,
            token:token});

    }catch(err){
        next("error in register controller");

    }
}

export const customerlogin=async (req,res)=>{
        try{
            const{email,password}=req.body;
            const user= await User.findOne({email:email});
            if(!user || !(await user.comparepassword(password))){
                return res.status(401).json({error:'Invalid username or password'});
            }
            const payload={
                id:user.id
            }
            const token=generatetoken(payload);
            res.json({token});
        }catch(err){
            console.log(err);
            res.status(500).json({error:'Inavalid errorr'})
    
        }
    }
    
