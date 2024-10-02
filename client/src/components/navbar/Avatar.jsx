// import Image from 'next/image';
import defaultAvatar from '../../../src/images/user/avatar.png';
const Avatar = ({ imgURL, height, width }) => {
  return (
    <div >
      <img
        height={height}
        width={width}
        alt="avatar"
        className="rounded-full box-border  cursor-pointer object-fill align-middle "
        src={imgURL || defaultAvatar }
      />
    </div>
  );
};

export default Avatar;
