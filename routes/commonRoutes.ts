import { Router } from "express";

import { createQueryFormEntry } from "../controllers/queryController";

import { createCounselorFormEntry } from "../controllers/counsellorController";
import { creatContactUsFormEntry } from "../controllers/contactController";

import {SkillOnTimeHomePageImageSliderFunction, SkillOnTimeHomePageImageSliderGetAllFunction} from "../controllers/commonController";

const router = Router();

router.post('/create/query/form',createQueryFormEntry);
router.post('/create/counselor/form',createCounselorFormEntry);
router.post('/create/contact/form',creatContactUsFormEntry);


//image slider image for www.skillontime.com home page images 
router.post('/skillontime/home/imageslider/:id', SkillOnTimeHomePageImageSliderFunction);
router.get('/skillontime/getAll/images',SkillOnTimeHomePageImageSliderGetAllFunction)

export default router;