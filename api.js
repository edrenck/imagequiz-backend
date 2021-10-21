const { customers } = require("./customers");
const { flowers } = require("./flowers");
const { quizzes } = require("./data");
const { scores } = require("./scores");

const register = (name, email, password) => {
  let userExists = customers.find((user) => {
    return user.email.toLowerCase() === email.toLowerCase();
  });
  if (userExists) return true;
  let newUser = { name, email, password };
  console.log(newUser);
  customers.push(newUser);
  return false;
};

const login = (email, password) => {
  let user = customers.find(
    (x) => x.email.toLowerCase() === email.toLowerCase()
  );

  console.log(user);

  if (user) {
    return user.password === password;
  } else {
    return false;
  }
};

const getFlowers = () => {
  return flowers;
};

const getQuizzes = () => {
  return quizzes;
};

const getQuiz = (id) => {
  if (id >= quizzes.length || id < 0) {
    return [];
  } else {
    let quiz = quizzes[id];
    return quiz;
  }
};

const pushScore = (quizTaker, quizId, score) => {
  let date = Date.now();
  scores.push({ quizTaker, quizId, score, date });
};

const getScores = (quizTaker, quizId) => {
  let previousScores = scores.filter(
    (score) =>
      score.quizTaker.toLowerCase() === quizTaker.toLowerCase() &&
      score.quizId === quizId
  );

  console.log(previousScores);

  return previousScores;
};

exports.register = register;
exports.login = login;
exports.getFlowers = getFlowers;
exports.getQuizzes = getQuizzes;
exports.getQuiz = getQuiz;
exports.pushScore = pushScore;
exports.getScores = getScores;
