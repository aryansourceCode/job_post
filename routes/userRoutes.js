import express from 'express';
import {generatetoken,jwtauthmiddleware} from "../jwt.js";
import  userController  from '../controllers/userController.js';

const router=express.Router();

router.put('/update-user',jwtauthmiddleware,userController);
export default router;