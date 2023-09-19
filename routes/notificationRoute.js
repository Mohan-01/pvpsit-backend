import express from 'express';
import notificationController from '../controllers/notificationController.js';
import userController from '../controllers/userController.js';

const router = express.Router();

router.get('/', notificationController.getNotify);

router.use(userController.protect, userController.isAuthorized);

router.post('/', notificationController.createNotify);
router.delete('/delete-all', notificationController.deleteAll);
router.route('/:id').patch(notificationController.updateNotify).delete(notificationController.deleteNotify);

export default router;