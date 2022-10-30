import { FormEvent, useState } from "react";
import deleteIcon from "../assets/images/icon-delete.svg";
import editIcon from "../assets/images/icon-edit.svg";
import minusIcon from "../assets/images/icon-minus.svg";
import addIcon from "../assets/images/icon-plus.svg";
import replyIcon from "../assets/images/icon-reply.svg";
import { useStore } from "../context/Provider";
import { User } from "../typing";
import Avatar from "./Avatar";
import UpdateCard from "./UpdateCard";

interface Props {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo?: string;
  user: User;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  parentId?: number;
}

const CardTemplate = (props: Props) => {
  const { id, content, createdAt, score, user, replyingTo, setOpen, parentId } =
    props;
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const { comments, currentUser, setComments,setOpenDelete } = useStore();

  const handleScore = (value?: string) => {
    let newComments = [...comments];
    let index = newComments.findIndex(
      (comment) => comment.id === (parentId ?? id)
    );
    if (parentId) {
      let replyIndex = newComments[index].replies.findIndex(
        (reply) => reply.id === id
      );

      if (value === "minus") newComments[index].replies[replyIndex].score -= 1;
      else newComments[index].replies[replyIndex].score += 1;
    } else {
      if (value === "minus") newComments[index].score -= 1;
      else newComments[index].score += 1;
    }

    setComments(newComments);
  };

  return (
    <div className="flex flex-col md:flex-row h-full py-5">
      <div className="hidden md:block w-[10%]">
        <ScoreCard score={score} handleScore={handleScore} />
      </div>
      <ContentCard
        id={id}
        content={content}
        createdAt={createdAt}
        user={user}
        replyingTo={replyingTo}
        setOpen={setOpen}
        setOpenEdit={setOpenEdit}
        openEdit={openEdit}
        parentId={parentId}
      />
      <div className="flex items-center justify-between md:hidden m-5 mb-0">
        <div className="h-[10%]">
          <ScoreCard score={score} handleScore={handleScore} />
        </div>

        <div className="flex items-center">
          {currentUser!.username === user.username ? (
            <>
              <Button
                Icon={deleteIcon}
                text="Delete"
                color="text-primary-soft-red"
                onClick={() => setOpenDelete({
                  parentId,
                  id
                })}
              />
              <Button
                Icon={editIcon}
                text="Edit"
                color="text-primary-moderate-blue"
                onClick={() => setOpenEdit(!openEdit)}
              />
            </>
          ) : (
            <Button
              Icon={replyIcon}
              text="Reply"
              color="text-primary-moderate-blue"
              onClick={() => setOpen((open) => !open)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const ScoreCard = ({
  score,
  handleScore,
}: {
  score: number;
  handleScore(value?: string): void;
}) => {
  return (
    <div className="w-full flex justify-center h-full">
      <div className="bg-neutral-very-light-gray h-[40px] w-[100px]  md:h-[100px] md:w-[40px] rounded-lg flex items-center justify-between md:flex-col flex-row">
        <div
          className="w-full h-[35px] flex items-center justify-center cursor-pointer"
          onClick={() => handleScore()}
        >
          <img src={addIcon} alt="" className="" />
        </div>

        <div className="w-full h-[35px] flex items-center justify-center">
          <p className="text-primary-moderate-blue font-semibold">{score}</p>
        </div>

        <div
          className="w-full h-[35px] flex items-center justify-center cursor-pointer"
          onClick={() => handleScore("minus")}
        >
          <img src={minusIcon} alt="" className="" />
        </div>
      </div>
    </div>
  );
};

interface ContentType {
  id: number;
  content: string;
  createdAt: string;
  replyingTo?: string;
  user: User;
  openEdit: boolean;
  parentId?: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContentCard = (props: ContentType) => {
  const {
    id,
    content,
    createdAt,
    user,
    replyingTo,
    setOpen,
    openEdit,
    setOpenEdit,
    parentId,
  } = props;

  const [input, setInput] = useState(content);
  const { comments, currentUser, setComments, setOpenDelete } = useStore();

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    let newComments = [...comments];
    let index = newComments.findIndex(
      (comment) => comment.id === (parentId ?? id)
    );
    if (parentId) {
      let replyIndex = newComments[index].replies.findIndex(
        (reply) => reply.id === id
      );

      newComments[index].replies[replyIndex].content = input;
    } else {
      newComments[index].content = input;
    }
    setComments(newComments);
    setInput("");
    setOpenEdit(false);
  };

  return (
    <div className="w-[90%] mx-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center ">
          <div className="flex items-center">
            <Avatar src={user.image.png} alt="" />
            <p className="mx-2 font-medium text-lg text-neutral-dark-blue">
              {user.username}
            </p>
            {currentUser!.username === user.username && (
              <div className="bg-primary-moderate-blue text-white mx-1 w-[40px] h-[20px] flex justify-center items-center rounded-sm">
                <p className="">You</p>
              </div>
            )}
            <p className="ml-2 text-sm font-medium text-neutral-grayish-blue">
              {createdAt}
            </p>
          </div>
        </div>
        <div className="md:flex items-center hidden">
          {currentUser!.username === user.username ? (
            <>
              <Button
                Icon={deleteIcon}
                text="Delete"
                color="text-primary-soft-red"
                onClick={() => setOpenDelete({
                  parentId,
                  id
                })}
              />
              <Button
                Icon={editIcon}
                text="Edit"
                color="text-primary-moderate-blue"
                onClick={() => setOpenEdit(!openEdit)}
              />
            </>
          ) : (
            <Button
              Icon={replyIcon}
              text="Reply"
              color="text-primary-moderate-blue"
              onClick={() => setOpen((open) => !open)}
            />
          )}
        </div>
      </div>

      <div className={` mt-2 ${openEdit ? "w-full" : "w-[95%]"}`}>
        {openEdit ? (
          <UpdateCard
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onSubmit={handleUpdate}
          />
        ) : (
          <p className="text-neutral-grayish-blue">
            {replyingTo && (
              <strong className="text-primary-moderate-blue mr-1">
                @{replyingTo}
              </strong>
            )}
            {content}
          </p>
        )}
      </div>
    </div>
  );
};

const Button = ({
  Icon,
  text,
  color,
  ...other
}: {
  Icon: string;
  text: string;
  color: string;
  [key: string]: any;
}) => {
  return (
    <div
      className="flex items-center cursor-pointer mx-2 hover:opacity-40 transition-all duration-300"
      onClick={() => other.onClick?.()}
    >
      <div className="w-[30px] h-[30px] flex items-center justify-center">
        <img src={Icon} alt="" className="" />
      </div>

      <p className={`font-medium ${color}`}>{text}</p>
    </div>
  );
};
export default CardTemplate;
