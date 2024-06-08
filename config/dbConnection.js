import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const connectionToDb = async () => {
    try{
        const { connection } = await mongoose.connect(process.env.MONGO_URI || `mongodb://localhost:27017/Blogging_site`);
        if(connection){
            console.log(`Connected to MongoDb : ${connection.host}`);
        }
    }catch(err){
        console.log(`Some error occurred while connecting to database : ${e.message}`);
        process.exit(1);
    }
}

export default connectionToDb;








