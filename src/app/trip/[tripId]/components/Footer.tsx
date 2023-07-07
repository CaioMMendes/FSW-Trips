import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex flex-col p-5 gap-1 items-center justify-center">
      <Image src={"/Logo.png"} alt="FSW Logo" width={133} height={33} />
      <p className="text-sm font-medium text-primaryDarker">
        Todos os direitos reservados.
      </p>
    </div>
  );
};

export default Footer;
