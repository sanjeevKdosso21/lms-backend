import {Router} from 'express';
import { FullStackWebDevelopmentCreate, FullStackWebDevelopmentGet } from '../controllers/fullstackWebDeveloper';

const router = Router();

router.post('/fullstack/web/create', FullStackWebDevelopmentCreate);
router.get('/fullstack/web/getAll', FullStackWebDevelopmentGet);
export default router