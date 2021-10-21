const express = require("express");
const api = require("./api");
const cors = require("cors");
const { response } = require("express");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", (request, response) => {
  let name = request.body.name;
  let email = request.body.email;
  let password = request.body.password;

  let alreadyExists = api.register(name, email, password);

  if (alreadyExists) {
    response.status(403).json({ message: "Customer already exists." });
  } else {
    response.json({ message: "Customer added." });
  }
});

app.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let validLogin = api.login(email, password);
  if (validLogin) {
    res.json({ message: "User logged in succesfully.", isvalid: true });
  } else {
    res.json({ message: "username/password invalid.", isvalid: false });
  }
});

app.get("/flowers", (req, res) => {
  let flowers = api.getFlowers();
  res.json(flowers);
});

app.get("/quizzes", (req, res) => {
  let quizzes = api.getQuizzes();
  res.json(quizzes);
});

app.get("/quiz/:id", (req, res) => {
  let id = req.params.id;
  let quiz = api.getQuiz(id);
  if (quiz.length === 0) {
    res.json({ message: "Invalid id." });
  } else {
    res.json(quiz);
  }
});

app.post("/score", (req, res) => {
  let email = req.body.email;
  let id = Number(req.body.id);
  let score = Number(req.body.score);

  api.pushScore(email, id, score);
  res.json({ message: "Score stored succesfully." });
});

app.get("/scores/:quiztaker/:quizid", (req, res) => {
  let email = req.params.quiztaker;
  let id = Number(req.params.quizid);

  let scores = api.getScores(email, id);

  if (scores.length === 0) {
    res.json({ message: "No scores found." });
  } else {
    res.json(scores);
  }
});

app.listen(80);
console.log("Express started on port 3000.");
