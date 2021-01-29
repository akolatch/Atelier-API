/*
ETL terminal commands/instructions

[1] In the root directory run:
  mongoimport --type csv -d QnA -c questions --headerline --drop csv/questions.csv

[2] When complete In a septate terminal run:
  mongo
  use QnA
  db.questions.updateMany( {}, { $rename: { "body": "question_body", "date_written": "question_date", "helpful" : "question_helpfulness", "id": "question_id" } } )

[3] back in the root directory run:
  mongoimport --type csv -d QnA -c transformAnswers --headerline --drop csv/answers.csv
  mongoimport --type csv -d QnA -c transformPhotos --headerline --drop csv/answers_photos.csv

[4] Back in the mongo shell run:
  db.questions.createIndex({"question_id": 1})
  db.questions.createIndex({"product_id": 1})
  db.transformAnswers.createIndex({"question_id":1})
  db.transformAnswers.createIndex({"id":1})
  db.transformPhotos.createIndex({"id":1})
  db.transformPhotos.createIndex({"answer_id":1})
  db.transformAnswers.aggregate([{$lookup: {from: transformPhotos}}])
  db.questions.updateMany( {}, { $rename: { "body": "question_body", "date_written": "question_date", "helpful" : "question_helpfulness", "id": "question_id" } } )

[5] In the terminal run the mongoose etl (this will take about 5 hours)
  node etl/index.js

[6]  
*/
