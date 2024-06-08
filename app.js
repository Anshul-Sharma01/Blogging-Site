import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { config } from 'dotenv';
config();













const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(morgan('dev'));




export default app;








