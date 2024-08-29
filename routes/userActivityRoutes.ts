import express from 'express';
import { addActivity, getActivitiesByUserId, getAllActivities, deleteActivity } from '../controllers/studentActivityController';
import {authenticateToken} from '../middleware/middleware';

const router = express.Router();

router.post('/activity', authenticateToken, addActivity);
router.get('/activity/:userId', authenticateToken, getActivitiesByUserId);
router.get('/activities', getAllActivities);
router.delete('/activity/:id', authenticateToken, deleteActivity);

export default router;