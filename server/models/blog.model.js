
import { Schema, model } from 'mongoose';


const blogSchema = new Schema({
    username : {
        type : String,
        required : [true,'Username must be provided'],
        trime : true,
        lowercase : true
    },
    title:{
        type : String,
        required : [true,'Title is required'],
        trim : true,
        minlength : [6,'title must be atleast 6 characters'],
        maxlength : [50, 'title must be less than 50 characters'],
    },

    content : {
        type : String,
        required : [true,'Content is required'],
    },

    thumbnail : {
        public_id : {
            type : String,
        },
        secure_url : {
            type : String
        }
    }
}, { 
    timestamps : true
})

const Blog = model('Blogs', blogSchema);

export default Blog;