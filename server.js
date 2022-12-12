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
const credentials = {
  user: "",
  database: "",
  password: "",
};

const tPool = mariadb.createPool({
  host: "localhost",
  port: 3306,
  user: credentials.user,
  database: credentials.database,
  password: credentials.password,
  connectionLimit: 5,
});

const pool = mariadb.createPool({
  host: "localhost",
  port: 3306,
  user: credentials.user,
  database: credentials.database,
  password: credentials.password,
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

async function createTriggerFromFile(fileName) {
  let conn;
  try {
    conn = await tPool.getConnection();
    fs.readFile("./queries/" + fileName, async (err, inputD) => {
      if (err) throw err;
      let script = inputD.toString();

      var LINE_EXPRESSION = /\r\n|\n\r|\n|\r/g; // expression symbols order is very important

      script = script.replace(LINE_EXPRESSION, " ");
      script = script.replace("\t", "");

      const response = await conn.query(script, function (err, results) {
        if (err) {
          throw err;
        }
        console.log(results);
      });
      conn.end();
    });
  } catch (err) {
    console.log(err);
    conn.end();
    throw err;
  }
}

async function createTriggers() {
  await createTriggerFromFile("interim_AA_BB_only_insert.sql");
  await createTriggerFromFile("interim_AA_BB_only_update.sql");
  await createTriggerFromFile("no_overlap_insert.sql");
  await createTriggerFromFile("no_overlap_update.sql");
}

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
  let conn;
  try {
    conn = await pool.getConnection();

    const response = await conn.query(
      "INSERT INTO Instructor (email, last_name, first_name, desired_load) VALUES (?,?,?,?)",
      [
        req.headers.email,
        req.headers.last_name,
        req.headers.first_name,
        req.headers.desired_load * 3.4,
      ]
    );
    res.send({ response: "Success" });
    //console.log({ response: "Success", output: response }); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    conn.end();
  } catch (err) {
    //console.log(err);
    res.send({ response: err.text });
    conn.end();
  }
});

app.get("/api/addCourse", async (req, res, next) => {
  let conn;
  try {
    conn = await pool.getConnection();

    const response = await conn.query(
      "INSERT INTO Course (course_id, department, course_title, num_credits) VALUES (?,?,?,?)",
      [
        req.headers.course_id,
        req.headers.department,
        req.headers.course_title,
        req.headers.num_credits,
      ]
    );
    res.send({ response: "Success" });
    //console.log({ response: "Success", output: response }); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    conn.end();
  } catch (err) {
    //console.log(err);
    res.send({ response: err.text });
    conn.end();
  }
});

app.get("/api/addNonInstruct", async (req, res, next) => {
  let conn;
  try {
    conn = await pool.getConnection();

    const response = await conn.query(
      "INSERT INTO Non_Instruct (instructor_id, task, semester, year, ni_teu) VALUES (?,?,?,?,?)",
      [
        req.headers.instructor_id,
        req.headers.task,
        req.headers.semester,
        req.headers.year,
        req.headers.teu,
      ]
    );
    res.send({ response: "Success" });
    //console.log({ response: "Success", output: response }); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    conn.end();
  } catch (err) {
    //console.log(err);
    res.send({ response: err.text });
    conn.end();
  }
});

app.get("/api/addSection", async (req, res, next) => {
  let conn;
  try {
    conn = await pool.getConnection();

    let section_id =
      req.headers.course_id +
      "0" +
      req.headers.section_num +
      req.headers.year.charAt(2) +
      req.headers.year.charAt(3);
    let response = await conn.query(
      "INSERT INTO Section (section_id, semester, section_num, year, course_id, class_mod) VALUES (?,?,?,?,?,?)",
      [
        section_id,
        req.headers.semester,
        req.headers.section_num,
        req.headers.year,
        req.headers.course_id,
        req.headers.mod,
      ]
    );
    res.send({ response: "Success" });
    //console.log({ response: "Success", output: response }); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    conn.end();
  } catch (err) {
    //console.log(err);
    res.send({ response: err.text });
    conn.end();
  }
});

app.get("/api/bronzeAge", async (req, res, next) => {
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
          //console.log(results[i]); // [create1]
        }
      });
    });
    res.send({ response: "Success" });
    //console.log({ response: "Success", output: response }); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    conn.end();
  } catch (err) {
    //console.log(err);
    res.send({ response: err.text });
    conn.end();
  }
});

app.get("/api/phase1", async (req, res, next) => {
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

      await createTriggers();

      res.send({ response: "Success" });
      //console.log({ response: "Success", output: response }); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
      conn.end();
    });
  } catch (err) {
    //console.log(err);
    res.send({ response: err.text });
    conn.end();
  }
});

app.get("/api/phase2", async (req, res, next) => {
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
      await createTriggers();

      res.send({ response: "Success" });

      //console.log({ response: "Success", output: response }); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
      conn.end();
    });
  } catch (err) {
    //console.log(err);
    res.send({ response: err.text });
    conn.end();
  }
});

app.get("/api/phase3", async (req, res, next) => {
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

      await createTriggers();

      res.send({ response: "Success" });
      //console.log({ response: "Success", output: response }); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
      conn.end();
    });
  } catch (err) {
    //console.log(err);
    res.send({ response: err.text });
    conn.end();
  }
});

app.get("/api/phase4", async (req, res, next) => {
  let conn;
  try {
    conn = await pool.getConnection();

    let script = "";
    fs.readFile("./queries/Phase 4 Script.sql", async (err, inputD) => {
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

      await createTriggers();

      res.send({ response: "Success" });
      //console.log({ response: "Success", output: response }); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
      conn.end();
    });
  } catch (err) {
    //console.log(err);
    res.send({ response: err.text });
    conn.end();
  }
});

app.get("/api/phase5", async (req, res, next) => {
  let conn;
  try {
    conn = await pool.getConnection();

    let script = "";
    fs.readFile("./queries/Phase 5 Script.sql", async (err, inputD) => {
      if (err) throw err;
      let script = inputD.toString();

      var LINE_EXPRESSION = /\r\n|\n\r|\n|\r/g; // expression symbols order is very important

      script = script.replace(LINE_EXPRESSION, " ");
      script = script.replace("\t", "");

      const response = await conn.query(script, function (err, results) {
        if (err) {
          throw err;
        }
        for (let i = 0; i < results.length; i++) {
          console.log(results[i]); // [create1]
        }
      });

      await createTriggers();

      res.send({ response: "Success" });
      //console.log({ response: "Success", output: response }); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
      conn.end();
    });
  } catch (err) {
    //console.log(err);
    res.send({ response: err.text });
    conn.end();
  }
});

app.get("/api/stoneAge", async (req, res, next) => {
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
      //console.log({ response: "Success", output: response }); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
      conn.end();
    });
  } catch (err) {
    //console.log(err);
    res.send({ response: err.text });
    conn.end();
  }
});

app.get("/api/deleteRecord", async (req, res, next) => {
  let conn;
  try {
    conn = await pool.getConnection();
    let response;

    if (req.headers.table == "Instructor") {
      response = await conn.query(
        "DELETE FROM Instructor WHERE instructor_id = ?",
        [req.headers.key]
      );
    } else if (req.headers.table == "Course") {
      response = await conn.query("DELETE FROM Course WHERE course_id = ?", [
        req.headers.key,
      ]);
    } else if (req.headers.table == "Section") {
      response = await conn.query("DELETE FROM Section WHERE section_id = ?", [
        req.headers.key,
      ]);
    } else if (req.headers.table == "Non_Instruct") {
      response = await conn.query(
        "DELETE FROM Non_Instruct WHERE non_instruct_id = ?",
        [req.headers.key]
      );
    }

    res.send({ response: "Delete Success" });
    conn.end();
  } catch (err) {
    //console.log(err);
    res.send({ response: err.text });
    conn.end();
  }
});

app.get("/api/assignInstructor", async (req, res, next) => {
  let conn;
  try {
    conn = await pool.getConnection();
    conn.beginTransaction();
    let response;
    if (req.headers.n == "delete") {
      response = await conn.query(
        "DELETE FROM Teaches WHERE section_id = ? AND instructor_id = ?",
        [req.headers.s, req.headers.o]
      );
    } else if (req.headers.o == req.headers.n) {
      res.send({ response: "Instructor Already Assigned to Section" });
    } else {
      response = await conn.query(
        "DELETE FROM Teaches WHERE section_id = ? AND instructor_id = ?; INSERT INTO Teaches (section_id, instructor_id) VALUES (?,?);",
        [req.headers.s, req.headers.o, req.headers.s, req.headers.n]
      );
    }
    res.send({ response: "Assign Instructor Success" });
    conn.commit();
    conn.end();
  } catch (err) {
    conn.rollback();
    res.send({ response: err.text });
    conn.end();
  }
});

app.get("/api/update", async (req, res, next) => {
  let conn;
  try {
    conn = await pool.getConnection();
    conn.beginTransaction();
    let response;
    let object = JSON.parse(req.headers.object);
    if (req.headers.table == "Instructor") {
      response = await conn.query(
        "UPDATE Instructor SET first_name = ?, last_name = ?, email = ?, desired_load = ? WHERE instructor_id = ?",
        [
          object.first_name,
          object.last_name,
          object.email,
          object.desired_load * 3.4,
          object.instructor_id,
        ]
      );
    } else if (req.headers.table == "Course") {
      response = await conn.query(
        "UPDATE Course SET course_title = ?, department = ?, num_credits = ? WHERE course_id = ?",
        [
          object.course_title,
          object.department,
          object.num_credits,
          object.course_id,
        ]
      );
    } else if (req.headers.table == "Section") {
      response = await conn.query(
        "UPDATE Section SET section_num = ?, semester = ?, year = ?, class_mod = ? WHERE section_id = ?",
        [
          object.section_num,
          object.semester,
          object.year,
          object.class_mod,
          object.section_id,
        ]
      );
    } else if (req.headers.table == "Non_Instruct") {
      response = await conn.query(
        "UPDATE Non_Instruct SET task = ?, instructor_id = ?, ni_teu = ?, semester = ?, year = ? WHERE non_instruct_id = ?",
        [
          object.task,
          object.instructor_id,
          object.ni_teu,
          object.semester,
          object.year,
          object.non_instruct_id,
        ]
      );
    }

    res.send({ response: "Success" });
    //console.log({ response: "Success", output: response }); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    conn.commit();
    conn.end();
  } catch (err) {
    //console.log(err);
    res.send({ response: err.text });
    conn.rollback();
    conn.end();
  }
});

app.listen(port, () => {
  console.log("Server start on port " + port);
});
