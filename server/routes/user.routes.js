import { Router } from "express";

import {authorizedRole, isLoggedIn} from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';
import { register, login, logout, getProfile, forgotPassword, resetPassword, changePassword, updateUser, deleteUser, addNewUser } from '../controllers/user.controller.js';



const router = Router();


router.post("/register",upload.single('avatar'), register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', isLoggedIn, getProfile);
router.post('/reset', forgotPassword);
router.post('/reset/:resetToken', resetPassword);
router.post('/change-password', isLoggedIn, changePassword);
router.post('/update', isLoggedIn, upload.single('avatar'), updateUser);
router.get('/delete-user/:userId', isLoggedIn, authorizedRole('ADMIN'), deleteUser )
router.post('/add-user', isLoggedIn, authorizedRole('ADMIN'), addNewUser);


export default router;