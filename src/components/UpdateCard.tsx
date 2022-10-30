import React, { ChangeEvent } from "react";

type Props = {
  value: string;
  onChange(e: ChangeEvent<HTMLTextAreaElement>): void;
  onSubmit?: (e: React.FormEvent) => void;
};

const UpdateCard = (props: Props) => {
  const { value, onChange, onSubmit } = props;
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex-1 mx-2">
        <textarea
          name=""
          id=""
          rows={3}
          value={value}
          onChange={onChange}
          className="w-full outline-[1px] border-[1.8px] focus:border-transparent border-neutral-light-gray outline-primary-moderate-blue rounded-lg p-2"
        ></textarea>
      </div>

      <div className="flex">
        <button type="submit" disabled={!value} className="bg-primary-moderate-blue text-white w-[100px] h-[40px] rounded-lg font-medium text-lg mx-2 ml-auto hover:opacity-40 transition-all duration-300">
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateCard;
