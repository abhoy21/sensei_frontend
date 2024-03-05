"use client";

import React, { FormEvent, useState } from "react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import axios, { AxiosError, AxiosResponse, isAxiosError } from "axios";

interface FormData {
  username: string;
  password: string;
}
interface ApiResponse {
  token: string;
}

const LoginForm = (): JSX.Element => {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const { ...requestData } = formData;

      const response: AxiosResponse<ApiResponse> =
        await axios.post<ApiResponse>(
          "https://sensei-backend.onrender.com/api-token-auth/",
          requestData
        );
      console.log("Login Done", response.data);
      toast({
        description: "LogIn Successfully!",
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", formData.username);

      sessionStorage.setItem("token", response.data.token);

      sessionStorage.setItem("username", formData.username);
      router.push("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ error: string }>;
        if (axiosError.response?.data?.error) {
          console.error("API Error:", axiosError.response.data.error);
        } else {
          console.error("Unexpected Error:", axiosError.message);
        }
      } else {
        console.error("Unexpected Error:", (error as Error).message);
      }
    }
  };

  return (
    <div>
      <div className="flex dark:hidden">
        <form className="form_mainLoginLight" action="" onSubmit={handleSubmit}>
          <p className="headingLoginLight">Login</p>
          <div className="inputContainerLoginLight">
            <svg
              viewBox="0 0 16 16"
              fill="#2e2e2e"
              height={16}
              width={16}
              xmlns="http://www.w3.org/2000/svg"
              className="inputIconLoginLight"
            >
              <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
            </svg>
            <input
              name="username"
              placeholder="Username"
              className="inputFieldLoginLight"
              type="text"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="inputContainerLoginLight">
            <svg
              viewBox="0 0 16 16"
              fill="#2e2e2e"
              height={16}
              width={16}
              xmlns="http://www.w3.org/2000/svg"
              className="inputIconLoginLight"
            >
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            </svg>
            <input
              name="password"
              placeholder="Password"
              className="inputFieldLoginLight"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button id="buttonLoginLight" type="submit">
            Submit
          </button>
          <div className="signupContainerLoginLight">
            <p>Don&apos;t have any account?</p>
            <a href="/register">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
