const MenuItem = ({ onclick, label, Icon }) => {
  console.log("Icon: ", Icon);
  return (
    <div
      onClick={onclick}
      className="
        px-4
        py-3
        hover:bg-neutral-100
        transition
      
        font-semibold"
    >
      {/* <Icon /> */}
      <span>{label}</span>
    </div>
  );
};

export default MenuItem;
