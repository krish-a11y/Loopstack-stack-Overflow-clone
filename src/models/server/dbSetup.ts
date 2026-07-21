// creating the database and also creating all the collection
import { db } from "../name";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";
import createAnswerCollection from "./answer.collection";
import { databases } from "./config";

export default async function getOrCreateDB() {
  try {
    // if the db already exist then connect to the db otherwise create new one
    await databases.get(db);
    console.log("database connected successfully");
  } catch (error) {
    try {
      // create new DB
      await databases.create(db, db);
      console.log("database created");
      // create the collection
      await Promise.all([
        createAnswerCollection(),
        createCommentCollection(),
        createVoteCollection(),
        createQuestionCollection(),
      ]);
      console.log("collection created");
      console.log("database connected");
    } catch (error) {
      console.log("error while creating the database or collection", error);
    }
  }
}
