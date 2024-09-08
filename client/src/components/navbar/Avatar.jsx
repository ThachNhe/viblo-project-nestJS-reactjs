
// import Image from 'next/image';
const Avatar = ({imgURL, height, width}) => {
    return ( 
        <img
            height = {height}
            width = {width}
            alt = "avatar"
            className = "rounded-full align-middle box-border  cursor-pointer"
            src={imgURL}
        />
     );
}
 
export default Avatar;