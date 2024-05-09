import User from "../models/userModels.js";

const userController = async (req, res) => {
    try{
        const userid=req.user;
        const {currentPassword,newPassword}=req.body;
        const user = await User.findById(userid.id); 

        if(!(await user.comparepassword(currentPassword))){
            return res.status(401).json({error:'Invalid username or password'});
        }
        user.password=newPassword;

        await user.save();

        console.log("password updated");
        res.status(200).json({message:"password updated"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})
    }
}

export default userController;
