// server-side service component which talks with the Appwrite server
import env from "@/env";
import { Avatars, Client, Storage, Users, Databases } from "node-appwrite";

// connecting to the respective project and endpoint
const client = new Client();

client
  .setEndpoint(env.appwrite.endpoint)
  .setProject(env.appwrite.projectId)
  .setKey(env.appwrite.apikey);

// creating the service components
const users = new Users(client);
const databases = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client);

export { users, databases, avatars, storage };
