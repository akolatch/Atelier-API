const { Answer } = require('../db');

module.exports = {
  findAnswers: async ({ question_id, page = 0, count = 5 }) => {
    return await Answer.aggregate()
      .match({ question_id })
      .sort({ id: 1 })
      .limit(page * count + count)
      .skip(page * count);
  },

  createAnswer: async (data) => {
    const photos = data.hasOwnProperty('photos')
      ? data.photos.map((photo, i) => {
          return { id: i + 1, url: photo };
        })
      : [];

    const { answer_id } = await Answer.findOne({}, { answer_id: 1, _id: 0 })
      .sort({
        answer_id: -1,
      })
      .lean();

    const newAnswer = {
      answer_id: answer_id + 1,
      answerer_name: data.name,
      answerer_email: data.email,
      reported: 0,
      body: data.body,
      date: `${new Date()}`,
      helpfulness: 0,
      photos: photos,
      question_id: data.question_id,
    };
    await Answer.create(newAnswer);
  },
};
