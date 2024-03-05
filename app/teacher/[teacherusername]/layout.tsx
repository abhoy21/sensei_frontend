import { Navbar } from "@/app/(home)/_Components/Navbar";
import { Toaster } from "@/components/ui/toaster";

const TeacherStudentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className="h-screen w-screen">{children}</main>
      <Toaster />
    </div>
  );
};

export default TeacherStudentLayout;
