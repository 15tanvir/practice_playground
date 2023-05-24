import { verifyUserToken } from "../models/ApiToken.js";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];


    //check tokem is available or not
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    else {
        verifyUserToken(token, (response) => {

            if (response.result.length !== 0) {
                 // if the user is authenticated                
                next();
            }
            else {
                // if the given token doesnot match to the token present in database.
                res.send("Invalid Token")
            }
        })
    }

    //if token is  present in the header. 
    // now needs to verify the token

}

export default authMiddleware;