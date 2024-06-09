import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';


import { config } from 'dotenv';
config();



const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(morgan('dev'));


app.get("/api/v1/user/ping", (req, res) => {
    res.send("/pong");
})

app.use('/api/v1/user', userRoutes);



app.all("*",(req,res) => {
    res.status(400).send('OOPS !! 404 Page not found');
})


export default app;








