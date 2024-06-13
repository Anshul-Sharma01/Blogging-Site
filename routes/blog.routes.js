import { Router } from 'express';

import { authorizedRole, isLoggedIn } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';
import { createblog, updateblog, deleteblog, viewAllBlogs, viewPersonalBlogs } from '../controllers/blog.controller.js';

const router = Router();

router.get('/view', isLoggedIn, viewAllBlogs);
router.get('/viewmyblogs', isLoggedIn, viewPersonalBlogs);
router.post('/createblog', isLoggedIn, upload.single('thumbnail'), createblog);
router.post('/updateblog/:id', isLoggedIn, updateblog);
router.get('/deleteblog/:id', isLoggedIn, authorizedRole('ADMIN'), deleteblog);




export default router;