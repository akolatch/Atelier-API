/*
// ETL terminal commands/instructions

1) To insert the CSVs into mongo in the root directory run:
  mongoimport --type csv -d QnA -c questions --headerline --drop csv/questions.csv
  mongoimport --type csv -d QnA -c transformAnswers --headerline --drop csv/answers.csv
  mongoimport --type csv -d QnA -c transformPhotos --headerline --drop csv/answers_photos.csv

2) open the mongo shell and run:
  use QnA

3) then ren the following commands
*/

// change the fields in the question collection to match the desired result.
// may take a few minutes
db.questions.updateMany(
  {},
  {
    $rename: {
      body: 'question_body',
      date_written: 'question_date',
      helpful: 'question_helpfulness',
      id: 'question_id',
    },
  }
);

// creat indexes for faster etl
db.questions.createIndex({ question_id: 1 });
db.questions.createIndex({ product_id: 1 });
db.transformAnswers.createIndex({ question_id: 1 });
db.transformAnswers.createIndex({ id: 1 });
db.transformPhotos.createIndex({ id: 1 });
db.transformPhotos.createIndex({ answer_id: 1 });

// combine the photos into their corresponding answers and out put a new answers collection.
// this may take around 30min
db.transformAnswers.aggregate([
  {
    $lookup: {
      from: 'transformPhotos',
      localField: 'id',
      foreignField: 'answer_id',
      as: 'photos',
    },
  },
  {
    $out: 'answers',
  },
]);

// rename the fields in the new answer collection to match the intended output
// may take a few minutes
db.answers.updateMany(
  {},
  {
    $rename: {
      date_written: 'date',
      helpful: 'helpfulness',
      id: 'answer_id',
    },
  }
);

// create indexes in the new answers collection
db.answers.createIndex({ question_id: 1 });
db.answers.createIndex({ answer_id: 1 });

/******************************************************************* 
BEFORE DOING THIS NEXT STEP CONFIRM EVERYTHING HAS WORKED CORRECTLY 
*******************************************************************/

// drop transform collections that will not be use
db.transformAnswers.drop();
db.transformPhotos.drop();

db.answers.dropIndex('id_1');
