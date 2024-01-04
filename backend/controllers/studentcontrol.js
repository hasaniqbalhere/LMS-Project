import db from "../index.js";

//delete student


export const deletestudent = async (req, res) => {
    const did = req.params.id;
    const q = `DELETE FROM STUDENTS WHERE USERID=?`;
    db.query(q, [did], (err, data) => {
        if (err) return res.send(err);
        if (data === null) {
            return res.json("Does not exist");
        }
        const q = `DELETE FROM USER WHERE USERID=?`;
        db.query(q, [did], (err, d) => {
            if (err) return res.send(err);
            if (d === null) {
                return res.json("Does not exist");
            }
            return res.json("Student has been deleted successfully");
        })
});
}

export const createstudent = async (req, res) => {
    try {
        const userId = req.body.UserID; // Assuming UserId is the foreign key
        const age = req.body.Age;

        if (!userId || !age) {
            return res.status(400).send("UserId and age are required");
        }
        const userCheckQuery = 'SELECT USERNAME FROM USER WHERE USERID = ?';
        db.query(userCheckQuery, [userId], (err, userCheckResult) => {
            if (err) {
                return res.json(err);
            } else {
                if (!userCheckResult || userCheckResult.length === 0) {
                    return res.status(404).send("User not found");
                }

                // Now check if the user is already a student
                const studentCheckQuery = 'SELECT * FROM STUDENTS WHERE USERID = ?';

                db.query(studentCheckQuery, [userId], (err, studentCheckResult) => {
                    if (err) {
                        return res.json(err);
                    } else {
                        if (studentCheckResult.length !== 0) {
                            return res.status(200).send("Student with the same ID already exists");
                        } else {
                            // The user exists and is not a student, so we can proceed to insert the student
                            const studentInsertQuery = `INSERT INTO STUDENTS (USERID, AGE) VALUES (?, ?)`;
                            db.query(studentInsertQuery, [userId, age], (err) => {
                                if (err) {
                                    return res.json(err);
                                }
                                return res.json("Student has been created successfully");
                            });
                        }
                    }
                });
            }
        })
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Error creating student");
    }
};

///GET ALL COURSES ENROLLED BY STUDENT
export const  getcoursefromstudent = async (req, res) => {
    try {
        const name=req.params.id
        const q = `SELECT E.ENROLLMENTID,C.COURSEID,C.COURSE_TITLE,C.DURATION, T.TEACHERNAME,G.CATEGORY_NAME  FROM ENROLLMENTS E 
        INNER JOIN COURSE C ON E.COURSEID=C.COURSEID  INNER JOIN TEACHERS T ON C.TEACHERID=T.TEACHERID INNER JOIN CATEGORY G ON 
        C.CATEGORY_ID=G.CATEGORYID WHERE E.STUDENTID=?`;
        db.query(q, name,(err, data) => {
            if (err) return res.status(200).json(err);
            return res.send(data);
        })
    }
    catch (err) {
        res.status(500).json(err);
    }
}









