import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <div className="flex items-center w-full p-6 bg-background z-50 dark:bg-[#1F1F1F]">
      <Logo />
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
        <p className="mt-6 text-base leading-6 text-center text-gray-400">
          &copy; 2024 Abhoy Sarkar
        </p>
        <p className="mt-6 text-base leading-6 text-center text-gray-400">
          Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};
