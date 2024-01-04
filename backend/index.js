import express  from "express"
import dotenv from "dotenv"
import mysql from "mysql"
import cors from "cors"
import bodyParser from "body-parser"
import authRoute from './routes/auth.js'
import courseRoute from './routes/course.js'
import registrationRoute from './routes/registration.js'
import stundetRoute from './routes/student.js'
import teacherRoute from './routes/teacher.js'
import userRoute from './routes/user.js'

const app = express();
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'lms'
});

app.use(express.static('LMS'));

app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.send("lms");
})
app.use(express.static('LMS'));
app.use("/auth", authRoute);
app.use("/course",courseRoute);
app.use("/registration",registrationRoute);
app.use("/student",stundetRoute);
app.use("/teacher",teacherRoute);
app.use("/user",userRoute);




app.listen(5500,()=>{
    console.log("Connected to Backend..!!!");
})
export default db;