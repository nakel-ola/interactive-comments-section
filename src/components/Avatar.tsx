const Avatar = ({
  src,
  alt,
  ...other
}: {
  src: string;
  alt: string;
  [key: string]: any;
}) => {
  return (
    <div className="h-[35px] w-[35px] rounded-full overflow-hidden shrink-0">
      <img src={src} alt={alt} className="" {...other} />
    </div>
  );
};

export default Avatar;
