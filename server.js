const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

var cors = require('cors')


const mariadb = require('mariadb');
//Create connection with mariadb
//Each user will need to enter in their username, database, and password
//These are left blank
const pool = mariadb.createPool({
     host: 'localhost', 
     port: 3306,
     user:'ama84874', 
     database:'ama84874',
     password: 'Eagles_02',
     connectionLimit: 5
});

const app = express();
app.use(cors()) 


const port = 3000;

//set Static Folder
app.use(express.static(path.join(__dirname, 'public'))) ;
app.use(bodyParser.json());

//Allow request from Angular
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    //Request methods u wish to allow
    
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    //Request header you widht to allow
    
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    //Pass to next Layer of middleware
   
 next();
})

//Get Clients - GET request
app.get('/api/query', async (req, res, next) => {
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
        res.send("error")
    }
});

app.listen(port, () => {
    console.log('Server start on port ' + port);
});