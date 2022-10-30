import { FormEvent, useState } from "react";
import CommentCard from "./components/CommentCard";
import DeleteCard from "./components/DeleteCard";
import InputCard from "./components/InputCard";
import { useStore } from "./context/Provider";
import data from "./data/data.json";
import { Comment, User } from "./typing";

function App() {
  const user: User = data.currentUser;

  const [input, setInput] = useState("");

  const { comments, setComments, generateId, openDelete } = useStore();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setComments([
      ...comments,
      {
        content: input,
        createdAt: "just now",
        id: generateId(),
        replies: [],
        score: 0,
        user,
      },
    ]);

    setInput("");
  };

  return (
    <div className="bg-neutral-very-light-gray min-h-screen flex items-center flex-col py-10 overflow-scroll">
      <main className=" bg-neutral-very-light-gray min-h-screen flex items-center flex-col py-10">
        {comments.map((comment: Comment, index: number) => (
          <CommentCard key={index} {...comment} />
        ))}
        <div className="w-[90%] md:w-[60%] min-h-[120px] bg-neutral-white my-2 shadow-sm rounded-lg">
          <InputCard
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onSubmit={handleSubmit}
          />
        </div>

        {openDelete && <DeleteCard />}
      </main>
    </div>
  );
}

export default App;
