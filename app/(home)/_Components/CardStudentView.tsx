"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useRouter } from "next/navigation";
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
  location: string;
  is_teacher: boolean;
}

interface Teacher {
  user: User;
  qualifications: string;
  areas_of_expertise: string[];
  student_list: any[];
}

function CardStudentView() {
  const router = useRouter();

  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://127.0.0.1:8000/api/teacherslist",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setTeachers(response.data);

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    }

    fetchTeachers();
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center w-full">
      {teachers.map((teacher) => (
        <div key={teacher.user.id} className="parent my-8 mx-8">
          <div
            className="card !cursor-pointer"
            onClick={() => {
              router.push(`/teacher/${teacher.user.username}`);
            }}
          >
            <div className="logo">
              <span className="circle circle1" />
              <span className="circle circle2" />
              <span className="circle circle3" />
              <span className="circle circle4" />
              <span className="circle circle5">
                <Avatar className="cursor-pointer w-28 h-28 z-50">
                  <AvatarImage
                    src={
                      teacher.user.imageURL || "https://github.com/shadcn.png"
                    }
                  />
                </Avatar>
              </span>
            </div>
            <div className="glass" />
            <div className="content">
              <span className="title">
                {teacher.user.first_name} {teacher.user.last_name}
              </span>
              <span className="text hidden md:flex">{teacher.user.bio}</span>
              <span className="text font-bold">{teacher.qualifications}</span>
            </div>
            <div className="bottom">
              <div className="social-buttons-container">
                <a
                  href={`https://wa.me/+91${teacher.user.whatsapp_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="social-button .social-button1">
                    <svg
                      viewBox="0 0 30 30"
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg !w-8 ml-2"
                    >
                      <path
                        id="path4"
                        d="M16.6,14c-0.2-0.1-1.5-0.7-1.7-0.8c-0.2-0.1-0.4-0.1-0.6,0.1c-0.2,0.2-0.6,0.8-0.8,1c-0.1,0.2-0.3,0.2-0.5,0.1c-0.7-0.3-1.4-0.7-2-1.2c-0.5-0.5-1-1.1-1.4-1.7c-0.1-0.2,0-0.4,0.1-0.5c0.1-0.1,0.2-0.3,0.4-0.4c0.1-0.1,0.2-0.3,0.2-0.4c0.1-0.1,0.1-0.3,0-0.4c-0.1-0.1-0.6-1.3-0.8-1.8C9.4,7.3,9.2,7.3,9,7.3c-0.1,0-0.3,0-0.5,0C8.3,7.3,8,7.5,7.9,7.6C7.3,8.2,7,8.9,7,9.7c0.1,0.9,0.4,1.8,1,2.6c1.1,1.6,2.5,2.9,4.2,3.7c0.5,0.2,0.9,0.4,1.4,0.5c0.5,0.2,1,0.2,1.6,0.1c0.7-0.1,1.3-0.6,1.7-1.2c0.2-0.4,0.2-0.8,0.1-1.2C17,14.2,16.8,14.1,16.6,14 M19.1,4.9C15.2,1,8.9,1,5,4.9c-3.2,3.2-3.8,8.1-1.6,12L2,22l5.3-1.4c1.5,0.8,3.1,1.2,4.7,1.2h0c5.5,0,9.9-4.4,9.9-9.9C22,9.3,20.9,6.8,19.1,4.9 M16.4,18.9c-1.3,0.8-2.8,1.3-4.4,1.3h0c-1.5,0-2.9-0.4-4.2-1.1l-0.3-0.2l-3.1,0.8l0.8-3l-0.2-0.3C2.6,12.4,3.8,7.4,7.7,4.9S16.6,3.7,19,7.5C21.4,11.4,20.3,16.5,16.4,18.9"
                      />
                    </svg>
                  </button>
                </a>
                <button className="social-button .social-button2">
                  <svg
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg mt-1"
                  >
                    <path
                      id="Path_76"
                      data-name="Path 76"
                      d="M-8.417,3.169a2.493,2.493,0,0,0-.707-.707A2.481,2.481,0,0,0-10.5,2.045h-11a2.481,2.481,0,0,0-1.376.417,2.493,2.493,0,0,0-.707.707A2.483,2.483,0,0,0-24,4.545v6.91a2.5,2.5,0,0,0,2.5,2.5h11a2.5,2.5,0,0,0,2.5-2.5V4.545A2.483,2.483,0,0,0-8.417,3.169ZM-21.5,3.045h11a1.48,1.48,0,0,1,.643.151L-16,9.338-22.143,3.2A1.48,1.48,0,0,1-21.5,3.045Zm11,9.91h-11a1.48,1.48,0,0,1-.643-.151l3.087-3.087a.5.5,0,0,0,0-.707.5.5,0,0,0-.707,0L-22.85,12.1a1.489,1.489,0,0,1-.15-.642V4.545a1.489,1.489,0,0,1,.15-.642l6.5,6.5a.5.5,0,0,0,.354.146.5.5,0,0,0,.354-.146l6.5-6.5A1.489,1.489,0,0,1-9,4.545v6.91a1.489,1.489,0,0,1-.15.642L-12.237,9.01a.5.5,0,0,0-.707,0,.5.5,0,0,0,0,.707L-9.857,12.8A1.48,1.48,0,0,1-10.5,12.955Z"
                      transform="translate(24 -2.045)"
                    />
                  </svg>
                </button>
                {/* <button className="social-button .social-button3">
                  <svg
                    viewBox="0 0 640 512"
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg"
                  >
                    <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
                  </svg>
                </button> */}
              </div>
              {/* <div className="view-more">
                <button className="view-more-button">View more</button>
                <svg
                  className="svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardStudentView;
