const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const fs = require("fs");
const mariadb = require("mariadb");
const path = require("path");
const port = 3000;

//Create connection with mariadb
//Each user will need to enter in their username, database, and password
//These are left blank
const pool = mariadb.createPool({
  host: "localhost",
  port: 3306,
  user: "ama84874",
  database: "wigeon",
  password: "Eagles_02",
  connectionLimit: 5,
  multipleStatements: true,
});

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use((req, res, next) => {
  //Allow request from Angular
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
    res.send("error"); //const rows = await conn.query(req.headers.query);
  }
});

app.get("/api/addInstructor", async (req, res, next) => {
  try {
    let conn;
    try {
      conn = await pool.getConnection();

      const res = await conn.query(
        "INSERT INTO Instructor (email, last_name, first_name, desired_load) VALUES (?,?,?,?)",
        [
          req.headers.email,
          req.headers.last_name,
          req.headers.first_name,
          req.headers.desired_load,
        ]
      );
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

      const res = await conn.query(
        "INSERT INTO Course (course_id, department, course_title, num_credits) VALUES (?,?,?,?)",
        [
          req.headers.course_id,
          req.headers.department,
          req.headers.course_title,
          req.headers.num_credits,
        ]
      );
      console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

      res.send({ res: res });
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  } catch {
    res.send("error");
  }
});

app.get("/api/addNonInstruct", async (req, res, next) => {
  try {
    let conn;
    try {
      conn = await pool.getConnection();

      const res = await conn.query(
        "INSERT INTO Non_Instruct (instructor_id, task, semester, year, ni_teu) VALUES (?,?,?,?,?)",
        [
          req.headers.instructor_id,
          req.headers.task,
          req.headers.teu,
          req.headers.semester,
          req.headers.year,
        ]
      );
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

app.get("/api/addSection", async (req, res, next) => {
  try {
    let conn;
    try {
      conn = await pool.getConnection();

      const response = await conn.query(
        "INSERT INTO Section (semester, section_num, year, course_id, class_mod) VALUES (?,?,?,?,?)",
        [
          req.headers.semester,
          req.headers.section_num,
          req.headers.year,
          req.headers.course_id,
          req.headers.mod,
        ]
      );
      console.log(response); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

      res.send(response);
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  } catch {
    res.send("error");
  }
});

app.get("/api/bronzeAge", async (req, res, next) => {
  try {
    let conn;
    try {
      conn = await pool.getConnection();

      let script = "";
      fs.readFile("./queries/Bronze Age.sql", async (err, inputD) => {
        if (err) throw err;
        let script = inputD.toString();

        var LINE_EXPRESSION = /\r\n|\n\r|\n|\r/g; // expression symbols order is very important

        script = script.replace(LINE_EXPRESSION, "");
        script = script.replace("\t", "");

        //console.log(script);

        const response = await conn.query(script, function (err, results) {
          if (err) {
            throw err;
          }
          for (let i = 0; i < results.length; i++) {
            console.log(results[i]); // [create1]
          }
        });

        res.send({ response: "Success" });
      });
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
    }
  } catch {
    res.send({ response: "Error" });
  }
});

app.get("/api/phase1", async (req, res, next) => {
  try {
    let conn;
    try {
      conn = await pool.getConnection();

      let script = "";
      fs.readFile("./queries/Phase 1 Script.sql", async (err, inputD) => {
        if (err) throw err;
        let script = inputD.toString();

        var LINE_EXPRESSION = /\r\n|\n\r|\n|\r/g; // expression symbols order is very important

        script = script.replace(LINE_EXPRESSION, "");
        script = script.replace("\t", "");

        const response = await conn.query(script, function (err, results) {
          if (err) {
            throw err;
          }
          for (let i = 0; i < results.length; i++) {
            console.log(results[i]); // [create1]
          }
        });

        res.send({ response: "Success" });
      });
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
    }
  } catch {
    res.send({ response: "Error" });
  }
});

app.get("/api/phase2", async (req, res, next) => {
  try {
    let conn;
    try {
      conn = await pool.getConnection();

      let script = "";
      fs.readFile("./queries/Phase 2 Script.sql", async (err, inputD) => {
        if (err) throw err;
        let script = inputD.toString();

        var LINE_EXPRESSION = /\r\n|\n\r|\n|\r/g; // expression symbols order is very important

        script = script.replace(LINE_EXPRESSION, "");
        script = script.replace("\t", "");

        const response = await conn.query(script, function (err, results) {
          if (err) {
            throw err;
          }
          for (let i = 0; i < results.length; i++) {
            console.log(results[i]); // [create1]
          }
        });

        res.send({ response: "Success" });
      });
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
    }
  } catch {
    res.send({ response: "Error" });
  }
});

app.get("/api/phase3", async (req, res, next) => {
  try {
    let conn;
    try {
      conn = await pool.getConnection();

      let script = "";
      fs.readFile("./queries/Phase 3 Script.sql", async (err, inputD) => {
        if (err) throw err;
        let script = inputD.toString();

        var LINE_EXPRESSION = /\r\n|\n\r|\n|\r/g; // expression symbols order is very important

        script = script.replace(LINE_EXPRESSION, "");
        script = script.replace("\t", "");

        const response = await conn.query(script, function (err, results) {
          if (err) {
            throw err;
          }
          for (let i = 0; i < results.length; i++) {
            console.log(results[i]); // [create1]
          }
        });

        res.send({ response: "Success" });
      });
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
    }
  } catch {
    res.send({ response: "Error" });
  }
});

app.get("/api/stoneAge", async (req, res, next) => {
  try {
    let conn;
    try {
      conn = await pool.getConnection();

      let script = "";
      fs.readFile("./queries/Stone Age.sql", async (err, inputD) => {
        if (err) throw err;
        let script = inputD.toString();

        var LINE_EXPRESSION = /\r\n|\n\r|\n|\r/g; // expression symbols order is very important

        script = script.replace(LINE_EXPRESSION, "");
        script = script.replace("\t", "");

        const response = await conn.query(script, function (err, results) {
          if (err) {
            throw err;
          }
          for (let i = 0; i < results.length; i++) {
            console.log(results[i]); // [create1]
          }
        });

        res.send({ response: "Success" });
      });
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
    }
  } catch {
    res.send({ response: "Error" });
  }
});

app.listen(port, () => {
  console.log("Server start on port " + port);
});
