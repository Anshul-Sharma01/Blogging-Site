
import User from '../models/user.model.js';
import AppError from '../utils/error.utils.js';
import cloudinary from 'cloudinary';
import fs from 'fs/promises';
import sendEmail from '../utils/sendEmail.utils.js';


const cookieOptions = {
    maxAge : 7 * 24 * 60 * 60 * 1000,
    secure : true,
    httpOnly:true
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
    const token = await user.generateJWTToken();
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
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return next(new AppError('All fields are necessary',400));
        }

        const user = await User.findOne({
            email
        }).select('+password');

        if(!user || !user.comparePassword(password)){
            return next(new AppError("Email or password does not match",400));
        }

        const token = await user.generateJWTToken();
        // console.log("token at login :" ,token);
        user.password = undefined;

        res.cookie('token', token, cookieOptions);
        res.status(200).json({
            success:true,
            message:"User loggedIn successfully",
            user,
        });
        
    }catch(err){
        return next(new AppError(err.message, 500));
    }
}

const logout = async(req, res, next) => {
    res.cookie('token', null, {
        secure : true,
        maxAge : 0,
        httpOnly : true
    });
    res.status(200).json({
        success:true,
        message:'User logged Out successfully'
    })
}

const getProfile = async(req, res, next) => {
    try{
        const userId = req.user.id;
        const user = await User.findById(userId);

        res.status(200).json({
            success:true,
            message:"User Details",
            user
        })
    }catch(err){
        return next(new AppError("Failed to fetch profile details",400));
    }
}

const forgotPassword = async(req, res, next) => {
    const { email } = req.body;

    if(!email){
        return next(new AppError("Email is required",400));
    }

    const user = await User.findOne({ email });
    if(!user){
        return next(new AppError("Email not registered",400));
    }

    const resetToken = await user.generatePasswordResetToken();

    await user.save();
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password`;

    const message = `You can reset your password by clicking <a href=${resetPassword} target="_blank"> Reset Your Password</a>.\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordUrl}.\nIf you have not requested this, kindly Ignore.`;
    try{
        await sendEmail(email,  message);
        res.status(200).json({
            success : true,
            message : `Reset Password token has been sent to ${email} successfully`
        })

    }catch(err){
        user.forgotPasswordExpiry = undefined;
        user.forgotPasswordToken = undefined;
        return next(new AppError(e.message, 500));
    }
    
    
}

const resetPassword = async(req, res, next) => {
    const { resetToken } = req.params;

    const  { password } = req.body;

    const forgotPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    const user = await User.findOne({
        forgotPasswordToken,
        forgotPasswordExpiry : {$gt : Date.now()}
    });

    if(!user){
        return next(new AppError('Token is invalid or expired, please try again !',400));
    }

    user.password = password;
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;
    user.save();

    res.status(200).json({
        success : true,
        message : 'Password changed successfully'
    })
}

const changePassword = async(req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.user;

    if( !oldPassword || !newPassword ){
        return next(new AppError('All fields are mandatory',400));
    }

    const user = await User.findById(id).select('+password');
    if(!user ){
        return next(new AppError('User does not exists',400));
    }

    const isPasswordValid = await user.comparePassword(oldPassword);
    if(!isPasswordValid){
        return next(new AppError('Invalid old Password',400));
    }

    user.password = password;
    await user.save();

    user.password = undefined;
    res.status(200).json({
        success : true,
        message : 'Password changed successfully'
    })
}

const updateUser = async(req, res, next) => {
    const { username } = req.body;
    const { id } = req.user.id;

    const user = await User.findById(id);

    if(!user){
        return next(new AppError('User does not exists',400));
    }

    if(req.username){
        user.username = username;
    }

    if(req.file){
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        try{
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder : 'blogging_site',
                width : 250,
                height : 250,
                gravity : 'faces',
                crop : fill
            }) 

            if(result){
                user.avatar.public_id = reset.public_id;
                user.avatar.secure_url = result.secure_url;

                fs.rm(`uploads/${req.file.filename}`);
            }

        }catch(err){
            return next(new AppError(e || 'File not uploaded, please try again'), 500);
        }

        user.save();
        res.status(200).json({
            success:true,
            message:'User details updated successfully'
        })
    }


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