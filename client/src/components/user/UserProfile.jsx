import Avatar from "../navbar/Avatar";

function UserProfile({ avatar, fullName, userName }) {
  return (
    <div className="border-b border-b-neutral-400 w-full">
      <div className="max-w-[1200px] mx-auto w-full px-4 py-4">
        <div className="py-5 px-2">
          <div className="p-1 flex gap-6">
            <Avatar height={80} width={80} imgURL={avatar} />
            <div className="flex-grow flex ">
              <div className="flex flex-col gap-2 items-start basis-3/4 ">
                <span className="text-2xl font-medium ">{fullName}</span>
                <span className="text-md text-neutral-500">@{userName}</span>
                <span>báo cáo</span>
              </div>
              <div className="flex items-start basis-1/4">
                <button className="bg-blue-500 text-white px-3 py-1 rounded-md">
                  Theo dõi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
