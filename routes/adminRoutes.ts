
import { Router } from 'express'
import { AdminCreate, AdminCreateCourse, AdminCreateTopic, AdminGetAllCourseList, AdminGetAllTopicList, AdminLogin } from '../controllers/AdminController';
import { adminAuthmiddleware } from '../middleware/adminMiddleware'

const router = Router();

router.post('/admin/create', adminAuthmiddleware, AdminCreate);
router.post('/admin/login', adminAuthmiddleware, AdminLogin);
//course 
//get all course list 
router.post('/admin/course/create', adminAuthmiddleware, AdminCreateCourse)
router.get('/admin/course/getall', adminAuthmiddleware, AdminGetAllCourseList);
//get all topic associated with a particular course 
router.get('/admin/topic/getall/:courseId', adminAuthmiddleware, AdminGetAllTopicList);
//create topic 
router.post('/admin/topic/create', adminAuthmiddleware, AdminCreateTopic)


export default router;