require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const controllers = require("./controllers");
const TimeControllers = require("./controllers/SumTimeFeedback");
const PlanedTimeControllers = require("./controllers/SumTime");

const ToDoRouter = require("./routes/ToDoList.js");
const NotToDoRouter = require("./routes/NotToDoList");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PATCH", "DELETE"],
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", controllers.login);
app.post("/logout", controllers.logout);
app.post("/register", controllers.register);
app.post("/user", controllers.user);
app.post("/theme", controllers.theme);
app.get("/alluser", controllers.alluser);
app.get("/getTheme/:name", controllers.getTheme);
app.get("/allTheme/:userId", controllers.allTheme);
app.post("/forgotpage", controllers.forgotpage);
app.post("/changepassword", controllers.changepassword);
app.patch("/updateTheme", controllers.updateTheme);
app.delete("/deletetheme", controllers.deletetheme);
app.get("/time", TimeControllers);
app.get("/plannedTime", PlanedTimeControllers);

app.use("/todo", ToDoRouter);
app.use("/nottodo", NotToDoRouter);

const HTTPS_PORT = process.env.HTTPS_PORT || 5000;

let httpsServer;
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  httpsServer = https.createServer(credentials, app);
  httpsServer.listen(HTTPS_PORT, () => console.log("server runnning"));
} else {
  server = app.listen(HTTPS_PORT);
}
module.exports = httpsServer;
