import User from "../models/user.model.js";
import Blog from "../models/blog.model.js";
import AppError from "../utils/error.utils.js";
import cloudinary from 'cloudinary';
import fs from 'fs/promises';
import upload from "../middlewares/multer.middleware.js";
import { appendFile } from "fs";
import { publicEncrypt } from "crypto";


const viewAllBlogs = async (req, res, next) => {
    try{
        let { page, limit } = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 3;

        const skip = ( page - 1 ) * limit;

        const allBlogs = await Blog.find({}).skip(skip).limit(limit);
        if(!allBlogs){
            return next(new AppError('Error occurred in fetching blogs or blogs might not exits', 400));
        }

        const totalBlogs = await Blog.countDocuments();

        res.status(200).json({
            success : true,
            message : 'All Blogs fetched',
            allBlogs,
            totalBlogs,
            totalPages : Math.ceil(totalBlogs / limit),
            currentPage : page
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

const updateblog = async (req, res, next) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const OldBlog = await Blog.findById(id);
    if (!OldBlog) {
        return next(new AppError(`Blog not found with id ${id}`, 404));
    }
    

    let newpublic_id = null;
    let newsecure_url = null;

    const oldpublic_id = OldBlog.thumbnail.public_id.split('/')[1];
    console.log(oldpublic_id);
    if (req.file) {
        console.log("New Thumbnail Received");
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
            public_id: oldpublic_id,
            invalidate: true,
            overwrite: true,
            folder: "blogging_site",
            width: 450,
            height: 450,
            gravity: "auto",
            crop: "fill",
        });

        if (result) {
                newpublic_id = result.public_id;
                newsecure_url = result.secure_url;

                fs.rm(`uploads/${req.file.filename}`);
            }
        } catch (err) {
            return next(new AppError(`Thumbnail not updated : ${err.message}`, 401));
        }
    }

    const updatedblog = await Blog.findByIdAndUpdate(
        id,
        { title, content, thumbnail: { public_id: newpublic_id, secure_url: newsecure_url } },
        {
            sort: { updatedAt: -1 },
            projection: { title: 1, content: 1, thumbnail: 1 },
        }
    );

    await updatedblog.save();
    res.status(200).json({
        success: true,
        message: "blog updated successfully",
        blog: {title, content, thumbnail : {public_id : newpublic_id, secure_url : newsecure_url}},
    });
};


const deleteblog = async(req, res, next) => {
    const { id } = req.params;
    try{
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if(!deletedBlog){
            return next(new AppError(`Blog is not deleted, please try again : ${err.message}`, 401));
        }

        const public_id = deletedBlog.thumbnail.public_id; // assuming you have a thumbnailPublicId field in your Blog model
        await cloudinary.v2.api.delete_resources([public_id], { all: true });
        console.log(`The thumbnail is deleted`);


        res.status(200).json({
            success:true,
            message:'Blog successfully deleted',
            deletedBlog
        })


    }catch(err){
        return next(new AppError(`Error occurred while deleting the specific blog, please try again : ${err.message}`, 401));
    }
}


export {
    viewAllBlogs,
    viewPersonalBlogs,
    createblog,
    updateblog,
    deleteblog
}














