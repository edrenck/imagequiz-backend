const { Pool } = require("pg");
const bcrypt = require("bcrypt");

const connectionString =
  "postgres://wpksywcsmjbpjm:ac413a1659fcd51c348d91ea9e57f5f69aa85f4dad8bb284d5478f06179ce73c@ec2-3-215-83-124.compute-1.amazonaws.com:5432/d4cqf0fihcogeo";

const connection = {
  connectionString: connectionString,
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
  return pool.query(`select * from imagequiz.flowers`).then((x) => x.rows);
};

let setFlower = async (name, picture) => {
  await pool.query(
    `insert into imagequiz.flowers(name, picture) values ('${name}','${picture}')`
  );
  return await getFlowers();
};

let setQuestions = (picture, choices, answer) => {
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

exports.getCustomers = getCustomers;
exports.addCustomer = addCustomer;
exports.getQuiz = getQuiz;
exports.getQuizzes = getQuizzes;
exports.addQuiz = addQuiz;
exports.getCategory = getCategory;
exports.addCategory = addCategory;
exports.getFlowers = getFlowers;
exports.setFlower = setFlower;
exports.setQuestions = setQuestions;
exports.getQuestions = getQuestions;
