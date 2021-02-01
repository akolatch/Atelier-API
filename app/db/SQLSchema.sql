CREATE DATABASE Qestion_Answers;

USE Qestion_Answers;

CREATE TABLE Questions (
  id INT NOT NULL AUTO_INCREMENT,
  question_body VARCHAR(1000) NOT NULL,
  question_date DATE,
  asker_name VARCHAR(60)
  question_helpfulness INT,
  reported BOOLEAN,
  product_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE Answers (
  id INT NOT NULL AUTO_INCREMENT,
  body VARCHAR(1000) NOT NULL,
  date DATE,
  answer_name VARCHAR(60)
  helpfulness INT,
  reported BOOLEAN,
  question_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE Photos (
  prime_id INT NOT NULL AUTO_INCREMENT,
  id INT,
  url VARCHAR(1000) NOT NULL,
  answer_id INT,
  PRIMARY KEY (id)
);