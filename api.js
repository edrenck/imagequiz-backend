const db = require("./data/db");

const addCustomer = (name, email, password) => {
  return db.addCustomer(name, email, password);
};

const getCustomers = () => {
  return db.getCustomers();
};

const getQuiz = (id) => {
  return db.getQuiz(id);
};

const login = async (email, password) => {
  const success = await db.login(email, password);
  return success;
};

const getQuizzes = async () => {
  return await (
    await db.getQuizzes()
  ).rows;
};

const addQuiz = (name, category) => {
  name = name.toLowerCase();
  category = category.toLowerCase();
  return db.addQuiz(name, category);
};

const addCategory = (category) => {
  category = category.toLowerCase();
  return db.addCategory(category);
};

const getCategory = (category) => {
  category = category.toLowerCase();
  return db.getCategory(category);
};

const getFlowers = () => {
  return db.getFlowers();
};

const setFlower = (name, picture) => {
  name = name.toLowerCase();
  picture = picture.toLowerCase();
  return db.setFlower(name, picture);
};

const setQuestion = (picture, choices, answer) => {
  return db.setQuestion(picture, choices, answer);
};

const getQuestions = () => {
  return db.getQuestions();
};

const getQuestion = (id) => {
  id = Number(id);
  return db.getQuestion(id);
};

const getScores = async () => {
  return (await db.getScores()).rows;
};

const getScore = async (email, id) => {
  return (await db.getScore(email, id)).rows;
};

const setScore = async (quizTaker, quizId, score) => {
  return await db.setScore(quizTaker, quizId, score);
};
exports.getCustomers = getCustomers;
exports.addCustomer = addCustomer;
exports.getQuiz = getQuiz;
exports.getQuizzes = getQuizzes;
exports.addQuiz = addQuiz;
exports.addCategory = addCategory;
exports.getCategory = getCategory;
exports.getFlowers = getFlowers;
exports.setFlower = setFlower;
exports.getQuestions = getQuestions;
exports.setQuestion = setQuestion;
exports.getQuestion = getQuestion;
exports.login = login;
exports.getScores = getScores;
exports.getScore = getScore;
exports.setScore = setScore;
