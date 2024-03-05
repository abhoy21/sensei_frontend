import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Footer } from "./Footer";
import { ScanSearch } from "lucide-react";
import axios from "axios";
import Dashboard from "./Dashboard";

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

interface Student {
  id: number;
  user: User;
  which_class: number;
}

interface Teacher {
  user: User;
  qualifications: string;
  areas_of_expertise: string[];
  student_list: Student[];
}

function TeacherProfile() {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [avatarImageUrl, setAvatarImageUrl] = useState(
    "https://github.com/shadcn.png"
  );

  const [updatedTeacherData, setUpdatedTeacherData] = useState<Teacher>({
    user: {
      id: 0,
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      imageURL: "",
      bio: "",
      whatsapp_number: "",
      location: "",
      is_teacher: false,
    },
    qualifications: "",
    areas_of_expertise: [],
    student_list: [],
  });

  useEffect(() => {
    const fetchUsernameFromCache = () => {
      const cachedUsername = localStorage.getItem("username");
      console.log(cachedUsername);
      if (cachedUsername) {
        setUsername(cachedUsername);
      }
    };

    fetchUsernameFromCache();
  }, []);

  useEffect(() => {
    if (username) {
      const fetchTeacherData = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `http://127.0.0.1:8000/api/teacherdetail/${username}`,
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          setTeacher(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching teacher data:", error);
        }
      };

      fetchTeacherData();
    }
  }, [username]);

  const handleInputChange = (field: string, value: any) => {
    setUpdatedTeacherData({
      ...updatedTeacherData,
      user: {
        ...updatedTeacherData.user,
        [field]: value,
      },
    });
    console.log(value);
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        "http://127.0.0.1:8000/api/edit/teacher",
        updatedTeacherData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setTeacher(response.data);
      setUpdatedTeacherData(response.data);
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating teacher profile:", error);
    }
  };

  useEffect(() => {
    const handleSaveShortcut = (event: {
      ctrlKey: any;
      key: string;
      preventDefault: () => void;
    }) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        handleSaveChanges();
      }
    };

    document.addEventListener("keydown", handleSaveShortcut);

    return () => {
      document.removeEventListener("keydown", handleSaveShortcut);
    };
  }, []);

  return (
    <div className="min-h-full overflow-y-hidden bg-gray-100 dark:bg-[#0f0f0f]">
      <div className="container mx-auto py-8 ">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3">
            <div className="bg-white dark:bg-[#1b1b1b] shadow rounded-3xl p-6">
              <div className="flex flex-col items-center">
                {teacher && (
                  <React.Fragment>
                    <Avatar className="cursor-pointer h-48 w-48 mb-4">
                      <AvatarImage src={avatarImageUrl} />
                    </Avatar>
                    <div className="grid-cols-4 sm:grid-cols-12 px-2 ">
                      <p className="text-xl md:text-4xl font-bold">{`${teacher.user.first_name} ${teacher.user.last_name}`}</p>
                    </div>

                    <div className="grid-cols-4 sm:grid-cols-12 px-2 mt-2">
                      <p className="text-md md:text-xl font-bold">
                        {teacher.qualifications}
                      </p>
                    </div>
                    <div className="grid-cols-4 sm:grid-cols-12 px-2 py-2 mt-2">
                      <p className="text-md md:text-xl font-bold">
                        {teacher.user.bio}
                      </p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-4 justify-center">
                      <div className="flex grid-cols-4 sm:grid-cols-12 px-2 py-2 mt-2 mx-2border border-gray-200 rounded-xl">
                        <span className="font-bold text-gray-500 text-lg mr-2">
                          +91
                        </span>
                        <p className="text-md md:text-xl font-bold">
                          {teacher.user.whatsapp_number}
                        </p>
                      </div>
                      <div className="grid-cols-4 sm:grid-cols-12 px-2 py-2 mt-2 mx-2 border border-gray-200 rounded-xl">
                        <p className="text-md md:text-xl font-bold">
                          {teacher.user.email}
                        </p>
                      </div>
                    </div>
                  </React.Fragment>
                )}
              </div>
              <hr className="my-6 border-t border-gray-300" />
              <div className="flex flex-col">
                <span className="dark:text-[#F8F8FF] text-[#1f1f1f] uppercase font-bold tracking-wider mb-2 text-lg md:text-2xl">
                  Subjects
                </span>
                <div className="flex flex-wrap items-center justify-center mt-2 space-y-1">
                  <TooltipProvider>
                    {teacher &&
                      teacher.areas_of_expertise.map((area, index) => (
                        <Tooltip key={index}>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              className="rounded-full bg-gray-100 border-none text-md md:text-xl border-2 mx-2 my-2"
                            >
                              {area}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Contact to know more</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                  </TooltipProvider>
                </div>
              </div>

              {/* <div className="mt-8">
                <div className="flex flex-grow bg-gray-100 dark:bg-[#2F2F2F] rounded-xl px-2 py-2 focus-within:shadow-md text-gray-600 dark:text-[#f8f9fa]">
                  <Button variant="ghost">
                    <ScanSearch color="gold" />
                  </Button>
                  <input
                    type="text"
                    placeholder="Enter Code"
                    className="bg-transparent !outline-none border-0"
                  />
                </div>
              </div> */}
            </div>
          </div>
          <div className="col-span-4 sm:col-span-9">
            <Dashboard />
          </div>
        </div>
      </div>
      <div className="fixed botom-0 w-full">
        <Footer />
      </div>
    </div>
  );
}

export default TeacherProfile;
