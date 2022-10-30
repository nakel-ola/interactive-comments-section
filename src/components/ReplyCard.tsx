import React, { FormEvent, useState } from "react";
import { useStore } from "../context/Provider";
import { Reply } from "../typing";
import CardTemplate from "./CardTemplate";
import InputCard from "./InputCard";

interface Props extends Reply {
  parentId: number;
}

const ReplyCard = (props: Props) => {
  const { content, createdAt, id, replyingTo, score, user,parentId } = props;

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const { comments, setComments, generateId,currentUser } = useStore();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    let newComments = [...comments];

    let index = newComments.findIndex(comment => comment.id === parentId);

    newComments[index].replies.push({
      content: input,
      createdAt: "today",
      id: generateId(index),
      replyingTo: user.username,
      score: 0,
      user: currentUser!
    })

    setComments(newComments)
    setInput("");
  };

  return (
    <>
      <div className="w-full min-h-[150px] bg-neutral-white mt-2 mb-4 shadow-sm rounded-lg">
        <CardTemplate
          content={content}
          createdAt={createdAt}
          id={id}
          score={score}
          user={user}
          replyingTo={replyingTo}
          setOpen={setOpen}
          parentId={parentId}
        />
      </div>
      {open && (
        <div className="w-full min-h-[120px] bg-neutral-white my-2 shadow-sm rounded-lg">
          <InputCard
            reply
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </>
  );
};

export default ReplyCard;
