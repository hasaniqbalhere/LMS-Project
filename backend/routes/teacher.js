import express, { Router } from "express";
import { createteacher, deleteteacher, getcoursefromteacher, getteacher, updateteacher } from "../controllers/teachercontrol.js";
const router = express.Router();

router.post("/createteacher", createteacher);
router.delete("/deleteteacher",deleteteacher);
router.put("/updateteacher",updateteacher);
router.get("/getteacher/:id",getteacher);
router.get("/allcourse/:id",getcoursefromteacher);


export default router
