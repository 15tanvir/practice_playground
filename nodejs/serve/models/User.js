import db from "../db.js";


export const creatUserModel = (props, callback) => {
    const { name, email, hashPassword } = props;
    const sql = "INSERT INTO user (`name`,`email`,`password`,`created_at`) VALUES (?)";
    const values = [
        name,
        email,
        hashPassword,
        new Date()
    ]
    db.query(sql, [values], (err, result) => {
        if (err) {
            return callback({ message: "Error occurred while inserting data." });
        }

        return callback({ message: "Successfully Submitted." });

    })


}


export const getUsersModel = (props, callback) => {
    if (typeof(props) === String) {
        let sql = "SELECT * FROM user WHERE email=?"


        db.query(sql, [props], (err, result) => {
            if (err) {
                return callback({ message: "No users." });
            }
            return callback({ result: result });
        })
    } else {
        let sql = "SELECT * FROM user"


        db.query(sql, (err, result) => {
            if (err) {
                return callback({ message: "No users." });
            }
            return callback({ result: result });
        })
    }


}





