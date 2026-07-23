// server-side service component which talks with the Appwrite server
import env from "@/env";
import { Avatars, Client, Storage, Users, Databases } from "node-appwrite";

const endpoint = env.appwrite.endpoint || "";
const projectId = env.appwrite.projectId || "";
const apiKey = env.appwrite.apikey || "";

// connecting to the respective project and endpoint
const client = new Client();

if (endpoint && projectId && apiKey) {
  client.setEndpoint(endpoint).setProject(projectId).setKey(apiKey);
}

// creating the service components
const users = new Users(client);
const databases = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client);

export { users, databases, avatars, storage };
