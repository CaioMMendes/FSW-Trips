import Image from "next/image";
import LoginButton from "./LoginButton";

const Header = () => {
  return (
    <header className=" justify-between px-5 py-0 h-[90px] flex ">
      <div className="py-2 flex items-center">
        <Image src={"/Logo.png"} width={183} height={32} alt="Logo image" />
      </div>
      <LoginButton />
    </header>
  );
};

export default Header;
