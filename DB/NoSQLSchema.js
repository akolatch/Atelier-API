const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

mongoose.connect('mongodb://localhost/QnA');

const questionsSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.ObjectId,
    product_id: { type: Number, index: true },
    question_id: { type: Number, index: true },
    question_body: String,
    question_date: String,
    asker_name: String,
    question_email: String,
    reported: Number,
    question_helpfulness: Number,
  },
  { collection: 'questions' }
);

const answersSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    ref: 'questions',
  },
  body: String,
  date: String,
  answerer_name: String,
  answerer_email: String,
  reported: Number,
  helpfulness: Number,
  photos: Array,
});

const transformAnswersSchema = new mongoose.Schema({
  id: { type: Number, index: true },
  question_id: { type: Number, index: true },
  body: String,
  date_written: String,
  answerer_name: String,
  answerer_email: String,
  reported: Number,
  helpful: Number,
});

const transformPhotosSchema = new mongoose.Schema({
  id: { type: Number, index: true },
  answer_id: { type: Number, index: true },
  url: String,
});

const Question = mongoose.model('Question', questionsSchema, 'questions');
const Answer = mongoose.model('Answer', answersSchema);

const TransformAnswer = mongoose.model(
  'TransformAnswer', // model name
  transformAnswersSchema, // model name
  'transformAnswers' // pre existing collection name
);

const TransformPhoto = mongoose.model(
  'TransformPhoto',
  transformPhotosSchema,
  'transformPhotos'
);

module.exports = {
  Answer,
  Question,
  TransformAnswer,
  TransformPhoto,
};

// const preTransform = {
//   _id: ObjectId('6012c7f8a3510b12a3d99f74'),
//   id: 4,
//   // question_id: 26,
//   // body: 'No',
//   // date_written: '2018-08-08',
//   // answerer_name: 'Seller',
//   // answerer_email: 'first.last@gmail.com',
//   // reported: 0,
//   // helpful: 4,
// };
