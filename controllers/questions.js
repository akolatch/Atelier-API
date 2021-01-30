const { questions, updates } = require('../models');

module.exports = {
  find: async (req, res) => {
    const queries = req.query;
    const queryParams = {};
    queryParams.product_id = parseInt(queries.product_id);
    queryParams.page = queries.hasOwnProperty('page')
      ? Math.max(parseInt(queries.page) - 1, 0)
      : 0;
    queryParams.count = queries.hasOwnProperty('count')
      ? parseInt(queries.count)
      : 5;
    try {
      const questionData = await questions.find(queryParams);
      res.status(200).json(questionData);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },
  create: async (req, res) => {
    try {
      await questions.create(req.body);
      res.sendStatus(201);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },
  markHelpful: async (req, res) => {
    const question_id = parseInt(req.params.question_id);
    try {
      await updates.updateHelpfulness(
        'Question',
        { question_id },
        { question_helpfulness: 1 }
      );
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },
  report: async (req, res) => {
    const question_id = parseInt(req.params.question_id);
    try {
      await updates.report('Question', { question_id });
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },
};
