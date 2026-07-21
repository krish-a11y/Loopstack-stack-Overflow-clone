
// creating storage for storing the files that are given by the user with the question
import { Permission } from "node-appwrite";
import { db,questionAttachmentBucket } from "../name";
import { storage } from "./config";
export default async function getOrCreateStorage()
{
    // if the storage already exist  then dont do anything if dont exist then make a new storage  
    
    try {
        
        // connecting  the bucket  
        
        await storage.getBucket(questionAttachmentBucket)
        console.log("storage connected")
    } catch (error) {
        // creating  the bucket(storage)  
       try {

          await storage.createBucket(
            questionAttachmentBucket,
            questionAttachmentBucket,
            [
            Permission.read("any"),
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users"),
            ],
            false,
            undefined,
            undefined,
            [
                "jpg",
                "png",
                "gif",
                "jpeg",
                "webp",
                "heic"
            ]
          )
          console.log("storage created")
          console.log("storage connected")
       } catch (error) {
        
        console.log("error while creating storage",error)
       }        
    }
}