import express, { response } from "express";
import pg from "pg";
const { Client } = pg;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 5000;

//Express js listen method to run project on http://localhost:5000
app.listen(PORT, console.log(`App is running on port ${PORT}`));

const client = new Client({
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "Jagdish@123",
});

client
    .connect()
    .then(console.log("database connected"))
    .catch((e) => console.log(e));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.get("/users", (req, res) => {
    client
        // console.log(req.query.uid)
        .query(
            `select * FROM pr_db.user_information WHERE user_id=$1 AND password=$2`,
            [req.query.uid, req.query.password]
        )
        .then((data) => res.json(data.rows));
});

app.get("/centers", (req, res) => {
    client
        .query("select * FROM pr_db.data_center_information")
        .then((data) => res.json(data.rows));
});

// app.post("/", (req, res) => {
//     client
//         .query("INSERT INTO table1(id, name) VALUES ($1, $2)", [req.body.id, req.body.name])
//         // .query(`INSERT INTO table1 VALUES(${req.body.id}, ${req.body.name})`)
//         .then((data) => console.log(data.rows))
//         .catch((err) => console.log(err));
// });
