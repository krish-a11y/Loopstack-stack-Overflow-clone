// question collection for users quesitons on the site
import { db, questionCollection } from "../name";
import { databases } from "./config";
import { Permission } from "node-appwrite";

// creating the  collection
export default async function createQuestionCollection() {
     await databases.createCollection(
        db,
        questionCollection,
        questionCollection,
        [
            Permission.read("any"),
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users"),
        ]
     )
     console.log("question collection created")
     
    // creating  the atttributes
    await Promise.all(
        [
            databases.createStringAttribute(db,questionCollection,"title",100,true),
            databases.createStringAttribute(db,questionCollection,"content",10000,true),
            databases.createStringAttribute(db,questionCollection,"authorId",50,true),
            databases.createStringAttribute(db,questionCollection,"tags",50,true,undefined,true),
            databases.createStringAttribute(db,questionCollection,"attachmentId",50,true),
        ]
    ) 
    console.log("question attributes added")

}
