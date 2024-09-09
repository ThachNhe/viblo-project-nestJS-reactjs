// import Image from 'next/image';
const Avatar = ({ imgURL, height, width }) => {
  return (
    <div >
      <img
        height={height}
        width={width}
        alt="avatar"
        className="rounded-full box-border  cursor-pointer object-fill align-middle "
        src={imgURL}
      />
    </div>
  );
};

export default Avatar;
