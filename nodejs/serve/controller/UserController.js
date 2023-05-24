
import { creatUserModel,getUsersModel } from "../models/User.js";
import bcrypt from "bcrypt"
import { nanoid } from "nanoid";
import { getTokenData, storeToken, updateToken } from "../models/ApiToken.js";


 async function  creatUser  (req,res) {
     const { name, email, password } = req.body;
     
     const hashPassword = await bcrypt.hash(password, 10);

     const user = creatUserModel({ name, email, hashPassword }, (response) => {
         return res.send(response.message)
     });
 }

function getUser(req, res) {

    const token = req.headers['authorization'];;
    console.log("token",token)
    const getUser = getUsersModel(req, (response) => {
        res.send(response.result)
    });

 }

const loginUser = async (req, res) => {

    const { email, password } = req.body
    const getUser =  getUsersModel(email, async (response) => {

        if (response.result.length === 0) {
            return res.status(404).json({message:"User not found."})
        }
        else {
            const matchPassword = await bcrypt.compare(password, response.result[0].password)
            if (!matchPassword) {
                return res.status(400).json({message:"Invalid Credential"})
            }
            else {

                let token = nanoid()

                getTokenData(response.result[0].user_id, (response) => {

                    console.log("res",response.result.length)
                    if (response.result.length === 0) {
                        //add new user_id with token
                        let tokenStore = storeToken({ user_id: response.result[0].user_id, name: response.result[0].name, token: token }, (response) => {
                            if (response.result) {
                                return res.status(200).json({message:"Login Successfully",token:token})
                            }
                        })
                    } else {
                        // update in the existing token

                        let update = updateToken({ token: token, user_id: response.result[0].user_id, }, (response) => {
                            if (response.result) {
                                return res.status(200).json({message:"Login Successfully",token:token})
                            }
                        })
                        
                    }
                })

             
            }
        }
    })
    
}

export {
    creatUser,
    getUser,
    loginUser
};