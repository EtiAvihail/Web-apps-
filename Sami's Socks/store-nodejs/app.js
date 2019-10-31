// TODO - check works...

// TODO - wrap with try-catch

const express = require("express");
const uuid = require("uuid");
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
var fs = require("fs");
var cors = require("cors");
var cookieParser = require("cookie-parser");
const app = express();
var session = require("express-session");
var bodyParser = require("body-parser");
var helmet = require("helmet");
const userActivitylog = require("simple-node-logger").createSimpleFileLogger(
  "user_activity.log"
);
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(limiter);
// secure - false because it won't work on HTTP otherwise and we don't have certificates
/*app.use(session({
    secret: 'superultrastrongsecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        expires: 5 * 60 * 1000
    }
}));*/

let users = { admin: "admin" };
let currentSessions = {};
const port = 8000;

app.get("/start", (req, res) => {
  let sess = { uuid: uuid.v4(), M: 0 };
  sessions.push(sess);
  res.send(sess.uuid);
});

/*app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});*/

app.post("/logs", (req, res) => {
  try {
    var sessID = req.body.sessID;
    if (currentSessions[sessID] === "admin") {
      var logFile = fs.readFileSync("user_activity.log");
      var logsArray = logFile.toString().split("\n");
      res.status(200).send({ logs: logsArray });
    } else {
      res.status(401).send("No permissions");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/logger", (req, res) => {
  var log = req.body.log;
  userActivitylog.log("info", log);
  res.status(200).end();
});

app.post("/login", (req, res) => {
  var user = req.body.username;
  var password = req.body.password;
  var rememberMe = req.body.rememberMe;
  if (users[user] == password) {
    userActivitylog.log("info", user + ": Login");
    var sess_id = uuid.v4();
    console.log("user " + user + " logged in");
    currentSessions[sess_id] = user;
    if (!rememberMe) {
      setTimeout(function() {
        // server side session expiration
        console.log("deleting session id - " + sess_id);
        delete currentSessions[sess_id];
      }, 5 * 60 * 1000);
    }
    res.status(201).send({ uuid: sess_id });
  } else {
    console.log("unsuccesful login attempt");
    res.status(400).send({ errors: ["Invalid email or password"] });
  }
});

app.post("/register", (req, res) => {
  var user = req.body.username;
  var password = req.body.password;
  if (!user) {
    console.log("invalid username");
    res.status(401).send({ errors: ["Invalid username"] });
  }
  if (users[user]) {
    console.log("user already exist");
    res.status(401).send({ errors: ["Username already exists"] });
  } else {
    userActivitylog.log("info", user + ": register");
    console.log("creating user " + user);
    users[user] = password;
    res.status(200).end();
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
