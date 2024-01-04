import express from "express";
import { GETALL, createuser, deleteuser, login, store, tid, updateuser } from "../controllers/usercontrol.js";

const router = express.Router();


router.post("/newuser",createuser);
router.put("/forgotpassword/:id",updateuser);
router.delete("/deleteuser/:id",deleteuser);
router.get("/",GETALL);

router.post("/login",login);

router.get("/student/:id",store);
router.get("/teacher/:id",tid);




export default router