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
const getQuizzes = () => {
  return db.getQuizzes();
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

const setQuestions = (picture, choices, answer) => {
  return db.setQuestions(picture, choices, answer);
};

const getQuestions = () => {
  return db.getQuestions();
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
exports.setQuestions = setQuestions;
