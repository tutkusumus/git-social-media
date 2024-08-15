
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import Filter from "../components/Filter";
import SessionWrapper from "../components/SessionWrapper";
import Providers from "@/redux/Provider";
import CommentModal from "@/components/CommentModal";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Git Social",
  description: "Interact with other coder",
};

export default function RootLayout({ children }) {
  return (
   <Providers>
    <SessionWrapper>
    <html lang="en">
      <body className={inter.className}>
      <div className="flex justify-between max-w-6xl mx-auto">
        <div className="hidden sm:inline border-r h-screen sticky top-0">
          <Sidebar/>
        </div>
        <div className="w-2xl flex-1">
          
          {children}
          
          </div>
        <div className="lg:flex-col p-3 h-screen border-l hidden lg:flex w-[24rem]">
          <Filter />
        </div>
      </div>
      <CommentModal/>
      </body>
    </html>
    </SessionWrapper>
    </Providers>
  );
}
