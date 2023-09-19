import express from 'express';
import userController from '../controllers/userController.js';
import hackAThonController from '../controllers/hackAThonController.js';

const router = express.Router();

router.get('/', hackAThonController.getAll);
router.get('/:id', hackAThonController.getById);
router.use(userController.protect, userController.isAuthorized)
router.post('/', hackAThonController.create);
router.delete('/delete-all', hackAThonController.deleteAll);
router.route('/:id').patch(hackAThonController.update).delete(hackAThonController.deletee);


export default router;