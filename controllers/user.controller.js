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

}

const login = async(req, res, next) => {

}

const logout = async(req, res, next) => {

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