"use client";

import Link from "next/link";

import { useScrollTop } from "@/hooks/use-scroll-top";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "./Logo";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  imageURL: string;
  bio: string;
  whatsapp_number: string;
  location: string;
  is_teacher: boolean;
}

export const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const scrolled = useScrollTop();

  const router = useRouter();
  const { toast } = useToast();
  const [avatarImageUrl, setAvatarImageUrl] = useState(
    "https://github.com/shadcn.png"
  );

  const handleLogout = () => {
    try {
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        console.log("Logout successful");
        toast({
          description:
            "The logout process is complete. Please log in to proceed.",
        });
        router.push("/login");
      } else {
        console.log("No token found, cannot logout.");
        toast({
          description: "You need to login",
        });
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast({
        description: "Unable to Logout, please try again later.",
      });
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (username) {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `https://sensei-backend.onrender.com/api/user_details?username=${username}`,
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );

          setUser(response.data.user_details);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [username]);

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#0f0f0f] fixed top-0 flex items-center w-full p-6 shadow-sm",
        scrolled && "border-b shadow-md"
      )}
    >
      <Logo />

      <div className="md:ml-auto justify-end w-full flex items-center gap-x-2">
        <div className="mx-2 md:mx-4 flex items-center">
          {" "}
          <Avatar className="cursor-pointer w-12 h-12" onClick={handleLogout}>
            <AvatarImage
              src={user?.imageURL || "https://github.com/shadcn.png"}
            />
          </Avatar>
          <span className="hidden md:flex text-xl text-gray-700 mx-4">
            {username}
          </span>
        </div>
      </div>
    </div>
  );
};
