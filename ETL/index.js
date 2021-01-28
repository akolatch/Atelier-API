const {
  Question,
  Answer,
  TransformAnswer,
  TransformPhoto,
} = require('../db/NoSQLSchema');
let count = 0;
const transformQId = async (amount) => {
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
        console.log(
          `${question_id} of ${amount} questions searched transformed ${
            question_id + count
          } of 12392946 answers transformed`
        );
        count++;
      }
    } catch (err) {
      console.log(err);
    }
  }
  console.log('done', new Date());
};

// const get = async () => {
//   const data = await TransformAnswer.find({ question_id: 23 }, { _id: 0 });

//   console.log('data', data);
// };
console.log(new Date());
// transformQId(1000);
transformQId(3521634);
// get();

// total questions 3521634
// total photos 3717892
// total answers 12392946
