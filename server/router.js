const router = require('express').Router();

// get question for a given product
router.route('/questions').get();

// get answers and post answers for a given question
router.route('questions/:question_id/answers').get().post();

// mark a given question helpful
router.route('questions/:question_id/helpful').put();

// report a given question
router.route('questions/:question_id/report').put();

// mark a given answer helpful
router.route('questions/:answer_id/helpful').put();

// report a given answer
router.route('questions/:answer_id/report').put();

module.exports = router;
