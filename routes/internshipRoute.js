import express from 'express';
import userController from '../controllers/userController.js';
import internshipController from '../controllers/internshipController.js';

const router = express.Router();

router.get('/' ,internshipController.getAll);
router.get('/:id',internshipController.getById);
router.use(userController.protect, userController.isAuthorized)
router.post('/', internshipController.create);
router.delete('/delete-all', internshipController.deleteAll);
router.route('/:id').patch(internshipController.update).delete(internshipController.deletee);


export default router;