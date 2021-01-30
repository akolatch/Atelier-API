const router = require('express').Router();
const { questions, answers } = require('../controllers');
// get question for a given product
router.route('/questions').get(questions.find).post(questions.create);

// mark a given question helpful
router.route('/questions/:question_id/helpful').put(questions.markHelpful);

// report a given question
router.route('/questions/:question_id/report').put(questions.report);

// get answers and post answers for a given question
router
  .route('/questions/:question_id/answers')
  .get(answers.find)
  .post(answers.create);

// mark a given answer helpful
router.route('/answers/:answer_id/helpful').put(answers.markHelpful);

// report a given answer
router.route('/answers/:answer_id/report').put(answers.report);

module.exports = router;
