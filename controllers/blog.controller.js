import User from "../models/user.model.js";
import Blog from "../models/blog.model.js";
import AppError from "../utils/error.utils.js";
import cloudinary from 'cloudinary';
import fs from 'fs/promises';
import upload from "../middlewares/multer.middleware.js";
import { appendFile } from "fs";


const viewAllBlogs = async (req, res, next) => {
    try{
        const allBlogs = await Blog.find({});
        if(!allBlogs){
            return next(new AppError('Error occurred in fetching blogs or blogs might not exits', 400));
        }

        res.status(200).json({
            success : true,
            message : 'All Blogs fetched',
            allBlogs
        })

    }catch(err){
        return next(new AppError('Error occurred in fetching blogs', 400));
    }
}


const viewPersonalBlogs = async(req, res, next ) => {
    console.log(req.user);
    try{
        const username = req.user.username;
        const myBlogs = await Blog.find({username});

        if(!myBlogs){
            return next(new AppError("Error occurred in fetching personal blogs : ",400));
        }

        if(myBlogs.length == 0){
            return next(new AppError('Blogs doesnt exists',400));
        }

        res.status(200).json({
            success : true,
            message : 'Personal blogs fetched',
            myBlogs
        })
    }catch(err){
        return next(new AppError(`Failed to fetch personal blogs ${err.message}`,400));
    }
}

const createblog = async (req, res, next) => {
    try {
        const { title, content } = req.body;
        const username = req.user.username;

        if (!title || !content) {
            return next(new AppError('All fields are mandatory', 400));
        }

        const newBlog = await Blog.create({
            username, title, content, thumbnail: {
                public_id: username,
                secure_url: 'Still not got url'
            }
        });

        if (!newBlog) {
            return next(new AppError('Blog Creation failed, please try again.', 400));
        }

        if (req.file) {
            try {
                console.log("Thumbnail recieved");
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'blogging_site',
                    width: 450,
                    height: 400,
                    gravity: 'auto',
                    crop: 'fill'
                });

                if (result) {
                    newBlog.thumbnail.public_id = result.public_id;
                    newBlog.thumbnail.secure_url = result.secure_url;

                    fs.rm(`uploads/${req.file.filename}`);
                }
            } catch (err) {
                return next(new AppError(`File not uploaded, please try again : ${err.message}`, 500));
            }
        }

        await newBlog.save();
        res.status(200).json({
            success:true,
            message:"Blog successfully created",
            newBlog
        })
    } catch (err) {
        return next(new AppError(`Some Error occurred while creating blog...Please try again after some time. : ${err.message}`, 400));
    }
};

const updateblog = async(req, res, next) => {

} 


const deleteblog = async(req, res, next) => {

}


export {
    viewAllBlogs,
    viewPersonalBlogs,
    createblog,
    updateblog,
    deleteblog
}














