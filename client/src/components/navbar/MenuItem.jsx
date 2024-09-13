const MenuItem = ({ label, onClick, icon }) => {
  
  return (
    <div
     onClick={onClick}
      className="
        px-4
        py-3
        hover:bg-neutral-100
        transition
        font-semibold
        border-t
      "
    >
      <div className="flex items-center gap-3 ">
        <span className="text-gray-500 text-lg">
          {icon}
        </span>
      <span className="text-neutral-500">{label}</span>
      </div>
      
    </div>
  );
};

export default MenuItem;
