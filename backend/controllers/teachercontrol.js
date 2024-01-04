import db from "../index.js";

//delete TEACHER


export const deleteteacher = async (req, res) => {
    const did = req.body.id;
    const q = `DELETE FROM TEACHERS WHERE USERID=?`;
    db.query(q, [did], (err, data) => {
        if (err) return res.send(err);
        if(data===null){
            return res.json("Does not exist");
        }
        const q = `DELETE FROM USER WHERE USERID=?`;
        db.query(q, [did], (err, d) => {
            if (err) return res.send(err);
            if(d===null){
                return res.json("Does not exist");
            }
        });
        return res.json("teacher has been deleted successfully");
    })

};

// export const updateteacher = async(req,res)=>{
//     const id=req.body.id;
//     const dsg=req.body.designation;
//     const desc= req.body.description;

//     if(desc){
//         const q=`UPDATE TEACHER SET DESCRIPTION=? WHERE USERID=?`;
//     db.query(q,[desc,id],(err,data)=>{
//         if(err) return res.send(err);
//         //return res.send("Description updated successfully");

//         if(dsg){
//             const q=`UPDATE TEACHER SET DESIGNATION=? WHERE USERID=?`;
//         db.query(q,[dsg,id],(err,dd)=>{
//             if(err) return res.send(err);
//             //return res.send("Designation updated successfully");
//         })
//         }
         
//     })
//     }
//     return res.send("Teacher updated successfully");
    
//  }

export const updateteacher = async (req, res) => {
    const id = req.body.id;
    const tnm = req.body.TeacherName

    try {

        if (tnm) {
            const q = `UPDATE TEACHERS SET TEACHERNAME=? WHERE USERID=?`;
            db.query(q, [tnm, id], (err, dd) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Internal Server Error");
                }
                // You can choose to send a response here if needed
            });
        }

        return res.send("Teacher updated successfully");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};



export const createteacher = async (req, res) => {
    try {
        const userId = req.body.UserID; // Assuming UserId is the foreign key
        const deg = req.body.TeacherName;

        if (!userId || !deg) {
            return res.status(400).send("UserId,Teacher Name are required");
        }
        const userCheckQuery = 'SELECT USERNAME FROM USER WHERE USERID = ?';
        db.query(userCheckQuery, [userId], (err, userCheckResult) => {
            if (err) {
                return res.json(err);
            } else {
                if (!userCheckResult || userCheckResult.length === 0) {
                    return res.status(404).send("User not found");
                }

                // Now check if the user is already a teacher
                const teacherCheckQuery = 'SELECT * FROM teacherS WHERE USERID = ?';

                db.query(teacherCheckQuery, [userId], (err, teacherCheckResult) => {
                    if (err) {
                        return res.json(err);
                    } else {
                        if (teacherCheckResult.length !== 0) {
                            return res.status(200).send("teacher with the same ID already exists");
                        } else {
                            // The user exists and is not a teacher, so we can proceed to insert the teacher
                            const teacherInsertQuery = `INSERT INTO teacherS (USERID, TeacherName) VALUES (?,?)`;
                            db.query(teacherInsertQuery, [userId,deg], (err) => {
                                if (err) {
                                    return res.json(err);
                                }
                                return res.json("teacher has been created successfully");
                            });
                        }
                    }
                });
            }
        })
    }
    catch (error) {
                console.error(error);
                return res.status(500).send("Error creating teacher");
            }
};

///GET TEACHER BY ID
export const  getteacher= async (req, res) => {
    try {
        const name=req.params.id
        const q = `SELECT DISTINCT T.TEACHERNAME FROM TEACHERS T INNER JOIN COURSE C ON C.TEACHERID=T.TEACHERID WHERE C.TEACHERID=${name}`;
        db.query(q, (err, data) => {
            if (err) return res.send(err);
            return res.send(data);
        })
    }
    catch (err) {
        res.status(500).json(err);
    }
}

///GET ALL COURSES TAUGHT BY TEACHER
export const  getcoursefromteacher = async (req, res) => {
    try {
        const name=req.params.id
        const q = `SELECT T.TEACHERID,T.TEACHERNAME,C.COURSEID,C.COURSE_TITLE,C.DURATION,C.CATEGORY_ID FROM TEACHERS T INNER JOIN COURSE C ON C.TEACHERID=T.TEACHERID WHERE C.TEACHERID=?`;
        db.query(q, name,(err, data) => {
            if (err) return res.status(200).json(err);
            return res.send(data);
        })
    }
    catch (err) {
        res.status(500).json(err);
    }
}


