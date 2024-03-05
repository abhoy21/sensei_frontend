import { Avatar, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { AtSign } from "lucide-react";
import React, { useEffect, useState } from "react";

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

function Dashboard() {
  const [teacher, setTeacher] = useState<Teacher | null>(null);

  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsernameFromCache = () => {
      const cachedUsername = sessionStorage.getItem("username");

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
            `https://sensei-backend.onrender.com//api/teacherdetail/${username}`,
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          setTeacher(response.data);
          // console.log(response.data);
        } catch (error) {
          console.error("Error fetching teacher data:", error);
        }
      };

      fetchTeacherData();
    }
  }, [username]);

  return (
    <div>
      <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
        <div className="flex-grow overflow-hidden h-full flex flex-col">
          <div className="flex-grow flex overflow-x-hidden">
            <div className="flex-grow bg-white dark:bg-gray-900 overflow-y-auto">
              <div className="sm:px-7 sm:pt-7 px-4 pt-4 flex flex-col w-full border-b border-gray-200 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800 sticky top-0">
                <div className="flex w-full items-center">
                  <div className="flex items-center text-3xl text-gray-900 dark:text-white">
                    <Avatar className="w-12 h-12 mr-4 rounded-full">
                      <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                    <h5>
                      {teacher?.user.first_name} {teacher?.user.last_name}{" "}
                    </h5>
                  </div>
                  <div className="ml-auto sm:flex hidden items-center justify-end">
                    <div className="text-right">
                      <div className="text-xs text-gray-400 dark:text-gray-400">
                        Total Students:
                      </div>
                      <div className="text-gray-900 text-lg dark:text-white">
                        {teacher?.student_list.length}
                      </div>
                    </div>
                    <button className="w-8 h-8 ml-4 text-gray-400 shadow dark:text-gray-400 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx={12} cy={12} r={1} />
                        <circle cx={19} cy={12} r={1} />
                        <circle cx={5} cy={12} r={1} />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:mt-7 mt-4">
                  <a
                    href="#"
                    className="px-3 border-b-2 border-yellow-300 text-yellow-300 dark:text-white dark:border-white pb-1.5"
                  >
                    Students
                  </a>
                </div>
              </div>
              <div className="sm:p-7 p-4">
                <table className="w-full text-center">
                  <thead>
                    <tr className="text-gray-400">
                      <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                        Name
                      </th>
                      <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                        Username
                      </th>
                      <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 hidden md:table-cell">
                        Email
                      </th>
                      <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                        Class
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 dark:text-gray-100">
                    {teacher?.student_list.map((student, index) => (
                      <tr>
                        <td
                          key={index}
                          className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800"
                        >
                          <div className="flex items-center justify-center">
                            <Avatar className="mr-4">
                              <AvatarImage src="https://github.com/shadcn.png" />
                            </Avatar>
                            {student.user.first_name} {student.user.last_name}
                          </div>
                        </td>
                        <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                          <div className="flex items-center justify-center">
                            <AtSign size="18" className="mr-2" />
                            {student.user.username}
                          </div>
                        </td>
                        <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">
                          S{student.user.email}
                        </td>
                        <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-yellow-400">
                          {student.which_class}
                        </td>
                        {/* <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                        <div className="flex items-center">
                          <div className="sm:flex hidden flex-col">
                            24.12.2020
                            <div className="text-gray-400 text-xs">
                              11:16 AM
                            </div>
                          </div>
                          <button className="w-8 h-8 inline-flex items-center justify-center text-gray-400 ml-auto">
                            <svg
                              viewBox="0 0 24 24"
                              className="w-5"
                              stroke="currentColor"
                              strokeWidth={2}
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx={12} cy={12} r={1} />
                              <circle cx={19} cy={12} r={1} />
                              <circle cx={5} cy={12} r={1} />
                            </svg>
                          </button>
                        </div>
                      </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
