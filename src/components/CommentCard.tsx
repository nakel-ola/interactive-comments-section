import { FormEvent, useState } from "react";
import { useStore } from "../context/Provider";
import { Comment, Reply } from "../typing";
import CardTemplate from "./CardTemplate";
import InputCard from "./InputCard";
import ReplyCard from "./ReplyCard";

interface Props extends Comment {}
const CommentCard = (props: Props) => {
  const { content, createdAt, id, replies, score, user } = props;

  const [open, setOpen] = useState(false);

  const [input, setInput] = useState("");

  const { comments, setComments, generateId, currentUser } = useStore();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    let newComments = [...comments];

    let index = newComments.findIndex((comment) => comment.id === id);

    newComments[index].replies.push({
      content: input,
      createdAt: "just now",
      id: generateId(index),
      replyingTo: user.username,
      score: 0,
      user: currentUser!,
    });
    setComments(newComments);
    setInput("");
  };

  return (
    <div className="w-[90%] md:w-[60%]">
      <div className="w-full min-h-[150px] bg-neutral-white my-2 shadow-sm rounded-lg">
        <CardTemplate
          content={content}
          createdAt={createdAt}
          id={id}
          score={score}
          user={user}
          setOpen={setOpen}
        />
      </div>

      {replies.length > 0 && (
        <div className="flex w-full">
          <div className="w-[10%] flex items-center justify-center">
            <hr className="bg-neutral-light-gray h-[90%] w-[2px] border-0" />
          </div>
          <div className="w-[90%]">
            {replies.map((reply: Reply, index: number) => (
              <ReplyCard key={index} {...reply} parentId={id} />
            ))}
          </div>
        </div>
      )}

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
    </div>
  );
};

export default CommentCard;
