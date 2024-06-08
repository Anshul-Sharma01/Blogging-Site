
import User from '../models/user.model.js';
import AppError from '../utils/error.utils.js';
import cloudinary from 'cloudinary';
import fs from 'fs/promises';


const cookieOptions = {
    maxAge : 7 * 24 * 60 * 60 * 1000,
    httpOnly : true,
    secure : true
}


const register = async(req, res, next) => {
    const { username, name, email, password } = req.body;
    if(!username || !name || !email || !password){
        return next(new AppError('All fields are mandatory', 400));
    }

    const emailExists = await User.findOne({email});
    if(emailExists){
        return next(new AppError('Email already exists',400));
    }
    const unameExists = await User.findOne({username});
    if(unameExists){
        return next(new AppError('Username already exists', 400));
    }

    const user = await User.create({
        username, name, email, password, avatar: {
            public_id : email,
            secure_url : "Still not get url"
        }
    });

    if(!user){
        return next(new AppError("User registration failed, pleae try again", 400));
    }

    if(req.file){
        console.log("Profile pic received");
        try{
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder : 'blogging_site',
                width:250,
                height:250,
                gravity:'faces',
                crop:'fill'
            })

            if(result){
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;

                fs.rm(`uploads/${req.file.filename}`);
            }
        }catch(err){
            return next(new AppError(err.message || "File not uploaded, please try again",500));
        }
    }
    const token = await user.generateJwtToken();
    res.cookie('token', token, cookieOptions);

    await user.save();
    user.password = undefined;
    res.status(201).json({
        success:true,
        message:'User registered successfully',
        user,
    })
};

const login = async(req, res, next) => {
    
}

const logout = async(req, res, next) => {
    res.send("Ky haal hain");
}

const getProfile = async(req, res, next) => {

}

const forgotPassword = async(req, res, next) => {

}

const resetPassword = async(req, res, next) => {

}

const changePassword = async(req, res, next) => {

}

const updateUser = async(req, res, next) => {

}


export{
    register,
    login,
    logout,
    getProfile,
    forgotPassword,
    resetPassword,
    changePassword,
    updateUser
}