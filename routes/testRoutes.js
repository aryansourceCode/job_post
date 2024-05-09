import express from 'express';
import testPostController from '../controllers/testController.js';
import {generatetoken,jwtauthmiddleware} from "../jwt.js";
const router=express.Router();

router.post('/test',jwtauthmiddleware, testPostController);

export default router;