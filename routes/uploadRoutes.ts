import {Router} from 'express';

import { getAllCoursePdf, getAllVideos, getCoursePdf, getCourseVideo, uploadCoursePdf, uploadCourseVideo } from '../controllers/UploadController';

const router = Router();

// upload video
router.post('/admin/uploadVideo', uploadCourseVideo);
router.get('/video', getAllVideos);
router.get('/video/get/:id', getCourseVideo);

//upload pdf
router.post('/upload/pdf', uploadCoursePdf);
router.get('/pdf/get/:id', getCoursePdf);
router.get('/pdf/getAll', getAllCoursePdf);

export default router