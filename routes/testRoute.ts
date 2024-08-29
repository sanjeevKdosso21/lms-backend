import { Router } from 'express';
import * as testController from '../controllers/testController';

const router = Router();

router.post('/tests', testController.createTest);
router.get('/tests', testController.getTests);
router.get('/tests/:id', testController.getTestById);
router.put('/tests/:id', testController.updateTest);
router.delete('/tests/:id', testController.deleteTest);

export default router;