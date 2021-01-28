const {
  Question,
  Answer,
  TransformAnswer,
  TransformPhoto,
} = require('../db/NoSQLSchema');

const formatTime = (d) => {
  return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
};

const transformQId = async (amount) => {
  console.log('started');
  let tracking = 10000;
  const start = new Date();
  for (let question_id = 1; question_id <= amount; question_id++) {
    // get the object _id for the     fist question
    try {
      const { _id } = await Question.findOne({ question_id }, '_id');
      // get all answers for that question
      const answers = await TransformAnswer.find({ question_id }, { _id: 0 });

      for (const answer of answers) {
        const photos = await TransformPhoto.find(
          { answer_id: answer.id },
          { id: 1, url: 1, _id: 0 }
        );
        await Answer.create({
          question_id: _id,
          body: answer.body,
          date: answer.date_written,
          answerer_name: answer.answerer_name,
          answerer_email: answer.answerer_email,
          reported: answer.reported,
          helpfulness: answer.helpful,
          photos: photos,
        });
      }
      if (question_id === tracking) {
        console.log(
          `${tracking} of ${amount} questions have had their answers transformed`
        );
        tracking += 10000;
      }
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }
  const end = new Date();
  console.log(
    `transformation started at ${formatTime(
      start
    )} and finished at ${formatTime(end)}`
  );
  process.exit(0);
};

transformQId(3521634);

// total questions 3521634
