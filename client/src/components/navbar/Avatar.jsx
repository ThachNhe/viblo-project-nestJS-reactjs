// import Image from 'next/image';
import defaultAvatar from '../../../src/images/user/avatar.png';
const Avatar = ({ imgURL, height, width, onClick }) => {
  return (
    <div >
      <img
        height={height}
        width={width}
        alt="avatar"
        className="rounded-full box-border  cursor-pointer object-fill align-middle "
        src={imgURL || defaultAvatar }
        onClick={onClick}
      />
    </div>
  );
};

export default Avatar;
