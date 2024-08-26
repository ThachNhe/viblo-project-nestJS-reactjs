import { useNavigate } from "react-router-dom";
const Logo = () => {
  const navigator = useNavigate();
  const handlerRedirectHome = () => {
    navigator("/");
  };

  return (
    <img
      height="21"
      width="62"
      alt="logo"
      className="cursor-pointer"
      src="/images/viblo.svg"
      onClick={() => {
        handlerRedirectHome();
      }}
    />
  );
};
export default Logo;
