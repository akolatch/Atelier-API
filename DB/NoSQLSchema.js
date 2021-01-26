const mongoose = require('mongoose');

mongoose.connect();

const questionsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product_id: Number,
  question_body: String,
  question_date: String,
  asker_name: String,
  question_email: String,
  reported: Boolean,
  question_helpfulness: Number,
  answers: [answersSchema],
});

const answersSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Questions,
  },
  body: String,
  date: String,
  answerer_name: String,
  answerer_name: String,
  reported: Boolean,
  helpfulness: Number,
  photos: Array,
});

exports.Answer = mongoose.model('Answer', answersSchema);
exports.Question = mongoose.model('Question', questionsSchema);

// *question_data = {
//   question_body: String (String.length < 1000),
//   question_date: Date-time,
//   asker_name: Sting (String.length < 60),
// }

// Return data form
// GET /qa/questions
// data = {
//   product_id: Number (from request),
//     results: [{
//       question_id: questionSchema.question_id,
//       question_body: String (String.length < 1000),
//       question_date: Date-time,
//       asker_name: Sting (String.length < 60),
//       question_helpfulness: questionSchema.question_helpfulness,
//       reported: questionSchema.question_reported (0/1),
//       answers: { object of objects made up of the answer in the answer Array
//         answer_data.id: {
//           answer_data
//         }
//         // ...
//       }
//     },
//     // ...
//   ]
// }

// Return data form
// GET /qa/questions/:GET /qa/questions/:question_id/answers/answers
// data = {
//   question: question_id (from request),
//   page: Number = 0 (default 1st page 0 indexed, from request),
//   count: Number = 5 (default 5 results, from request),
//   results: [{
//       id: answerSchema.answer_id
//       body: Sting (String.length < 1000),
//       date: Date-time,
//       "answerer_name": Sting (String.length < 60),
//       helpfulness: answerSchema.answer_helpful,
//       "photos": [ Array of object (Array.length < 5)
//         {
//           id: Number
//           url: Sting
//         },
//         // ... up to 5
//       ],
//     },
//     // ...
//   ]
// }
