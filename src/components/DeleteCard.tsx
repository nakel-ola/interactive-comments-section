import React, { ReactNode } from "react";
import { useStore } from "../context/Provider";

const DeleteCard = () => {
  const { comments, setComments, setOpenDelete, openDelete } = useStore();

  const handleDelete = () => {
    let newComments = [...comments];

    const parentId = openDelete?.parentId;
    const id = openDelete?.id;
    let index = newComments.findIndex(
      (comment) => comment.id === (parentId ?? id)
    );
    if (parentId) {
      let replyIndex = newComments[index].replies.findIndex(
        (reply) => reply.id === id
      );

      newComments[index].replies.splice(replyIndex, 1);
    } else {
      newComments.splice(index, 1);
    }
    setComments(newComments);
    setOpenDelete(null);
  };
  return (
    <div className="fixed top-0 w-full h-full bg-black/50 grid place-items-center">
      <div className="w-[90%] md:w-[350px] bg-white rounded-lg p-5">
        <h1 className="mx-2 font-medium text-xl text-neutral-dark-blue">
          Delete comment
        </h1>
        <p className=" m-2 text-base text-neutral-grayish-blue">
          Are you sure you want to delete this comment? This will remove the
          comment and cant't be undone
        </p>

        <div className="flex items-center mt-5">
          <Button
            color="bg-neutral-grayish-blue"
            onClick={() => setOpenDelete(null)}
          >
            NO, CANCEL
          </Button>
          <Button color="bg-primary-soft-red" onClick={handleDelete}>
            YES, DELETE
          </Button>
        </div>
      </div>
    </div>
  );
};

const Button = ({
  children,
  color,
  onClick,
}: {
  children: ReactNode;
  color: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className={`flex-1 text-white h-[40px] rounded-lg text-base mx-2 hover:opacity-40 transition-all duration-300 flex items-center justify-center whitespace-nowrap cursor-pointer ${color}`}
      onClick={() => onClick?.()}
    >
      {children}
    </div>
  );
};

export default DeleteCard;
