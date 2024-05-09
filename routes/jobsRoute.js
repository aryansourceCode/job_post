import express from 'express';
import {generatetoken,jwtauthmiddleware} from "../jwt.js";
import {CreateJob,GetJob,UpdateJob, deleteJob, statscontroller, statscontrollerp} from '../controllers/JobController.js';

const router = express.Router();
router.post('/job-profile',jwtauthmiddleware,CreateJob);

router.get('/get-jobs',jwtauthmiddleware,GetJob);
router.patch('/updatejobs/:jobid',jwtauthmiddleware,UpdateJob);
router.delete('/delete-data/:jobid',jwtauthmiddleware,deleteJob);
router.get('/job-stats',jwtauthmiddleware,statscontroller);
router.get('/job-statsp',jwtauthmiddleware,statscontrollerp);
export default router;