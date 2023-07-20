import Image from "next/image";
import LoginButton from "./LoginButton";
import Link from "next/link";

const Header = () => {
  return (
    <header className=" justify-between py-0 px-5 h-[90px] flex items-center">
      <Link href={"/"}>
        <div className="py-2 flex items-center">
          <Image src={"/Logo.png"} width={183} height={32} alt="Logo image" />
        </div>
      </Link>
      <LoginButton />
    </header>
  );
};

export default Header;
