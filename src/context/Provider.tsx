import React, { createContext, ReactNode, useContext, useState } from "react";
import data from "../data/data.json";
import { Comment, User } from "../typing";

type ContextProps = {
  currentUser: User | null;
  comments: Comment[];
  openDelete: Delete | null;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setOpenDelete: React.Dispatch<React.SetStateAction<Delete | null>>;
  generateId: (value?: number) => number;
};

type Delete = {
  parentId?: number;
  id: number;
}
const StoreContext = createContext<ContextProps>({
  currentUser: null,
  comments: [],
  setComments: () => {},
  generateId: () => 1,
  openDelete: null,
  setOpenDelete: () => {}
});

const Provider = ({ children }: { children: ReactNode }) => {
  const [comments, setComments] = useState<Comment[]>(data.comments);
  const [openDelete, setOpenDelete] = useState<Delete | null>(null);

  const generateId = (value?: number) => {
    let lastComment = comments[value ?? comments.length - 1];

    if (value) {
      let lastReply = lastComment.replies[lastComment.replies.length - 1];
      return lastReply.id + 1;
    }

    return lastComment.id + 1;
  };

  return (
    <StoreContext.Provider
      value={{
        currentUser: data.currentUser,
        comments,
        setComments,
        generateId,
        openDelete,
        setOpenDelete
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  return useContext(StoreContext);
};
export default Provider;
