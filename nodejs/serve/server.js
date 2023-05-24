import express from "express";
import mysql from "mysql";
import cors from "cors";
import path from 'path';
import indexRouter from './routes/index.js';
import userRouter from './routes/user.js';

const app = express();

app.use(express.json());
app.use(cors());




const db = mysql.createConnection({
    
    host: "localhost",
    user: "root",
    password: "root",
    database:"crud"
})


app.use('/', indexRouter);

app.use('/api', userRouter);


app.get('/', (req, res) => {
    const sql = "SELECT * FROM students";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error" });
        return res.json(result);
    })
})

 

app.post('/student', (req, res) => {
    const sql = "INSERT INTO students (`name`,`address`,`father_name`,`interest`,`created_at`) VALUES (?)";
    // return req;
    console.log("req",req.body)
    const values = [
        req.body.name,
        req.body.address,
        req.body.father_name,
        req.body.interest,
        new Date()
    ]
    console.log("values",values)
    db.query(sql,[values], (err, result) => {
        if (err) return res.json({ Message: "error" });
        
        return res.send("Submitted Successfully.")
        return res.json(result);

    })
})

app.post('/student/addmarks/:std_id', (req, res) => {
    console.log(req.params)

    const sql = "insert into scorecard set ?";

    const marks = [{
        std_id: req.params.std_id,
        python: req.body.python,
        javascript: req.body.javascript,
        c: req.body.c,
        java: req.body.java
    }]
    
    db.query(sql, marks, (err, result) => {
        if (err) return res.json({ Message: "Unable to add scores" });

        return res.send("Scores added successfully.")

        

    })

    // return res.send(req.params);
})

// fetching score card data

app.get('/scorecard/:std_id', (req, res) => {
    
    let sql = `select python ,c,java,javascript from scorecard where std_id =${req.params.std_id}`;

    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "error" });
        
        return res.json(result);
    })
})

app.get('/student/:std_id', (req, res) => {
    
    let sql = `select stud.id , stud.name ,stud.father_name, stud.interest, score.python ,score.javascript, score.c, score.java from students as stud inner join scorecard as score on stud.id=score.std_id where stud.id=${req.params.std_id}`

    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error" });
        return res.json(result);
    })
    
})

app.listen(8081, () => {
    console.log("listening")
})