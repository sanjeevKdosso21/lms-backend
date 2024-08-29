
import{ Router } from 'express'
import { AdminCreate, AdminCreateCourse, AdminCreateTopic, AdminGetAllCourseList, AdminGetAllTopicList, AdminLogin } from '../controllers/AdminController';

const router = Router();

router.post('/admin/create',AdminCreate);
router.post('/admin/login',AdminLogin);
//course 
//get all course list 
router.post('/admin/course/create',AdminCreateCourse)
router.get('/admin/course/getall',AdminGetAllCourseList);
//get all topic associated with a particular course 
router.get('/admin/topic/getall/:courseId',AdminGetAllTopicList);
//create topic 
router.post('/admin/topic/create',AdminCreateTopic)


export default router;