import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const Logo = () => {
  return (
    <div className="flex items-center gap-x-2">
      <a href="/" className="flex items-center">
        <Image src="/assets/login.png" height="84" width="84" alt="Logo" />
      </a>
      <p
        className={cn("hidden md:flex font-semibold text-5xl", font.className)}
      >
        Sensei
      </p>
    </div>
  );
};
