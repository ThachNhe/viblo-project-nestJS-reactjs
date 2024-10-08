import { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import * as services from "../../services/index";
import { useParams } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import ChatBox from "./ChatBox";

function UserBlog() {
  const { userName } = useParams();
  const [user, setUser] = useState("");
  const [isOpenChatBox, setIsOpenChatBox] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      const res = await services.getProfile(userName);
      console.log("res", res);
      if (res.success) {
        setUser(res.data);
      }
    };
    getUser();
  }, []);

  const handlerOpenChatBox = () => {
    setIsOpenChatBox(true);
  }

  const handlerCloseChatBox = () => {
    setIsOpenChatBox(false);
  }

  return (
    <div className="flex flex-col items-center">
      <UserProfile
        avatar={user.avatar}
        fullName={user.fullName}
        userName={user.userName}
      />
      {!isOpenChatBox && (
        <div
          class="fixed bottom-8 right-5  text-white p-3 rounded-full shadow-lg  cursor-pointer"
          data-tooltip-id="chat"
          onClick={() => handlerOpenChatBox()}
        >
          <svg
            height="30"
            width="30"
            viewBox="0 0 58 58"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="#000000"
          >
            <g>
              <path
                fill="#88C057"
                d="M53,7H5c-2.722,0-5,2.277-5,5v31c0,2.723,2.278,5,5,5h15l9,10l9-10h15c2.722,0,5-2.277,5-5V12 C58,9.277,55.722,7,53,7z"
              />
              <path
                fill="#659C35"
                d="M51,7V3.793C51,1.728,49.272,0,47.207,0H10.793C8.728,0,7,1.728,7,3.793V7H51z"
              />
              <circle fill="#FFFFFF" cx="16" cy="27.985" r="3" />
              <circle fill="#FFFFFF" cx="29" cy="27.985" r="3" />
              <circle fill="#FFFFFF" cx="42" cy="27.985" r="3" />
            </g>
          </svg>
          <ReactTooltip
            id="chat"
            place="left"
            content={`Chat cùng tác giả`}
            effect="solid"
          />
        </div>
      )}

      <ChatBox isOpen={isOpenChatBox} handlerCloseChatBox={handlerCloseChatBox} />
    </div>
  );
}

export default UserBlog;
