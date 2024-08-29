import { Router } from 'express';
import { createMCQ, getAllMCQs, getMCQById } from '../controllers/mcqController';

const router = Router();

router.post('/mcq/create', createMCQ);
// router.get('/questions', getAllQuestions);
router.get('/mcq/getAll', getAllMCQs);
router.get('/mcq/getbyid/:id/', getMCQById);

export default router;