import express from 'express';
import userController from '../controllers/userController.js';
import internshipController from '../controllers/internshipController.js';

const router = express.Router();

router.get('/' ,internshipController.getAll);
router.get('/:id',internshipController.getById);
router.use(userController.protect, userController.isAuthorized)
router.post('/', internshipController.create);
router.route('/:id').patch(internshipController.update).delete(internshipController.deletee);
router.delete('/delete-all', internshipController.deleteAll);


export default router;