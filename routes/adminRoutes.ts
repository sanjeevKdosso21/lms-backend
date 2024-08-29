
import { Router } from 'express'
// import { AdminCreate, AdminCreateCourse, AdminCreateTopic, AdminGetAllCourseList, AdminGetAllTopicList, AdminLogin } from '../controllers/AdminController';
// import { authenticateToken, isAdmin } from '../middleware/adminMiddleware';

const router = Router();

/* router.post('/admin/create', AdminCreate);
router.post('/admin/login', isAdmin, authenticateToken, AdminLogin);
//course 
//get all course list 
router.post('/admin/course/create', isAdmin, authenticateToken, AdminCreateCourse)
router.get('/admin/course/getall', isAdmin, authenticateToken, AdminGetAllCourseList);
//get all topic associated with a particular course 
router.get('/admin/topic/getall/:courseId', isAdmin, authenticateToken, AdminGetAllTopicList);
//create topic 
router.post('/admin/topic/create', isAdmin, authenticateToken, AdminCreateTopic) */


export default router;