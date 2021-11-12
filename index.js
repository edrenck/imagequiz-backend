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
  let password = request.body.password;

  api
    .addCustomer(name, email, password)
    .then((x) => response.json({ message: "Customer added." }))
    .catch((e) => {
      console.log(e);
      response.status(403).json({ message: "Customer already exists." });
    });
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
  api.getFlowers().then((x) => res.json(x));
});

app.post("/flowers", (req, res) => {
  let name = req.body.name;
  let picture = req.body.picture;
  api.setFlower(name, picture).then((x) => res.json(x));
});

app.get("/quiz", (req, res) => {
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

app.post("/quiz", (req, res) => {
  let name = req.body.name;
  let category = req.body.category;
  api.addQuiz(name, category).then((x) => res.json(x));
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

  res.json(scores);
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
