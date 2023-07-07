"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Menu, UserCircle2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
const LoginButton = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const handleLoginClick = () => signIn();
  const handleLogoutClick = () => {
    signOut();
    setIsOpenMenu(false);
  };
  const handleMenuClick = () => setIsOpenMenu(!isOpenMenu);
  const { status, data } = useSession();
  return (
    <>
      {status === "authenticated" && data.user && (
        <div className="flex items-center my-auto h-12 border rounded-[40px] border-secondaryGray p-2 pl-3 gap-3 relative">
          <Menu
            onClick={handleMenuClick}
            width={24}
            height={24}
            className="text-secondaryGray cursor-pointer"
          />

          {data.user?.image ? (
            <Image
              className="rounded-full select-none shadow-md"
              src={data.user.image}
              width={32}
              height={32}
              alt={`${data.user.name} image`}
            />
          ) : (
            <UserCircle2
              className="text-secondaryGray rounded-full select-none"
              width={24}
              height={24}
            />
          )}
          {isOpenMenu && (
            <div className="absolute top-12 left-0 w-full h-full z-50 bg-white border border-primaryLighter  rounded-lg shadow-md flex flex-col justify-center items-center">
              <button
                className="text-primary text-sm w-full h-full  font-semibold select-none"
                onClick={handleLogoutClick}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
      {status === "unauthenticated" && (
        <div
          onClick={handleLoginClick}
          className="flex cursor-pointer my-auto h-12 items-center border rounded-[40px] border-secondaryGray p-2  gap-3 relative"
        >
          <button className=" w-[72px] h-8 text-primary">Login</button>
        </div>
      )}
    </>
  );
};

export default LoginButton;
