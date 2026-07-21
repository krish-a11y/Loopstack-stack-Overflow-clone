"use client"

import { databases } from "@/models/client/config"
import { db,voteCollection } from "@/models/name"
import { useAuthStore } from "@/store/Auth"
import { cn } from "@/lib/utils"
import { IconCaretUpFilled, IconCaretDownFilled } from "@tabler/icons-react";
import { ID, Models, Query } from "appwrite";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface VoteDocument extends Models.Document {
  voteStatus: "upvoted" | "downvoted";
  votedById: string;
  type: "question" | "answer";
  typeId: string;
}
const VoteButtons = ({
  type,
  id,
  upvotes,
  downvotes,
  className,
}: {
  type: "question" | "answer";
  id: string;
  upvotes: Models.DocumentList<Models.Document>;
  downvotes: Models.DocumentList<Models.Document>;
  className?: string;
}) => {

    // for tracking the vote of the current user
    const [votedDocument,setVotedDocument]=useState<VoteDocument|null>();

    // displaying the net result of the votes of the question/answer
    const [voteResult,setVoteResult]=useState<number>(upvotes.total-downvotes.total);

   const {user}=useAuthStore();
   const router=useRouter();

//    finding the vote of current user to votedoc if it is present

   useEffect(()=>{
      (async () => {
        if (user) {
            // finding the vote doc of the current user to the given question
          const response = await databases.listDocuments<VoteDocument>(db, voteCollection, [
            Query.equal("type", type),
            Query.equal("typeId", id),
            Query.equal("votedById", user.$id),
          ]);
          setVotedDocument(() => response.documents[0] || null);
        }
      })();
   },[user,id,type])

//    function when the user clicks on the upvote
    const toggleUpvote = async () => {

        // if the use dont exist
      if (!user) return router.push("/login");

    //   if the vote doc has not been loaded yet
      if (votedDocument === undefined) return;

      try {
        // making backend request to do the upvote
        const response = await fetch(`/api/vote`, {
          method: "POST",
          body: JSON.stringify({
            votedById: user.$id,
            voteStatus: "upvoted",
            type,
            typeId: id,
          }),
        });


        const data = await response.json();

        // if the vote has some error while getting processed in the backend
        if (!response.ok) throw data;


        // setting vote count to new vote count
        setVoteResult(() => data.data.voteResult);
        // setting the doc to the new vote doc
        setVotedDocument(() => data.data.document);
      } catch (error: any) {
        window.alert(error?.message || "Something went wrong");
      }
    };

     const toggleDownvote = async () => {
       if (!user) return router.push("/login");

       if (votedDocument === undefined) return;

       try {
         const response = await fetch(`/api/vote`, {
           method: "POST",
           body: JSON.stringify({
             votedById: user.$id,
             voteStatus: "downvoted",
             type,
             typeId: id,
           }),
         });

         const data = await response.json();

         if (!response.ok) throw data;

         setVoteResult(() => data.data.voteResult);
         setVotedDocument(() => data.data.document);
       } catch (error: any) {
         window.alert(error?.message || "Something went wrong");
       }
     };
    return (
      <div
        className={cn(
          "flex shrink-0 flex-col items-center justify-start gap-y-4",
          className,
        )}
      >
        <button
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border p-1 duration-200 hover:bg-white/10",
            votedDocument && votedDocument.voteStatus === "upvoted"
              ? "border-orange-500 text-orange-500"
              : "border-white/30",
          )}
          onClick={toggleUpvote}
        >
          <IconCaretUpFilled />
        </button>
        <span>{voteResult}</span>
        <button
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border p-1 duration-200 hover:bg-white/10",
            votedDocument && votedDocument.voteStatus === "downvoted"
              ? "border-orange-500 text-orange-500"
              : "border-white/30",
          )}
          onClick={toggleDownvote}
        >
          <IconCaretDownFilled />
        </button>
      </div>
    );
};