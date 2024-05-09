import validator from "validator";
import Job from "../models/jobSchema.js";
///import User from "../models/userModels.js";
//import userController from "./userController.js";
import mongoose from "mongoose";
export const CreateJob=async(req,res,next)=>{
    try{
        const {company,position}=req.body;
        if(!company || !position){
            next("please enter following fields");
        }
       //console.log(req.user.id);
        req.body.createdBy = req.user.id;
        const job= await Job.create(req.body);
        res.status(201).json({job});
    }
    catch(err){
        console.log(err);
    }

};
export const GetJob=async(req,res,next)=>{
    try{
        const job= await Job.find({createdBy:req.user.userId});
        res.status(201).json({
            totalJobs:job.length,
            job,

        })

    }
    catch(err){
        console.log(err);
    }
}

export const UpdateJob=async(req,res,next)=>{
    try{
        const jobid=req.params.jobid;
        const updatedData=req.body;
        if(jobid){
            const job = await Job.findByIdAndUpdate(jobid,updatedData,{
                new:true,
                runValidators:true
            });
            res.status(200).json(job);
        }
        
        console.log("data updated");
        if(!jobid){
            res.status(500).json({"message":"error"})
        }
    }catch(err){
        console.log(err);
    }

}

export const deleteJob=async(req,res,next)=>{
    try{
        const jobid=req.params.jobid;
        const response= await Job.findByIdAndDelete(jobid);
        if(!response){
            res.status(500).json({"message":"data not found"});
        }
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
    }
}


export const statscontroller=async(req,res)=>{

    const stats= await Job.aggregate([
        {
            $match:{
                createdBy: new mongoose.Types.ObjectId(req.user.id),
            },
        },
        {
            $group:{
                _id:"$company",
                count:{$sum:1},
            },
        }
      
    ]);
    const defaultstats= {
        pending:stats.pending || 0,
        rejected:stats.rejected ||0,
        complete: stats.complete ||0,
    }
    res.status(200).json({length:stats.length,defaultstats});

}

export const statscontrollerp=async(req,res)=>{
    const {status,workType,search,sort}= req.query;
    const queryObject={
        createdBy:req.user.id
    }

    try{
    if(status  && status!=='all'){
        queryObject.status=status
    }
    if(workType  && workType!=='all'){
        queryObject.workType=workType
    }

    if(search){
        queryObject.position= {$regex:search,$options:'i'}
    }
    let queryResult=Job.find(queryObject);
    if(sort=='a-z'){
        queryResult=queryResult.sort('position');  
    }
    if(sort=='z-a'){
        queryResult=queryResult.sort('-position');  
    }
    const page=Number(req.query.page) || 1;
    const limit=Number(req.query.limit) || 10;
    const skip=(page-1)*limit;
    queryResult=queryResult.skip(skip).limit(limit);
    const totalJobs=await Job.countDocuments(queryResult);
    const noofpages=Math.ceil(totalJobs/limit);

    const jobs=await queryResult;
    res.status(200).json({totalJobs,jobs});
    }catch(err){
        console.log(err);
        res.status(500).json({"Error":"internal server error"})
    }}