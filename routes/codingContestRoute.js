import express from 'express';
import userController from '../controllers/userController.js';
import codingContestController from '../controllers/codingContestController.js';

const router = express.Router();

router.get('/', codingContestController.getAll);
router.get('/:id', codingContestController.getById);
router.use(userController.protect, userController.isAuthorized)
router.post('/',codingContestController.create);
router.route('/:id').patch(codingContestController.update).delete(codingContestController.deletee);
router.delete('/delete-all', codingContestController.deleteAll);


export default router;