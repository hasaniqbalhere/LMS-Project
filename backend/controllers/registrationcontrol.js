import db from '../index.js';

///create new registration

export const createregistration = async (req, res) => {
    try {
        const values = [
            req.body.studentid,
            req.body.courseid,
        ];

        if (!values.every((value) => value !== undefined && value !== null)) {
            return res.status(400).send("All attributes are required");
        }

        // Check if the course with the provided COURSEID exists
        const checkcourse = 'SELECT * FROM COURSE WHERE COURSEID = ?';
        db.query(checkcourse, [req.body.courseid], (err, courseres) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error checking course");
            }

            if (!courseres || courseres.length === 0) {
                return res.status(404).send("Course with the provided ID not found");
            }
            // Check if the student with the provided studentID exists
            const checkstudent = 'SELECT * FROM STUDENTS WHERE STUDENTID = ?';
            db.query(checkstudent, [req.body.studentid], (err, studentres) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Error checking student");
                }

                if (!studentres || studentres.length === 0) {
                    return res.status(404).send("Student with the provided ID not found");
                }

                ///check if student is already registered in this course
                const checkEnrollment = `SELECT * FROM ENROLLMENTS WHERE STUDENTID=? AND COURSEID=?`;
                db.query(checkEnrollment, values, (err, checkEnrollment) => {

                    if (checkEnrollment && checkEnrollment.length > 0) {
                        return res.status(200).json("Student is already registered in this course");
                    }
                    else {
                        // The course and student exists, proceed to insert the enrollnment
                        const insertenrollmentQuery = `INSERT INTO ENROLLMENTS(STUDENTID,COURSEID) VALUES (?,?)`;
                        db.query(insertenrollmentQuery, values, (err, data) => {
                            if (err) {
                                console.error(err);
                                return res.status(500).send("Error creating module");
                            }
                            return res.json("Enrollments has been created successfully");
                        });
                    }
                });
            });
        });
    }

    catch (error) {
        console.error(error);
        return res.status(500).send("Error creating course");
    }
};


// Delete enrollment function
export const deleteregistration = (req, res) => {
    const enrollmentId = req.body.enrollmentId;

    // Check if enrollment with the provided ID exists
    const checkEnrollmentQuery = 'SELECT * FROM ENROLLMENTS WHERE ENROLLMENTID = ?';
    db.query(checkEnrollmentQuery, [enrollmentId], (err, checkEnrollment) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error checking enrollment");
        }

        if (!checkEnrollment || checkEnrollment.length === 0) {
            return res.status(404).send("Enrollment with the provided ID not found");
        }

        // Enrollment exists, proceed to delete
        const deleteEnrollmentQuery = 'DELETE FROM ENROLLMENTS WHERE ENROLLMENTID = ?';
        db.query(deleteEnrollmentQuery, [enrollmentId], (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error deleting enrollment");
            }

            return res.json("Enrollment has been deleted successfully");
        });
    });
};

export const contact = async (req, res) => {
    try {
        const values = [
            req.body.name,
            req.body.email,
            req.body.phone,
            req.body.subject,
            req.body.message,
        ];

        if (!values.every((value) => value !== undefined && value !== null)) {
            return res.status(400).send("All attributes are required");
        }
        const contactentry = `INSERT INTO CONTACT (NAME,EMAIL,PHONE,SUBJECT,MESSAGE) VALUES (?, ?, ?, ?, ?)`;
        db.query(contactentry, values, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error");
            }
            return res.status(200).send({ success: "Form submitted successfully" });

            // return res.redirect('http://127.0.0.1:5500/LMS/index.html');
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Error");
    }

};

export const submissions = async (req, res) => {
    try {
        const q = 'SELECT * FROM CONTACT';
        db.query(q, (err, data) => {
            if (err) return res.send(err);
            return res.send(data);
        })
    }
    catch (err) {
        res.status(500).json(err);
    }
}
export const deletesubmission = async (req, res) => {
    const did = req.params.id;
    const q = `DELETE FROM CONTACT WHERE SERIAL=?`;
    db.query(q, did, (err, data) => {
        if (err) return res.send(err);
        return res.json("Submission been deleted successfully");
    })

}

export const accessmodules = async (req, res) => {
    const values = [
        req.params.sid,
        req.params.cid
    ];
    const checkEnrollment = `SELECT * FROM ENROLLMENTS WHERE STUDENTID=? AND COURSEID=?`;
    db.query(checkEnrollment, values, (err, checkEnrollment) => {

        if (checkEnrollment && checkEnrollment.length > 0) {
            return res.status(200).json("yes");
        }
        else{
            return res.status(200).json("no");
        }

    })
}
