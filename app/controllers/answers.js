const { answers, updates } = require('../models');

module.exports = {
  find: async (req, res) => {
    const queries = req.query;
    const queryParams = {};
    queryParams.question_id = parseInt(req.params.question_id);
    queryParams.page = queries.hasOwnProperty('page')
      ? Math.max(parseInt(queries.page) - 1, 0)
      : 0;
    queryParams.count = queries.hasOwnProperty('count')
      ? parseInt(queries.count)
      : 5;
    try {
      const answerData = await answers.find(queryParams);
      res.status(200).json(answerData);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },
  create: async (req, res) => {
    const newQuestionData = req.body;
    newQuestionData.question_id = parseInt(req.params.question_id);
    try {
      await answers.create(newQuestionData);
      res.sendStatus(201);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },
  markHelpful: async (req, res) => {
    const answer_id = parseInt(req.params.answer_id);
    try {
      await updates.updateHelpfulness(
        'Answer',
        { answer_id },
        { helpfulness: 1 }
      );
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },
  report: async (req, res) => {
    const answer_id = parseInt(req.params.answer_id);
    try {
      await updates.report('Answer', { answer_id });
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },
};
