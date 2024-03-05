"use client";

import React, { useEffect, useState } from "react";
import Header from "./_Components/Header";
import { Footer } from "./_Components/Footer";

import LandinPage from "./_Components/LandinPage";
import TeacherProfile from "./_Components/TeacherProfile";
import axios from "axios";
import CardStudentView from "./_Components/CardStudentView";

function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
      const username = sessionStorage.getItem("username");
      axios
        .get(
          `https://sensei-backend.onrender.com//api/is_teacher/${username}`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then((response) => {
          setIsTeacher(response.data.is_teacher);
        })
        .catch((error) => {
          console.error("Teacher naki student dhorte parben na:", error);
        });
    }
  }, []);

  return (
    <div className="min-h-full flex flex-col dark:bg-[#0F0F0F]">
      {isAuthenticated ? (
        isTeacher ? (
          <div>
            <TeacherProfile />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
            <Header />

            <div className="w-[90%]">
              <h1 className="text-2xl md:text-5xl font-bold flex flext-start items-center py-16 bg-clip-text text-transparent bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:bg-gradient-to-r dark:from-gray-100 dark:to-gray-900">
                <svg
                  fill="#FDE68A"
                  width="80px"
                  height="80px"
                  viewBox="0 0 96 96"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M38.892 14.296C26.973 19.323 15.061 32.693 15.01 41.102c-.009 1.359-2.437 8.367-13.59 39.218L.039 84.141l27.731-.321c31.091-.359 32.628-.667 41.006-8.237 18.829-17.01 3.415-50.678-20.822-45.48-20.01 4.292-21.144 34.431-1.379 36.658 12.603 1.421 18.192-11.422 8.707-20.006-1.841-1.666-2.037-1.62-4.623 1.079-2.699 2.817-2.699 2.82-.68 4.647 4.522 4.092 1.159 8.906-4.439 6.355-6.306-2.873-7.474-12.102-2.199-17.377 13.386-13.386 34.151 8.644 23.31 24.731-16.699 24.779-55.114-1.28-42.293-28.69 8.743-18.692 31.564-23.429 50.15-10.41l5.702 3.995 7.395-5.566c8.152-6.136 8.232-6.278 5.458-9.658-2.098-2.557-1.74-2.656-8.938 2.474l-3.978 2.835-8.663-4.293c-11.285-5.592-23.213-6.537-32.592-2.581M16 62.281c0 .371-1.105 3.609-2.455 7.196L11.09 76h15.259l-2.071-2.25c-1.138-1.237-3.467-4.476-5.174-7.196C17.397 63.834 16 61.911 16 62.281"
                    fill-rule="evenodd"
                  />
                </svg>
                Top Sensei&apos;s
              </h1>
              <hr className="-mt-12 mb-8" />
              <CardStudentView />
            </div>

            <div className="w-full">
              <Footer />
            </div>
          </div>
        )
      ) : (
        <div>
          <LandinPage />
        </div>
      )}
    </div>
  );
}

export default HomePage;
