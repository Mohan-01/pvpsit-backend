import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoute.js';
import codingContestRouter from './routes/codingContestRoute.js';
import internshipRouter from './routes/internshipRoute.js';
import hackAThonRouter from './routes/hackAThonRoute.js';

dotenv.config({path: './.env'});

const DB = process.env.DATABASE_URI.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => console.log('Database connected successfully')).catch(err => console.log(err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({limit: '50mb'}));
app.use(cors());
// app.use(cors({origin: true, credentials: true}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users', userRouter);
app.use('/coding-contests', codingContestRouter);
app.use('/internships', internshipRouter);
app.use('/hackathons', hackAThonRouter);

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'API entry point'
    });
})

app.use('*', (req, res) => {
    res.status(404).json({
        status: '404 Not Found',
        message: `No path found for ${req.originalUrl}`
    })
})

app.listen(PORT, err => {
    if(err) console.error(err);
    else console.log(`Server is listening on ${PORT}`);
})

process.on('uncaughtException', err => {
    console.error(err);
    console.log(`Uncaught exception server shutting down`);
    process.exit(1);
})