const { Question } = require('../db/index.js');

module.exports = {
  find: async ({ product_id, page = 0, count = 5 }) => {
    return await Question.aggregate()
      .match({ product_id })
      .sort({ question_id: 1 })
      .limit(page * count + count)
      .skip(page * count)
      .lookup({
        from: 'answers',
        localField: 'question_id',
        foreignField: 'question_id',
        as: 'answers',
      });
  },

  create: async (data) => {
    const { question_id } = await Question.findOne(
      {},
      { question_id: 1, _id: 0 }
    )
      .sort({ question_id: -1 })
      .lean();
    const newQuestion = {
      product_id: data.product_id,
      asker_name: data.name,
      asker_email: data.email,
      reported: 0,
      question_body: data.body,
      question_date: `${new Date()}`,
      question_helpfulness: 0,
      question_id: question_id + 1,
    };
    await Question.create(newQuestion);
  },
};
