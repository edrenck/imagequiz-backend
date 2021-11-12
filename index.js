const express = require("express");
const api = require("./api");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.post("/register", (request, response) => {
  let name = request.body.name;
  let email = request.body.email;
  let password = String(request.body.password);

  api
    .addCustomer(name, email, password)
    .then((x) => response.json({ message: "Customer added." }))
    .catch((e) => {
      console.log(e);
      response.status(403).json({ message: "Customer already exists." });
    });
});

app.post("/login", async (req, res) => {
  let email = req.body.email;
  let password = String(req.body.password);
  let validLogin = await api.login(email, password);
  if (validLogin) {
    res.json({ message: "User logged in succesfully.", isvalid: true });
  } else {
    res.json({ message: "username/password invalid.", isvalid: false });
  }
});

app.get("/flowers", (req, res) => {
  api.getFlowers().then((x) => res.json(x));
});

app.post("/flowers", (req, res) => {
  let name = req.body.name;
  let picture = req.body.picture;
  api.setFlower(name, picture).then((x) => res.json(x));
});

app.get("/quizzes", async (req, res) => {
  let quizzes = await api.getQuizzes();
  res.json(quizzes);
});

app.get("/quizzes/:id", async (req, res) => {
  let id = req.params.id;
  let quiz = await api.getQuiz(id);
  if (quiz.length === 0) {
    res.json({ message: "Invalid id." });
  } else {
    res.json(quiz);
  }
});

app.post("/quizzes", (req, res) => {
  let name = req.body.name;
  let category = req.body.category;
  api.addQuiz(name, category).then((x) => res.json(x));
});

app.get("/scores", async (req, res) => {
  let scores = await api.getScores();
  res.json(scores);
});

app.get("/score/:quiztaker/:quizid", (req, res) => {
  let email = req.params.quiztaker;
  let id = Number(req.params.quizid);

  let scores = api.getScore(email, id);

  res.json(scores);
});

app.post("/score", async (req, res) => {
  const quizTaker = req.body.quizTaker;
  const quizId = Number(req.body.quizId);
  const score = Number(req.body.score);
  await api.setScore(quizTaker, quizId, score);
  res.json({ message: "Score set succesfully" });
});

app.get("/customers", (req, res) => {
  api
    .getCustomers()
    .then((x) => res.json(x))
    .catch((e) => {
      console.log(e);
      res
        .status(500)
        .json({ message: "There was an error in retrieving customers" });
    });
});

app.post("/category", (req, res) => {
  const category = req.body.category;
  api.addCategory(category);
  res.json({ message: "Category saved" });
});

app.get("/category/:category", (req, res) => {
  const category = req.params.category;
  const cat = api.getCategory(category).then((x) => res.json(x));
});

app.get("/question", async (req, res) => {
  const questions = await api.getQuestions();
  res.json(questions);
});

app.get("/question/:id", async (req, res) => {
  const id = req.params.id;
  const question = await api.getQuestion(id);
  res.json(question);
});

app.post("/question", async (req, res) => {
  const picture = req.body.picture;
  const choices = req.body.choices;
  const answer = req.body.answer;
  await api.setQuestion(picture, choices, answer);
  res.json({ message: "Question saved" });
});
app.listen(port, () => console.log(`Express started on port ${port}`));
