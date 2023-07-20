import { NextAuthProvider } from "@/providers/auth";
import "./globals.css";

import { Poppins } from "next/font/google";
import Header from "../components/header/Header";
import Footer from "@/components/header/Footer";
import ToastProvider from "@/providers/toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
export const metadata = {
  title: "Trips",
  description: "Book your trip",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} `}>
        <NextAuthProvider>
          <ToastProvider>
            <div className="flex flex-col h-screen gap-2 ">
              <div className="h-[76px] flex flex-col  ">
                <Header />
                <div className="h-[1px] w-full  flex bg-[#ebebeb]"> </div>
              </div>
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </ToastProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
