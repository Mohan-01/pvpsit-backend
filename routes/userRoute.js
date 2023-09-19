import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.post('/login', userController.login);
router.get('/login-status', userController.isLoggedIn);

router.use(userController.protect);
router.get('/logout', userController.logout);
router.post('/signup', userController.isAuthorized, userController.signup);
router.patch('/update-password', userController.updatePassword);
router.delete('/delete-user', userController.deleteUser);

export default router;