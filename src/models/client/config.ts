// client side request handlers whih talk to the appwrite server for(auth,db,storage ,avatar)

// importing which client service components we want
import { Client, Account ,Avatars,Databases,Storage} from "appwrite";
import env from "@/env";

// selecting the project and endpoint (appwrite server)
const client = new Client()
  .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
  .setProject(env.appwrite.projectId); // Your project ID


// creating instance of client service components
const account = new Account(client);
const databases= new Databases(client);
const avatars= new Avatars(client);
const storage = new Storage(client);


export{
    account,
    databases,
    avatars,
    storage
}
