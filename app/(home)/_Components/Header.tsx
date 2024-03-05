"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
interface Teacher {
  qualifications: string;
  name: string;
  qualification: string;
  packages: number;
  audited_packages: number;
  time: number;
  contact: string;
  user: {
    imageURL: string;
    username: string;
    location: string;
    whatsapp_number: string;
  };
}
function Header() {
  const router = useRouter();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Teacher[]>([]);
  const [avatarImageUrl, setAvatarImageUrl] = useState(
    "https://github.com/shadcn.png"
  );
  const routeToSearch = () => {
    router.push("/SearchQuery");
  };
  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://sensei-backend.onrender.com//api/searchteachers?query=${searchQuery}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      // router.push(`/${searchQuery}`);
      setSearchResults(response.data);
      console.log(response.data);
      toast({
        description: "Search results Shown",
      });
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="max-w-3xl space-y-4">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mt-8">
          Find yourself your
          <span className="ml-4 text-yellow-300">Sensei</span>
        </h1>
        <h3 className="text-base sm:text-xl md:text-2xl font-medium">
          We suppose you are here to gain Knowledge and Wisdom.
        </h3>
        <div className="flex flex-col py-12">
          <div className="flex bg-gray-100 dark:bg-[#2F2F2F] rounded-3xl px-2 py-5 focus-within:shadow-md text-gray-600 dark:text-[#f8f9fa] mx-5">
            <Button variant="ghost" onClick={handleSearch}>
              <Search color="gold" className="w-10 h-10" />
            </Button>
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent md:text-xl outline-none border-0 focus:ring-0"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>
        </div>
      </div>
      <div className="flex-col text-start">
        {searchResults.map((teacher, index) => (
          <div key={index} className="flex justify-center mt-8">
            <Avatar className="cursor-pointer w-20 h-20 mr-4 hidden md:flex">
              <AvatarImage
                src={teacher.user.imageURL || "https://github.com/shadcn.png"}
              />
            </Avatar>
            <aside className="bg-gray-100 text-black p-6 border border-yellow-300 rounded-xl w-full max-w-3xl mx-12 font-mono">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 text-red-500">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <p className="text-sm">Sensei</p>
              </div>
              <div className="mt-4 mr-12">
                <p className="text-yellow-400 text-xl font-extrabold">
                  $ {teacher.user.username}
                </p>
                <p className="text-black font-bold">
                  + {teacher.qualifications}
                </p>
                <p className="text-black text-lg">
                  <span className="text-gray-600">Username</span>:{" "}
                  {teacher.user.username}
                  {","} <span className="text-gray-600">Location</span>:{" "}
                  {teacher.user.location}
                </p>
                <p className="text-yellow-400 text-lg">
                  $ {teacher.user.whatsapp_number}
                </p>
              </div>
            </aside>
          </div>
        ))}
      </div>
    </>
  );
}

export default Header;
