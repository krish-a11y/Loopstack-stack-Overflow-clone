// creating and deleting the answer (posted by a user to a particular question) in the DB

import { answerCollection, db } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";

// creating the answer
export async function POST(request: NextRequest) {
  try {

    // getting the data from the request
    const { answer, authorId, questionId } = await request.json();

    // creating the answer in the DB
    const response = await databases.createDocument(
      db,
      answerCollection,
      ID.unique(),//it is the PK
      {
        content: answer,
        questionId: questionId,
        authorId: authorId,
      },
    );

    // increasing the reputation of the user as he has posted the soln
    const prefs = await users.getPrefs<UserPrefs>(authorId);
    await users.updatePrefs(authorId, {
      reputation: Number(prefs.reputation)+1,
    });

    // returning the response
    return NextResponse.json(response, {
      status: 201,
    });
  } catch (error: any) {
    // error handeling
    return NextResponse.json(
      {
        error: error?.message || "error in creating the answer",
      },
      {
        status: error?.status || error?.code || 500,
      },
    );
  }
}


// deleting the answer
export async function DELETE(request: NextRequest) {
  try {

    // getting the answer id
    const { answerId } = await request.json();

    // getting the answer  docs of given answerid
    const answer = await databases.getDocument(db, answerCollection, answerId);

    // deleting the answer
    const response = await databases.deleteDocument(
      db,
      answerCollection,
      answerId,
    );

    // decreasing the reputation as  the answer is deleted
    const prefs = await users.getPrefs<UserPrefs>(answer.authorId);
    await users.updatePrefs(answer.authorId, {
      reputation: Number(prefs.reputation)-1,
    });


    // returning the response

    return NextResponse.json(response, {
      status: 201,
    });

  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "error while deleting the answer",
      },
      {
        status: error?.status || error?.code || 500,
      },
    );
  }
}
