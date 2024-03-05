import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen flex flex-col bg-[#0F0F0F] overflow-x-hidden">
      <div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-center text-white mt-10 md:mt-10">
          Find your <span className="text-[#00bfff]">Sensei</span>
        </h1>
        <div className="flex items-center justify-center">
          <a href="/">
            <Image src="/logo.png" height="96" width="96" alt="Logo" />
          </a>
        </div>
      </div>

      <div className="flex items-center justify-center flex-grow">
        {children}
      </div>

      <Toaster />
    </div>
  );
};

export default AuthLayout;
