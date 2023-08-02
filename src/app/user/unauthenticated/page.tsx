"use client";
import Button from "@/components/Button";
import { signIn } from "next-auth/react";

const page = () => {
  const handleLoginClick = () => signIn("google", { callbackUrl: "/" });
  return (
    <div className="flex flex-col items-center justify-center gap-8 h-full w-full">
      <h1 className="flex w-full text-primaryDarker text-4xl font-semibold justify-center items-center text-center">
        Para prosseguir você precisa efetuar o login!
      </h1>
      <div className="flex max-w-xl w-full">
        <Button
          className="w-full text-lg font-medium"
          onClick={handleLoginClick}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default page;
