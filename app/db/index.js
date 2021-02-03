const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/QandA', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const questionsSchema = new mongoose.Schema({
  product_id: { type: Number, index: true },
  asker_name: String,
  asker_email: String,
  reported: Number,
  question_body: String,
  question_date: String,
  question_helpfulness: Number,
  question_id: { type: Number, index: true },
});

const answersSchema = new mongoose.Schema({
  answer_id: { type: Number, index: true },
  question_id: { type: Number, index: true },
  body: String,
  answerer_name: String,
  answerer_email: String,
  reported: Number,
  photos: Array,
  date: String,
  helpfulness: Number,
});

const Question = mongoose.model('Question', questionsSchema, 'questions');
const Answer = mongoose.model('Answer', answersSchema, 'answers');

module.exports = {
  Answer,
  Question,
};
