import { timeStamp } from "console";
import mongoose from "mongoose";

const jobSchema= mongoose.Schema({
    company:{
        type:String,
        required:[true,'company name is required']
    },
    position:{
        type:String,
        required:[true,'position is required']
    },
    status:{
        type:String,
        enum:['pending','complete','rejected'],
        default:'pending'
    },
    worktype:{
        type:String,
        enum:['full-time','part-time','internship','contract'],
        default:'full-time'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
},{timeStamp:true})

const Job=mongoose.model('Job',jobSchema);
 export default Job;

