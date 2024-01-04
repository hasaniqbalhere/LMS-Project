import db from "../index.js";


///create new user (signup)
export const createuser = async (req,res)=>{
    const  values=[
        req.body.userid,///USERID
        req.body.username,///USERNAME
        req.body.email,///EMAIL
        req.body.password,////PASSWORD
        req.body.usertype
    ]
    const q= `INSERT INTO USER( userid,username, email, password,usertype) VALUES (?)`;
    db.query(q,[values],(err,data)=>{
        if(err) return res.send(err);
        return res.json("User has been created successfully");
    })
}

///login user 
export const login = async (req,res)=>{
    try{

    
    const  values=[
        req.body.username,///USERNAME
        req.body.password,////PASSWORD
    ]
    // Check if the user with the provided username and password exists
    const checkUserQuery = 'SELECT * FROM USER WHERE USERNAME = ? AND PASSWORD=?';
    db.query(checkUserQuery, values, (err, userResult) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Error checking User");
        }

        if (!userResult || userResult.length === 0) {
            return res.status(404).json("Incorrect Username or Password");
        }
        else{
            res.status(200).json(userResult)
        }
    });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Error checking user");
    }
}
///find student id from username
export const store = async (req,res)=>{
    ///USER FOUND
    const value= req.params.id
        //  localStorage.setItem('username', values[0]);
        const q=`SELECT S.STUDENTID FROM STUDENTS S INNER JOIN USER U ON S.USERID=U.USERID WHERE U.USERNAME= ?`;
         db.query(q,value,(err, stdresult) =>{
            return res.status(200).json(stdresult);
         });
}

///find teacher id from username
export const tid = async (req,res)=>{
    ///USER FOUND
    const value= req.params.id
        //  localStorage.setItem('username', values[0]);
        const q=`SELECT T.TEACHERID FROM TEACHERS T INNER JOIN USER U ON T.USERID=U.USERID WHERE U.USERNAME= ?`;
         db.query(q,value,(err, tresult) =>{
           // localStorage.setItem('studentID',stdresult[0].STUDENTID);
            //res.json(stdresult);
            return res.status(200).json(tresult);
         });
}





///update user password
export const updateuser = async(req,res)=>{
    const id=req.params.id;
    const val=req.body.password;
    const q=`UPDATE USER SET PASSWORD=? WHERE EMAIL=?`;
    db.query(q,[val,id],(err,data)=>{
        if(err) return res.send(err);
        return res.send("User Password updated successfully");
    })
     
 }

 ///DELETE User
 export const deleteuser = async(req,res)=>{
    const did= req.params.id;
    const q=`DELETE FROM USER WHERE USERID=?`;
    db.query(q,[did],(err,data)=>{
        if(err) return res.send(err);
        return res.json("User has been deleted successfully");
    })
     
 }

 //Get all users
 ///get all users
 export const GETALL = async(req,res)=>{
    try{
        const q='SELECT * FROM USER WHERE USERTYPE!=?';
        db.query(q,"Admin",(err,data)=>{
            if(err) return res.send(err);
            return res.send(data);
        })
    }
    catch(err){
     res.status(500).json(err);
    }
}

