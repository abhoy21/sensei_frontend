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
  latitude: string;

  is_teacher: boolean;
}

interface Teacher {
  user: User;
  qualifications: string;
  areas_of_expertise: string[];
  student_list: any[];
}

export const Navbar = () => {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const scrolled = useScrollTop();

  const router = useRouter();
  const { toast } = useToast();
  const [avatarImageUrl, setAvatarImageUrl] = useState(
    "https://github.com/shadcn.png"
  );

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      console.log("Logout successful");
      toast({
        description: "Logout hoe gache baal",
      });

      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      toast({
        description: "Logout, please try again later.",
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
    if (username) {
      const fetchTeacherData = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `https://sensei-backend.onrender.com/api/teacherdetail/${username}`,
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          setTeacher(response.data);
          console.log(response.data.imageURL);
          await setAvatarImageUrl(
            response.data.imageURL || "https://github.com/shadcn.png"
          );
        } catch (error) {
          console.error("Error fetching teacher data:", error);
        }
      };

      fetchTeacherData();
    }
  }, []);

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
            <AvatarImage src={avatarImageUrl} />
          </Avatar>
          <span className="hidden md:flex text-xl text-gray-700 mx-4">
            {username}
          </span>
        </div>
      </div>
    </div>
  );
};
