require("dotenv").config({ path: "./data/.env" });
const { Pool } = require("pg");
const bcrypt = require("bcrypt");

const connectionString = `postgres://${process.env.DATABASEUSERNAME}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DATABASEPORT}/${process.env.DATABASE}`;

const connection = {
  connectionString: process.env.DATABASE_URL
    ? process.env.DATABASE_URL
    : connectionString,
  ssl: { rejectUnauthorized: false },
};
const pool = new Pool(connection);

let getCustomers = () => {
  return pool.query("select * from imagequiz.customer").then((x) => x.rows);
};

let addCustomer = (name, email, password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return pool.query(
    "insert into imagequiz.customer(name, email, password) values ($1, $2, $3)",
    [name, email.toLowerCase(), hashedPassword]
  );
};

let getQuizzes = () => {
  return pool.query("select * from imagequiz.quiz");
};

let getQuiz = (id) => {
  return pool
    .query(`select * from imagequiz.quiz where id = ${id}`)
    .then((x) => x.rows);
};

let addQuiz = async (name, category) => {
  let cat = await getCategory(category);

  if ((await cat).length === 0) {
    cat = await addCategory(category);
  }

  await pool.query(
    "insert into imagequiz.quiz(name, category_id) values ($1, $2)",
    [name, cat[0].id]
  );

  return await pool
    .query(`select * from imagequiz.quiz where name = '${name}'`)
    .then((x) => x.rows);
};

let addCategory = async (category) => {
  await pool.query(
    `insert into imagequiz.category(name) values ('${category}')`
  );
  return await getCategory(category);
};

let getCategory = (category) => {
  return pool
    .query(`select * from imagequiz.category where name = '${category}'`)
    .then((x) => x.rows);
};

let getFlowers = () => {
  return pool.query(`select * from imagequiz.flower`).then((x) => x.rows);
};

let setFlower = async (name, picture) => {
  await pool.query(
    `insert into imagequiz.flower(name, picture) values ('${name}','${picture}')`
  );
  return await getFlowers();
};

let setQuestion = (picture, choices, answer) => {
  return pool
    .query(
      "insert into imagequiz.question(picture, choices, answer) values ($1,$2,$3)",
      [picture, choices, answer]
    )
    .then((x) => x.rows);
};

let getQuestions = () => {
  return pool.query("select * from imagequiz.question").then((x) => x.rows);
};

let getQuestion = async (id) => {
  const question = await pool.query(
    `select * from imagequiz.question where id = ${id}`
  );
  return question.rows;
};

exports.getCustomers = getCustomers;
exports.addCustomer = addCustomer;
exports.getQuiz = getQuiz;
exports.getQuizzes = getQuizzes;
exports.addQuiz = addQuiz;
exports.getCategory = getCategory;
exports.addCategory = addCategory;
exports.getFlowers = getFlowers;
exports.setFlower = setFlower;
exports.setQuestion = setQuestion;
exports.getQuestions = getQuestions;
exports.getQuestion = getQuestion;
