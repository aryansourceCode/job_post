import express from 'express';
import {registerController,customerlogin} from '../controllers/authController.js';
import {generatetoken,jwtauthmiddleware} from "../jwt.js";
const router=express.Router();



/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - lastName
 *        - email
 *        - password
 *      properties:
 *        id:
 *          type: string
 *          description: The Auto-generated id of user collection
 *          example : DHSASDHJDJHVAJDSVJAVSD
 *        name:
 *          type: string
 *          description: User name
 *        lastName:
 *          type: string
 *          description: User Last Name
 *        email:
 *          type: string
 *          description: user email address
 *        password:
 *          type: string
 *          description: user password should be greater then 6 character
 * 
 *      example:
 *        id: GDHJGD788BJBJ
 *        name: aryan
 *        lastName: srivastava
 *        email: aryansri@gmail.com
 *        password: test@123
 */

/**
 *  @swagger
 *  tags:
 *    name: Auth
 *    description: authentication apis
 */

/**
 * @swagger
 * /api/register:
 *    post:
 *      summary: register new user
 *      tags: [Auth]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: user created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        500:
 *          description: internal serevr error
 */
router.post('/register',registerController);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login to the application
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - Invalid credentials
 *       500:
 *         description: Internal Server Error - Something went wrong
 */

router.post('/login',customerlogin);
export default router;
