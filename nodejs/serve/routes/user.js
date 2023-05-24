import express from "express";
const router = express.Router();
import { creatUser, getUser, loginUser } from "../controller/UserController.js"
import authMiddleware from "../middleware/auth.js";

// router.get('/home', (req, res) => {
//     return res.json({
//       home:"This is the home page"
//     })
// })

router.post('/user', creatUser);
router.get('/user',authMiddleware, getUser)
router.post('/login',loginUser)

export default router;