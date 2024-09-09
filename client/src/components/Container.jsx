const Container = ({ children, isHomePage }) => {
  return (
    <div
      className={`   
        mx-auto
        ${isHomePage ? " xl:px-[12rem]" : "xl:px-[2rem]"}
        md:px-10
        sm:px-2
        px-4`}
    >
      {children}
    </div>
  );
};

export default Container;
