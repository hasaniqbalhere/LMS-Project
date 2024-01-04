import db from "../index.js"

//add course category
export const createcategory = async (req, res) => {
    const category = req.body.category_name;
    if (!category) {
        return res.status(400).send("Category name are required");
    }

    const insertcategory = `INSERT INTO CATEGORY (CATEGORY_NAME) VALUES (?)`;
    await db.query(insertcategory, [category]);
    return res.json("Category has been created successfully");
}

///delete Category

export const deleteCategory = async (req, res) => {
    try {
        const category_name = req.params.categoryname; // Assuming courseId is passed in the URL as a parameter

        if (!category_name) {
            return res.status(400).send("Course ID is required");
        }

        // Check if the course with the provided COURSE_ID exists
        const checkCategoryQuery = 'SELECT * FROM CATEGORY WHERE CATEGORY_NAME = ?';
        db.query(checkCategoryQuery, [category_name], (err, categoryResult) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error checking category");
            }

            if (!categoryResult || categoryResult.length === 0) {
                return res.status(404).json("Category with the provided Name not found");
            }

            // The course exists, proceed to delete the course
            const deleteCategoryQuery = 'DELETE FROM CATEGORY WHERE CATEGORY_NAME = ?';

            db.query(deleteCategoryQuery, [category_name], (err, data) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json("Error deleting course");
                }

                return res.json("Category has been deleted successfully");
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error deleting cateory");
    }
};


/// create new course

export const createcourse = async (req, res) => {
    try {
        const values = [
            req.body.courseid,
            req.body.coursetitle,
            req.body.coursedescription,
            req.body.courselevel,
            req.body.duration,
            req.body.thumbnail,
            req.body.teacherid,
            req.body.categoryid
        ];

        if (!values.every((value) => value !== undefined && value !== null)) {
            return res.status(400).send("All attributes are required");
        }

        // Check if the teacher with the provided TEACHERID exists
        const checkTeacherQuery = 'SELECT * FROM TEACHERS WHERE TEACHERID = ?';
        db.query(checkTeacherQuery, [req.body.teacherid], (err, teacherResult) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error checking teacher");
            }

            if (!teacherResult || teacherResult.length === 0) {
                return res.status(404).send("Teacher with the provided ID not found");
            }

            // Check if the category with the provided CATEGORYID exists
            const checkCategoryQuery = 'SELECT * FROM CATEGORY WHERE CATEGORYID = ?';
            db.query(checkCategoryQuery, [req.body.categoryid], (err, categoryResult) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Error checking teacher");
                }

                if (!categoryResult || categoryResult.length === 0) {
                    return res.status(404).send("Category with the provided ID not found");
                }


                // The teacher exists, proceed to insert the course
                const insertCourseQuery = `INSERT INTO COURSE (COURSEID,COURSE_TITLE, DESCRIPTION, COURSE_LEVEL,DURATION,THUMBNAIL, TEACHERID, CATEGORY_ID)
                VALUES (?, ?, ?, ?, ?, ? ,? ,?)`;
                db.query(insertCourseQuery, values, (err, data) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send("Error creating course");
                    }

                    return res.json("Course has been created successfully");
                });
            });
        })
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Error creating course");
    }
};

///delete course
export const deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId; // Assuming courseId is passed in the URL as a parameter
        if (!courseId) {
            return res.status(400).send("Course ID is required");
        }

        // Check if the course with the provided COURSE_ID exists
        const checkCourseQuery = 'SELECT * FROM COURSE WHERE COURSEID = ?';
        db.query(checkCourseQuery, [courseId], (err, courseResult) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error checking course");
            }

            if (!courseResult || courseResult.length === 0) {
                return res.status(404).send("Course with the provided ID not found");
            }

            // The course exists, proceed to delete the course
            const deleteCourseQuery = 'DELETE FROM COURSE WHERE COURSEID = ?';

            db.query(deleteCourseQuery, [courseId], (err, data) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Error deleting course");
                }

                return res.json("Course has been deleted successfully");
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error deleting course");
    }
};

///UPDATE COURSE
export const updateCourse = async (req, res) => {
    try {
        const courseId = req.body.courseId;
        const coursetitle = req.body.coursetitle;
        const coursedescription = req.body.coursedescription;
        const courselevel = req.body.courselevel;
        const duration = req.body.duration;
        const thumbnail = req.body.thumbnail;
        // const teacherid = req.body.teacherid;
        // const categoryid = req.body.categoryid;

        if (!courseId) {
            return res.status(400).send("Course ID is required");
        }

        // Check if the course with the provided COURSE_ID exists
        const checkCourseQuery = 'SELECT * FROM COURSE WHERE COURSEID = ?';
        db.query(checkCourseQuery, [courseId], (err, courseResult) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error checking course");
            }

            if (!courseResult || courseResult.length === 0) {
                return res.status(404).json("Course with the provided ID not found");
            }

            // The course exists, proceed to update the course
            if (coursetitle) {
                const q = `UPDATE COURSE SET COURSE_TITLE=? WHERE COURSEID=?`;
                db.query(q, [coursetitle, courseId], (err, dd) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send("Internal Server Error");
                    }
                    // You can choose to send a response here if needed
                });
            }
            if (coursedescription) {
                const q = `UPDATE COURSE SET DESCRIPTION=? WHERE COURSEID=?`;
                db.query(q, [coursetitle, coursedescription], (err, dd) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send("Internal Server Error");
                    }
                    // You can choose to send a response here if needed
                });
            }
            if (courselevel) {
                const q = `UPDATE COURSE SET COURSE_LEVEL=? WHERE COURSEID=?`;
                db.query(q, [coursetitle, courselevel], (err, dd) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send("Internal Server Error");
                    }
                    // You can choose to send a response here if needed
                });
            }
            if (duration) {
                const q = `UPDATE COURSE SET DURATION=? WHERE COURSEID=?`;
                db.query(q, [duration, courseId], (err, dd) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send("Internal Server Error");
                    }
                    // You can choose to send a response here if needed
                });
            }
            if (thumbnail) {
                const q = `UPDATE COURSE SET THUMBNAIL=? WHERE COURSEID=?`;
                db.query(q, [thumbnail, courseId], (err, dd) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send("Internal Server Error");
                    }
                    // You can choose to send a response here if needed
                });
            }
            // if (teacherid) {
            //     const q = `UPDATE COURSE SET TEACHERID=? WHERE COURSEID=?`;
            //     db.query(q, [teacherid, courseId], (err, dd) => {
            //         if (err) {
            //             console.error(err);
            //             return res.status(500).send("Internal Server Error");
            //         }
            //         // You can choose to send a response here if needed
            //     });
            // }
            // if (categoryid) {
            //     const q = `UPDATE COURSE SET CATEGORY_ID=? WHERE COURSEID=?`;
            //     db.query(q, [categoryid, courseId], (err, dd) => {
            //         if (err) {
            //             console.error(err);
            //             return res.status(500).send("Internal Server Error");
            //         }
            //         // You can choose to send a response here if needed
            //     });
            // }

            return res.status(200).json("Course updated successfully");
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error updating course");
    }
};
////GET CATEGORY BY ID
export const getcategory = async (req, res) => {
    try {
        const name = req.params.id
        const q = `SELECT C.CATEGORY_NAME FROM CATEGORY C INNER JOIN COURSE CR ON C.CATEGORYID=CR.CATEGORY_ID WHERE C.CATEGORYID=${name}`;
        db.query(q, (err, data) => {
            if (err) return res.send(err);
            return res.send(data);
        })
    }
    catch (err) {
        res.status(500).json(err);
    }
}

//GET COURSE BY ID
export const getcoursebyid = async (req, res) => {
    try {
        const name = req.params.id
        const q = `SELECT * FROM COURSE WHERE COURSEID=?`;
        db.query(q, name, (err, data) => {
            if (err) return res.send(err);
            return res.send(data);
        })
    }
    catch (err) {
        res.status(500).json(err);
    }
}

////GET ALL COURSES
export const GETALLC = async (req, res) => {
    try {
        const q = 'SELECT * FROM COURSE ORDER BY COURSEID DESC';
        db.query(q, (err, data) => {
            if (err) return res.send(err);
            return res.send(data);
        })
    }
    catch (err) {
        res.status(500).json(err);
    }
}
//get count of course
export const coursecount = async (req, res) => {
    try {
        const name = req.params.id
        const q = `SELECT COUNT(CATEGORY_ID) AS "COUNT" FROM COURSE WHERE CATEGORY_ID=? GROUP BY CATEGORY_ID`;
        db.query(q, name, (err, data) => {
            if (err) return res.send(err);
            return res.send(data);
        })
    }
    catch (err) {
        res.status(500).json(err);
    }
}
///GET ALL CATEGORIES
export const allcategory = async (req, res) => {
    try {
        const q = 'SELECT * FROM CATEGORY';
        db.query(q, (err, data) => {
            if (err) return res.send(err);
            return res.send(data);
        })
    }
    catch (err) {
        res.status(500).json(err);
    }
}


//create new module for course
export const createmodule = async (req, res) => {
    try {
        const values = [
            req.body.moduleid,
            req.body.courseid,
            req.body.moduletitle,
            req.body.moduledesc,
            req.body.content,
            req.body.order
        ];

        if (!values.every((value) => value !== undefined && value !== null)) {
            return res.status(400).send("All attributes are required");
        }

        // Check if the course with the provided COURSEID exists
        const checkcourse = 'SELECT * FROM COURSE WHERE COURSEID = ?';
        db.query(checkcourse, [req.body.courseid], (err, checkcourse) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error checking course");
            }

            if (!checkcourse || checkcourse.length === 0) {
                return res.status(404).send("Course with the provided ID not found");
            }
            // The course exists, proceed to insert the module
            const insertmoduleQuery = `INSERT INTO MODULE VALUES (?,?,?,?,?,?)`;
            db.query(insertmoduleQuery, values, (err, data) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Error creating module");
                }

                return res.json("module has been created successfully");
            });
        });
    }

    catch (error) {
        console.error(error);
        return res.status(500).send("Error creating course");
    }
};

// Update module
export const updateModule = async (req, res) => {
    try {
        const moduleId = req.body.moduleId; // Assuming moduleId is passed in the URL as a parameter

        if (!moduleId) {
            return res.status(400).send("Module ID is required");
        }

        // Check if the module with the provided MODULEID exists
        const checkModuleQuery = 'SELECT * FROM MODULE WHERE MODULEID = ?';
        db.query(checkModuleQuery, [moduleId], (err, moduleResult) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error checking module");
            }

            if (!moduleResult || moduleResult.length === 0) {
                return res.status(404).send("Module with the provided ID not found");
            }

            // The module exists, proceed to update the module
            const updateModuleQuery = `
                UPDATE MODULE
                SET
                    TITLE = ?,
                    DESCRIPTION = ?,
                    CONTENT = ?,
                    ORDERR = ?
                WHERE MODULEID = ?
            `;

            const values = [
                req.body.moduletitle || moduleResult[0].TITLE,
                req.body.moduledesc || moduleResult[0].DESCRIPTION,
                req.body.content || moduleResult[0].CONTENT,
                req.body.order || moduleResult[0].ORDERR,
                moduleId
            ];

            db.query(updateModuleQuery, values, (err, data) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Error updating module");
                }

                return res.json("Module has been updated successfully");
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error updating module");
    }
};

// Delete module
export const deleteModule = async (req, res) => {
    try {
        const moduleId = req.params.moduleId; // Assuming moduleId is passed in the URL as a parameter

        if (!moduleId) {
            return res.status(400).send("Module ID is required");
        }

        // Check if the module with the provided MODULEID exists
        const checkModuleQuery = 'SELECT * FROM MODULE WHERE MODULEID = ?';
        db.query(checkModuleQuery, [moduleId], (err, moduleResult) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error checking module");
            }

            if (!moduleResult || moduleResult.length === 0) {
                return res.status(404).send("Module with the provided ID not found");
            }

            // The module exists, proceed to delete the module
            const deleteModuleQuery = 'DELETE FROM MODULE WHERE MODULEID = ?';

            db.query(deleteModuleQuery, [moduleId], (err, data) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Error deleting module");
                }

                return res.json("Module has been deleted successfully");
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error deleting module");
    }
};

///GET MODULE BY ID
export const getmodulebyid = async (req, res) => {
    try {
        const name = req.params.id
        const q = `SELECT * FROM MODULE WHERE COURSEID=? ORDER BY ORDERR`;
        db.query(q, name, (err, data) => {
            if (err) return res.send(err);
            return res.send(data);
        })
    }
    catch (err) {
        res.status(500).json(err);
    }
}


//get count of module
export const modulecount = async (req, res) => {
    try {
        const name = req.params.id
        const q = `SELECT COUNT(COURSEID) AS "COUNT" FROM MODULE WHERE COURSEID=? GROUP BY COURSEID`;
        db.query(q, name, (err, data) => {
            if (err) return res.send(err);
            return res.send(data);

        })
    }
    catch (err) {
        res.status(500).json(err);
    }
}

///GET MODULES OF ONE TEEACHER
export const getmoduleofteacher = async (req, res) => {
    try {
        const name = req.params.id
        const q = `SELECT * FROM MODULE WHERE COURSEID IN (SELECT COURSEID FROM COURSE WHERE TEACHERID=?)`;
        db.query(q, name, (err, data) => {
            if (err) return res.send(err);
            return res.send(data);
        })
    }
    catch (err) {
        res.status(500).json(err);
    }
}

///ADMIN COURSES

export const admincourses = async (req, res) => {
    try {
        const q = `SELECT C.COURSEID, C.COURSE_TITLE, T.TEACHERNAME, COUNT(E.COURSEID) AS STUDENT_COUNT
        FROM COURSE C
        INNER JOIN TEACHERS T ON C.TEACHERID = T.TEACHERID
        LEFT JOIN ENROLLMENTS E ON C.COURSEID = E.COURSEID
        GROUP BY C.COURSEID, C.COURSE_TITLE, T.TEACHERNAME
        HAVING COUNT(E.COURSEID) > 0
        
        `;
        db.query(q, (err, data) => {
            if (err) return res.send(err);
            return res.send(data);
        })
    }
    catch (err) {
        res.status(500).json(err);
    }
}

// Assuming you have imported your database connection as 'db'

export const ROLLBACKMODULE = async (req, res) => {
    try {
        const action = 'DELETE';
        const selectQuery = `SELECT MODULEID, COURSEID, TITLE, DESCRIPTION, CONTENT, ORDERR FROM MODULE_LOG WHERE ACTION=? ORDER BY LOGID DESC LIMIT 1`;

        db.query(selectQuery, [action], (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error retrieving module log");
            }

            // Check if there is any data to rollback
            if (data.length === 0) {
                return res.status(404).send("No module log found to rollback");
            }

            const insertQuery = `INSERT INTO MODULE (MODULEID, COURSEID, TITLE, DESCRIPTION, CONTENT, ORDERR) VALUES (?,?,?,?,?,?)`;
            const moduleData = [data[0].MODULEID, data[0].COURSEID, data[0].TITLE, data[0].DESCRIPTION, data[0].CONTENT, data[0].ORDERR];

            db.query(insertQuery, moduleData, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Error rolling back module");
                }

                return res.json("Module has been rolled back successfully");
            });
        });
    } catch (err) {
        res.status(500).json(err);
    }
};






