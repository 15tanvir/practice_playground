import express from "express";
const router = express.Router();

router.get('/home', (req, res) => {
    return res.json({
      home:"This is the home page"
    })
})


export default router;