"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Footer } from "../../../(home)/_Components/Footer";
import {
  BookOpenText,
  Mail,
  MessageCircle,
  PenLine,
  ScanSearch,
  StarHalf,
} from "lucide-react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";

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

interface Teacher {
  user: User;
  qualifications: string;
  areas_of_expertise: string[];
  student_list: any[];
}

interface Student {
  rating: number;
  review_content: string;
  student_last_name: string;
  student_first_name: string;
  imageURL: string;
}

function TeacherStudentPreview() {
  const [averageRating, setAverageRating] = useState(0);
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const params = useParams<{ teacherusername: string }>();
  const [sliderValue, setSliderValue] = useState<number[]>([2]);
  const [enteredValue, setEnteredValue] = useState<number>(0);
  const [result, setResult] = useState(null);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewdStudents, setReviewedStudents] = useState<Student[]>([]);

  const calculateAverageRating = () => {
    if (reviewdStudents.length > 0) {
      let totalRating = 0;
      reviewdStudents.forEach((student) => {
        totalRating += student.rating;
      });
      const average = totalRating / reviewdStudents.length;
      setAverageRating(average);
    } else {
      // If no reviews are available, set average rating to 0
      setAverageRating(0);
    }
  };

  useEffect(() => {
    calculateAverageRating();
  }, [reviewdStudents]);

  useEffect(() => {
    if (params.teacherusername) {
      const fetchTeacherData = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `https://sensei-backend.onrender.com/api/teacherdetail/${params.teacherusername}`,
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
  }, [params.teacherusername]);

  useEffect(() => {
    if (params.teacherusername) {
      const fetchreviewedstudents = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `https://sensei-backend.onrender.com/api/teachers/${params.teacherusername}/reviewed_students`,
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          setReviewedStudents(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching teacher data:", error);
        }
      };

      fetchreviewedstudents();
    }
  }, []);

  const addStudentToTeacher = async () => {
    try {
      const token = localStorage.getItem("token");
      const student_username = localStorage.getItem("username");
      const response = await axios.post(
        "https://sensei-backend.onrender.com/api/add_student_to_teacher",

        {
          id: enteredValue,
          username: student_username,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error adding student to teacher:", error);
    }
  };

  useEffect(() => {
    console.log(result);
    const studentUsername = localStorage.getItem("username");
    const fetchreviewallowed = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "https://sensei-backend.onrender.com/api/check_username",
          {
            student_username: studentUsername,
            teacher_username: params.teacherusername,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setResult(response.data.result);
        console.log(response.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (studentUsername && params.teacherusername) {
      fetchreviewallowed();
    }
  }, []);

  const handleCancel = () => {
    setReviewContent("");
    setReviewRating(0);
    setSliderValue([2]);
  };

  const handleReviewSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const student_username = localStorage.getItem("username");
      const response = await axios.post(
        "https://sensei-backend.onrender.com/api/add_review",
        {
          teacher_username: params.teacherusername,
          student_username: student_username,
          content: reviewContent,
          rating: reviewRating,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      // Handle the response appropriately (e.g., show a success message)
      console.log(response.data);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setSliderValue([newValue]);
    setReviewRating(newValue);
  };

  return (
    <div className="min-h-full overflow-y-hidden bg-gray-100 pt-16">
      <>
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
          {/* dark theme */}
          <div className="container  m-4">
            <div className="max-w-3xl w-full mx-auto grid gap-4 grid-cols-1">
              {/* alert */}
              <div className="flex flex-col justify-center p-4 bg-gray-500 border-gray-800 shadow-md hover:shodow-lg rounded-2xl">
                <div className=" text-gray-100 flex items-center ">
                  <img
                    className="w-16 mr-2"
                    src="/assets/logo.png"
                    alt="Logo"
                  />
                  <p>
                    {" "}
                    Check the profile and contact your Sensei, then write the
                    code provided by your Sensei to get added to the batch{" "}
                    <a
                      href="#"
                      className="underline hover:underline-none text-yellow-300 mx-4"
                      target="_blank"
                    >
                      ~ Sensei
                    </a>
                  </p>
                </div>
              </div>
              {/* profile card */}
              {reviewdStudents.map((student, index) => (
                <div key={index} className="flex flex-col sticky top-0 z-10">
                  <div className="bg-gray-200 border border-gray-200 shadow-lg  rounded-2xl p-4">
                    <div className="flex-none sm:flex">
                      <div className=" relative h-32 w-32   sm:mb-0 mb-3">
                        <Avatar className=" w-32 h-32 object-cover rounded-2xl">
                          <AvatarImage
                            src={
                              student.imageURL ||
                              "https://github.com/shadcn.png"
                            }
                          />
                        </Avatar>
                      </div>
                      <div className="flex-auto sm:ml-5 justify-evenly">
                        <div className="flex items-center justify-between sm:mt-2">
                          <div className="flex items-center">
                            <div className="flex flex-col">
                              <div className="w-full flex-none text-lg text-gray-800 font-bold leading-none">
                                {teacher?.user.first_name}{" "}
                                {teacher?.user.last_name}
                              </div>
                              <div className="flex-auto text-gray-800 my-1">
                                <span className="mr-3 ">
                                  {teacher?.qualifications}
                                </span>
                                <span className="mr-3 border-r border-gray-600  max-h-0" />
                                <span>{teacher?.user.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row items-center">
                          <div className="flex">
                            {Array.from(
                              { length: Math.round(averageRating) },
                              (_, index) => (
                                <svg
                                  key={index}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  className="h-5 w-5 text-yellow-400"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                              )
                            )}
                          </div>
                        </div>

                        <div className="flex pt-2  text-sm text-gray-400">
                          <div className="flex-1 inline-flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                            </svg>
                            <p className="">
                              {teacher?.student_list.length} Students
                            </p>
                          </div>

                          <a
                            href={`https://wa.me/+91${teacher?.user.whatsapp_number}`}
                            target="_blank"
                            className="flex items-center flex-no-shrink bg-yellow-300 hover:bg-transparent px-5 ml-4 py-2 text-md shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-yellow-300 hover:border-yellow-500 text-gray-700 rounded-full transition ease-in duration-300"
                          >
                            <MessageCircle size="16" className="mr-2" />
                            Whatsapp
                          </a>
                          <a
                            href={`mailto:${teacher?.user.email}`}
                            target="_blank"
                            className="flex items-center flex-no-shrink bg-transparent hover:bg-yellow-300 px-5 ml-4 py-2 text-md shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-yellow-300 hover:border-yellow-500 text-gray-700 rounded-full transition ease-in duration-300"
                          >
                            <Mail size="16" className="mr-2" />
                            Mail
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/*-stats*/}
              <div className="grid grid-cols-24 gap-4 ">
                <div className="col-span-4 md:col-span-12">
                  <div className="p-4 relative  bg-gray-200 border border-gray-100 shadow-lg  rounded-2xl">
                    <BookOpenText
                      color="gold"
                      size="32"
                      className="absolute bottom-4 right-3"
                    />

                    <div className="text-2xl text-gray-800 font-medium leading-8 mt-2">
                      About Me
                    </div>
                    <div className="text-sm text-gray-600 h-20">
                      {teacher?.user.bio}
                    </div>
                  </div>
                </div>
                <div className="col-span-4 md:col-span-12">
                  <div className="p-4 relative bg-gray-200 border border-gray-100 shadow-lg  rounded-2xl">
                    <div className="text-2xl text-gray-800 font-medium leading-8 mt-2">
                      Subjects
                    </div>
                    <div className="text-sm text-gray-500 h-20">
                      <div className="flex flex-wrap items-center justify-center mt-2 space-y-1">
                        <TooltipProvider>
                          {teacher &&
                            teacher.areas_of_expertise.map((area, index) => (
                              <Tooltip key={index}>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="rounded-full bg-transparent text-md border border-gray-300 mx-2"
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
                  </div>
                </div>
              </div>

              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {/*confirm modal*/}
                {result && (
                  <div className="flex flex-col p-4 relative items-center justify-center bg-gray-200 border border-gray-100 shadow-lg  rounded-2xl">
                    <div className="">
                      <div className="text-center p-5 flex-auto justify-center">
                        <h2 className="text-xl font-bold py-4 text-gray-700">
                          Provide your Feedback to help other New Students
                        </h2>
                        <div className="flex flex-grow bg-gray-100 dark:bg-[#2F2F2F] rounded-xl px-2 py-2 focus-within:shadow-md text-gray-600 dark:text-[#f8f9fa]">
                          <Button variant="ghost">
                            <PenLine color="gold" />
                          </Button>
                          <input
                            type="text"
                            placeholder="Write a Review"
                            className="bg-transparent !outline-none border-0"
                            onChange={(e) =>
                              setEnteredValue(parseInt(e.target.value))
                            }
                          />
                        </div>
                      </div>

                      <div className="flex flex-row items-center justify-center">
                        <div className="flex">
                          <input
                            type="range"
                            min="0"
                            max="5"
                            defaultValue="2"
                            onChange={handleSliderChange}
                            className="bg-transparent !outline-none border-0"
                          />
                        </div>
                        <div>
                          <span className="ml-2 text-gray-500">
                            {sliderValue}
                          </span>
                        </div>
                      </div>

                      <div className="p-3  mt-2 text-center space-x-4 md:block">
                        <button
                          className="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-yellow-300 hover:bg-yellow-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-yellow-300 hover:border-yellow-500 text-black rounded-full transition ease-in duration-300"
                          onClick={handleReviewSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {/*elements*/}
                <div className="flex flex-col space-y-4">
                  {/* elements 1 */}
                  {reviewdStudents.map((student, index) => (
                    <div
                      key={index}
                      className="flex flex-col p-4 bg-gray-200 border-gray-800 shadow-md hover:shodow-lg rounded-2xl cursor-pointer transition ease-in duration-500  transform hover:scale-105"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center mr-auto">
                          <div className="inline-flex w-12 h-12">
                            <Avatar className="cursor-pointer w-12 h-12 rounded-2xl">
                              <AvatarImage
                                src={
                                  student.imageURL ||
                                  "https://github.com/shadcn.png"
                                }
                              />
                            </Avatar>
                            <span className="absolute animate-pulse w-12 h-12 inline-flex border-2 rounded-2xl border-yellow-400 opacity-75" />
                            <span />
                          </div>
                          <div className="flex flex-col ml-3">
                            <div className="font-medium leading-none text-gray-800">
                              {student.student_first_name}{" "}
                              {student.student_last_name}
                            </div>
                            <p className="text-sm text-gray-500 leading-none mt-1">
                              {student.review_content}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/*elements 2*/}
                </div>
                <div className="flex flex-col justify-center p-4 bg-gray-200 border-gray-800 shadow-md hover:shodow-lg rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-grow bg-gray-100 rounded-xl px-2 py-2 focus-within:shadow-md text-gray-600 dark:text-[#f8f9fa]">
                      <Button variant="ghost" onClick={addStudentToTeacher}>
                        <ScanSearch color="gold" />
                      </Button>
                      <input
                        type="text"
                        placeholder="Enter Code"
                        className="bg-transparent !outline-none border-0"
                        onChange={(e) =>
                          setEnteredValue(parseInt(e.target.value))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default TeacherStudentPreview;
