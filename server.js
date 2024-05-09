// const express=require('express');
import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerjsdoc from 'swagger-jsdoc';

import connectDB from './config/db.js';
import testRoutes from './routes/testRoutes.js'
import authRoutes from './routes/authRoutes.js'
import morgan from 'morgan';
import cors from 'cors';
import errorMiddleware from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import jobsRoute from './routes/jobsRoute.js';
import swaggerJSDoc from 'swagger-jsdoc';
dotenv.config();
connectDB();

const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "job portal",
            description: "node js project"
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ]

    },
    apis:["./routes/*.js"]

}
const spec= swaggerjsdoc(options)

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("development"))
app.use('/api', testRoutes);
app.use('/api/', authRoutes);
app.use('/user/', userRoutes);
app.use('/job', jobsRoute);
app.use('/app-doc',swaggerUi.serve,swaggerUi.setup(spec));
const PORT = process.env.PORT || 5000;
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`server running in ${PORT} port`);
})