# Q and A API

restful API for the question and answers service of the Atelier API

for each csv in the terminal run

ETL terminal commands/instructions

In the root directory run:

- mongoimport --type csv -d QnA -c questions --headerline --drop csv/questions.csv

In a septate terminal rune

- mongo
- use QnA
- db.questions.updateMany( {}, { $rename: { "body": "question_body", "date_written": "question_date", "helpful" : "question_helpfulness", "id": "question_id" } } )

back in the root directory run:

- mongoimport --type csv -d QnA -c transformAnswers --headerline --drop csv/answers.csv
- mongoimport --type csv -d QnA -c transformPhotos --headerline --drop csv/answers_photos.csv

while that runs back in the mongo shell run:

- db.questions.createIndex({"question_id": 1})
- db.questions.createIndex({"product_id": 1})
- db.transformAnswers.createIndex({"question_id":1})
- db.transformAnswers.createIndex({"id":1})
- db.transformPhotos.createIndex({"id":1})
- db.transformPhotos.createIndex({"answer_id":1})
