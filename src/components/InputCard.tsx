import React, { ChangeEvent, FormEvent } from "react";
import data from "../data/data.json";
import { User } from "../typing";
import Avatar from "./Avatar";

type Props = {
  reply?: boolean;
  value: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: (e: FormEvent) => void;
};

const InputCard = (props: Props) => {
  const user: User = data.currentUser;

  const { reply = false, value, onChange, onSubmit } = props;

  return (
    <form
      onSubmit={onSubmit}
      className="p-5 flex flex-col md:flex-row items-start justify-between w-full"
    >
      <div className="hidden md:block">
        <Avatar src={user.image.png} alt="" />
      </div>

      <div className="w-full flex-1 mx-2">
        <textarea
          name="comment"
          id="comment"
          rows={3}
          value={value}
          onChange={onChange}
          placeholder={reply ? "Add a reply..." : "Add a comment..."}
          className="w-full outline-[1px] border-[1.8px] focus:border-transparent border-neutral-light-gray outline-primary-moderate-blue rounded-lg p-2"
        ></textarea>
      </div>

      <button
        disabled={!value}
        type="submit"
        className="bg-primary-moderate-blue text-white w-[100px] h-[40px] rounded-lg font-medium text-lg mx-2 hidden md:block hover:opacity-40 transition-all duration-300"
      >
        {reply ? "Reply" : "Send"}
      </button>

      <div className="flex items-center justify-between mx-5  md:hidden w-full">
        <Avatar src={user.image.png} alt="" />
        <button
          type="submit"
          disabled={!value}
          className="bg-primary-moderate-blue text-white w-[100px] h-[40px] rounded-lg font-medium text-lg mx-2 hover:opacity-40 transition-all duration-300"
        >
          {reply ? "Reply" : "Send"}
        </button>
      </div>
    </form>
  );
};

export default InputCard;
