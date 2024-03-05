"use client";

import Lottie from "lottie-react";
import { UploadCloud } from "lucide-react";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import loginanimation from "../../public/assets/Animation - login.json";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDB } from "@/firebase";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

type Checked = DropdownMenuCheckboxItemProps["checked"];
interface FormData {
  is_teacher: boolean;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  whatsapp_number: string;
  bio: string;
  which_class: string;
  qualifications: string;
  areas_of_expertise: string[];
  location: string;
  password: string;
  imageURL: string;
}

function RegisterForm() {
  const router = useRouter();
  const [boolteacher, setBoolTeacher] = useState(false);
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [fileSelected, setFileSelected] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<FormData>({
    is_teacher: false,
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    whatsapp_number: "",
    bio: "",
    which_class: "",
    qualifications: "",
    areas_of_expertise: [],
    location: "",
    password: "",
    imageURL: "",
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setFileSelected(true);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    let imageURL = "";
    if (imageFile) {
      const storageRef = ref(imageDB, imageFile.name);
      await uploadBytes(storageRef, imageFile);
      imageURL = await getDownloadURL(storageRef);
      formData.imageURL = imageURL;
      formData.areas_of_expertise = selectedSubjects;
      console.log(imageURL);
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });
      const data = await response.json();
      console.log("User registered successfully:", data);
      toast({
        description: "Registration Successfull! Please Log In.",
      });
      router.push("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (boolteacher) {
      console.log("teacher e shift korechis kintu bal", boolteacher);
    } else {
      console.log(
        "student e firegachis kintu ki holo porate bhoi lagche?",
        boolteacher
      );
    }
  }, [boolteacher]);

  const handleCheckboxClick = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      is_teacher: !prevFormData.is_teacher,
    }));
    setBoolTeacher((prevBoolTeacher) => !prevBoolTeacher);
  };

  const subjects = [
    "Maths",
    "Science",
    "Computer",
    "English",
    "History",
    "Geography",
  ];

  return (
    <div className="flex items-center">
      <div className="hidden md:flex">
        <a href="/">
          <Lottie animationData={loginanimation} className="h-[50rem]" />
        </a>
      </div>
      <div className="">
        <form className="formRegisterDark space-y-4" onSubmit={handleSubmit}>
          <p className="titleRegisterDark">Register </p>
          <p className="messageRegisterDark">
            Signup now and get full access to the Website.{" "}
          </p>
          <div className="flexRegisterDark">
            <label>
              <input
                className="inputRegisterDark"
                type="text"
                name="first_name"
                placeholder=""
                value={formData.first_name}
                onChange={handleChange}
              />
              <span>First Name</span>
            </label>
            <label>
              <input
                className="inputRegisterDark"
                type="text"
                name="last_name"
                placeholder=""
                value={formData.last_name}
                onChange={handleChange}
              />
              <span>Last Name</span>
            </label>
          </div>
          <label>
            <input
              name="username"
              placeholder=""
              value={formData.username}
              onChange={handleChange}
              type="text"
              className="inputRegisterDark"
            />
            <span>Username</span>
          </label>
          <label>
            <input
              className="inputRegisterDark"
              type="email"
              name="email"
              placeholder=""
              value={formData.email}
              onChange={handleChange}
            />
            <span>Email</span>
          </label>
          <label>
            <input
              name="whatsapp_number"
              placeholder=""
              value={formData.whatsapp_number}
              onChange={handleChange}
              type="text"
              className="inputRegisterDark"
            />
            <span>Whatsapp No.</span>
          </label>
          <label>
            <input
              name="bio"
              placeholder=""
              value={formData.bio}
              onChange={handleChange}
              type="text"
              className="inputRegisterDark"
            />
            <span>Bio</span>
          </label>
          <label>
            <input
              name="location"
              placeholder=""
              value={formData.location}
              onChange={handleChange}
              type="text"
              className="inputRegisterDark"
            />
            <span>Location</span>
          </label>
          <label>
            <input
              className="inputRegisterDark"
              type="password"
              name="password"
              placeholder=""
              value={formData.password}
              onChange={handleChange}
            />
            <span>Password</span>
          </label>

          <div className="my-6 flex items-center justify-center">
            <span className="mr-4 text-lg text-gray-300 bg-[#0f0f0f] py-2 px-4 rounded-lg">
              Student
            </span>
            <label className="tgl">
              <input type="checkbox" onClick={handleCheckboxClick} />
              <span className="slider" />
            </label>
            <span className="ml-4 text-lg text-gray-300 bg-[#0f0f0f] py-2 px-4 rounded-lg">
              Teacher
            </span>
          </div>

          {boolteacher ? (
            <>
              <label>
                <input
                  className="inputRegisterDark"
                  type="text"
                  name="qualifications"
                  placeholder=""
                  value={formData.qualifications}
                  onChange={handleChange}
                />
                <span>Qualifications</span>
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-transparent">
                    {" "}
                    Choose Subjects
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Choose</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {subjects.map((subject, index) => (
                    <DropdownMenuCheckboxItem
                      key={index}
                      checked={selectedSubjects.includes(subject)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedSubjects((prevSubjects) => [
                            ...prevSubjects,
                            subject,
                          ]);
                        } else {
                          setSelectedSubjects((prevSubjects) =>
                            prevSubjects.filter((item) => item !== subject)
                          );
                        }
                      }}
                    >
                      {subject}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <label>
              <input
                name="which_class"
                placeholder=""
                value={formData.which_class}
                onChange={handleChange}
                type="text"
                className="inputRegisterDark"
              />
              <span>Which Class</span>
            </label>
          )}

          <label className="submitRegisterDark cursor-pointer">
            <span className="flex items-center justify-center text-[#0f0f0f]">
              <UploadCloud className="mr-4" />
              Upload Image
            </span>
            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
          <button className="submitRegisterDark !text-lg font-bold">
            Submit
          </button>
          <p className="signinRegisterDark">
            Already have an acount ? <a href="/login">Login</a>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
