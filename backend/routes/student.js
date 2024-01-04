import express from "express";
import { createstudent,deletestudent, getcoursefromstudent } from "../controllers/studentcontrol.js";
const router = express.Router();

router.post("/newstudent",createstudent);
router.delete("/deletestudent/:id",deletestudent);
router.get("/getenrollmentbystudent/:id",getcoursefromstudent);

export default router
