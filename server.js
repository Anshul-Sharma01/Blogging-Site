import app from './app.js';
import connectionToDb from './config/dbConnection.js';
import cloudinary,{ v2 } from 'cloudinary';


cloudinary.v2.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    await connectionToDb();
    console.log(`Server is listening at http://localhost:${PORT}`);
})