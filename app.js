import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import blogRoutes from './routes/blog.routes.js';

import { config } from 'dotenv';
import errorMiddleware from './middlewares/error.middleware.js';
config();



const app = express();


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));



app.get("/api/v1/user/ping", (req, res) => {
    res.send("/pong");
})

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blogs', blogRoutes);


app.all("*",(req,res) => {
    res.status(400).send('OOPS !! 404 Page not found');
})

app.use(errorMiddleware);


export default app;








