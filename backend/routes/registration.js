import express from "express";
import { accessmodules, contact, createregistration, deleteregistration, deletesubmission, submissions } from "../controllers/registrationcontrol.js";
const router = express.Router();

router.post("/newenrollnment",createregistration);
router.delete("/deleteenrollment",deleteregistration);



///new  entry in conatct form
router.post("/contactform",contact);
router.delete("/delsubmissions/:id",deletesubmission);
router.get("/access/:sid/:cid",accessmodules);

router.get("/allsubmissions",submissions);



export default router
