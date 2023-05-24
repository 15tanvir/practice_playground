import db from "../db.js";



// creating the new row 
export const storeToken = (props, callback) => {
    const { user_id, name, token } = props
    const sql = "INSERT INTO api_token (`user_id`,`name`,`type`,`token`,`created_at`) VALUES (?)";
    const values = [
        user_id,
        name,
        "bearer",
        token,
        new Date()
    ]
    db.query(sql, [values], (err, result) => {
        if (err) {
            return callback({ message: "Error occurred while inserting data." });
        }
        return callback({ result: result });

    })
}


// updating the token in the existing the row
export const updateToken = (props, callback) => {
    console.log("props",props)
    let sql = 'UPDATE api_token SET token = ?  WHERE user_id = ?';
    const { token, user_id } = props
    const values = [
        token,
        user_id
    ]
    db.query(sql, values, (err, result) => {
        if (err) {
            return callback({ message: "No data found" });
        }
        return callback({ result: result });

    })
}


//fetching the data with respect to user_id
export const getTokenData = (props, callback) => {

    let sql = "SELECT * FROM api_token where user_id=?";
    const user_id = [props];
    db.query(sql, [user_id], (err, result) => {
        if (err) {
            return callback({ message: "No data found" });
        }
        return callback({ result: result });

    })
}


// verifying the token here 
export const verifyUserToken = (props, callback) => {
    let sql = "select u.user_id,u.name,u.email from user as u inner join api_token as api on u.user_id=api.user_id where api.token=?";
    let values = props;
    db.query(sql, [values], (err, result) => {
        if (err) {
            return callback({ message: "No data found" });
        }
        return callback({ result: result });


    })
}