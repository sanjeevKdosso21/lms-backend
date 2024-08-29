import express from 'express';
import { CounsellorCourseList, CounsellorGet, CounsellorLogin, CounsellorLogout, createCounselor, Decrypt, deleteCounselor, Encrypt, get_all_counsellor, get_counselLor_by_id, updateCounselor } from '../controllers/counsellor_registration';
import { CounsellorauthenticateToken } from '../middleware/middleware';


const router = express.Router();

// router.get('/counsellor_all',get_all_counsellor)
// router.get('/counsellor/:id',get_counselLor_by_id);
router.post('/counsellor/create', createCounselor);
// router.put('/counsellor/:id', updateCounselor);
// router.delete('/counsellor/:id', deleteCounselor);

//login 
router.post('/counsellor/login', CounsellorLogin);
router.post('/counsellor/logout', CounsellorLogout);

//get counselor after login 
router.get('/counsellor/getByToken',CounsellorauthenticateToken, CounsellorGet);
// router.get('/payment',)

router.post('/Encrypt',Encrypt)
router.get('/Decrypt',Decrypt)

router.get('/counsellor/course/getlist',CounsellorauthenticateToken,CounsellorCourseList);

export default router;
