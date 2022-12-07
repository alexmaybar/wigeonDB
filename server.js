const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

var cors = require("cors");

const mariadb = require("mariadb");
const { Console } = require("console");
//Create connection with mariadb
//Each user will need to enter in their username, database, and password
//These are left blank
const pool = mariadb.createPool({
  host: "localhost",
  port: 3306,
  user: "bea54577",
  database: "bea54577",
  password: "Chuckboi1!",
  connectionLimit: 5,
});

const app = express();
app.use(cors());

const port = 3000;

//set Static Folder
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

//Allow request from Angular
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  //Request methods u wish to allow

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  //Request header you widht to allow

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type"
  );
  //Pass to next Layer of middleware

  next();
});

//Get Clients - GET request
app.get("/api/query", async (req, res, next) => {
  try {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(req.headers.query);
      //console.log(JSON.stringify(rows));
      res.send(JSON.stringify(rows));
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  } catch {
    res.send("error");      //const rows = await conn.query(req.headers.query);

  }
});

app.get("/api/addInstructor", async (req, res, next) => {
  try {
    let conn;
    try {
      conn = await pool.getConnection();

      const res = await conn.query("INSERT INTO Instructor (email, first_name, last_name, desired_load) VALUES (?,?,?,?)", [
        req.headers.email,
        req.headers.first_name,
        req.headers.last_name,
        req.headers.desired_load,
      ]);
      console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

      res.send("Done");
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  } catch {
    res.send("error");
  }
});

app.get("/api/addCourse", async (req, res, next) => {
    try {
      let conn;
      try {
        conn = await pool.getConnection();
  
        const res = await conn.query("INSERT INTO Course (course_id, department, course_title, num_credits) VALUES (?,?,?,?)", [
          req.headers.course_id,
          req.headers.department,
          req.headers.course_title,
          req.headers.num_credits,
        ]);
        console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
  
        res.send(res);
      } catch (err) {
        throw err;
      } finally {
        if (conn) return conn.end();
      }
    } catch {
      res.send("error");
    }
  });


app.listen(port, () => {
  console.log("Server start on port " + port);
});
