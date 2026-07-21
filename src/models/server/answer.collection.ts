//answer collection for answers  of the questions asked on the site
import {Permission} from "node-appwrite"
import { db,answerCollection } from "../name"
import { databases } from "./config"

// creating the collection
export default async function createAnswerCollection()
{
    await databases.createCollection(
        db,
        answerCollection,
        answerCollection,
        [
            Permission.read("any"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.read("users"),
            Permission.delete("users"),
        ]
    )
    console.log("answer collection created") 

    // creating the attributes
    await Promise.all(
        [
            databases.createStringAttribute(db,answerCollection,"content",10000,true),
            databases.createStringAttribute(db,answerCollection,"questionId",50,true),
            databases.createStringAttribute(db,answerCollection,"authorId",50,true),
        ]
    )
    console.log("answer attributes ccreated ")

}