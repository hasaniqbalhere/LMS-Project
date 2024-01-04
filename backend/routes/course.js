import express from "express";
import { GETALLC, ROLLBACKMODULE, admincourses, allcategory, coursecount, createcategory, createcourse, createmodule, deleteCategory, deleteCourse, deleteModule, 
    getcategory, getcoursebyid, getmodulebyid, getmoduleofteacher, modulecount, updateCourse, updateModule } from "../controllers/coursecontrol.js";
const router = express.Router();

router.post("/addcategory",createcategory);
router.post("/addcourse",createcourse);
router.delete("/deletecourse/:courseId", deleteCourse);
router.put("/updatecourse",updateCourse);
router.get("/",GETALLC)
router.get("/getcategory/:id",getcategory);
router.delete("/delcategory/:categoryname",deleteCategory)
router.get("/allcategory",allcategory);
router.get("/getcourse/:id",getcoursebyid);
router.get("/countcourse/:id",coursecount);

//GET ADMIN COURSE
router.get("/admincourse",admincourses)





////creating modules of courses
router.post("/addmodule",createmodule);
router.put("/updatemodule",updateModule);
router.delete("/deletemodule/:moduleId",deleteModule);
router.get("/getmodule/:id",getmodulebyid);
router.get("/countmodule/:id", modulecount);
router.get("/getmoduleofteacher/:id",getmoduleofteacher);
router.post("/rollbackmodule",ROLLBACKMODULE);

export default router