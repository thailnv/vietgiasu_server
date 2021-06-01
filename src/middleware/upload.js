const { toLower } = require("lodash");
const readline = require("readline");
var stream = require("stream");

const { Question } = require("../models/questionModel");

let currentPart = 0;
let question = {};
let questions = [];

function addMedia(line) {
  question[toLower(line.split(" ")[0])] = line.split(" ")[1];
}

function answersHandle(line) {
  if (line.split(" ")[0] === "TRUE") {
    return {
      isTrue: true,
      content: line.slice(5),
    };
  }
  return {
    isTrue: false,
    content: line,
  };
}

function partHandle(line) {
  if (Object.keys(question).length > 2) questions.push(question);

  currentPart = parseInt(line.split(" ")[1]);
  question = {
    answers: [],
    part: currentPart,
  };
}

function questionHandle() {
  if (Object.keys(question).length > 2) questions.push(question);

  question = {
    answers: [],
    part: currentPart,
  };
}
const extractQuestion = async (req, res, next) => {
  var bufferStream = new stream.PassThrough();
  bufferStream.end(req.file.buffer);

  var rl = readline.createInterface({
    input: bufferStream,
  });
  for await (const line of rl) {
    let arr = line.split(" ");
    switch (arr[0]) {
      case "Question":
        questionHandle();
        break;
      case "Part":
        partHandle(line);
        break;
      case "IMG":
      case "SCRIPT":
        addMedia(line);
        break;
      case "CONTENT":
        question.content = line.slice(8);
        break;
      default:
        question.answers.push(answersHandle(line));
        break;
    }
  }

  //console.log(questions.length);
  // for (let i = 0; i < questions.length; i++) {
  //   let doc = new Question(questions[i]);
  //   await doc.save();
  // }

  req.questions = questions;

  questions = [];
  next();
};

module.exports = {
  extractQuestion,
};
