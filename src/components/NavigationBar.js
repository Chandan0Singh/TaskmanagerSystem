"use client";
import Logo from "@assets/Logo.jpeg";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";;
import { usePathname } from "next/navigation"; // Correct hook
import { useEffect, useState } from "react";

const NavigationBar = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get current path
  const [totalCount, setTotalCount] = useState(0);

  const fetchTask = async() => {
    try {
      const response = await axios.get("http://localhost:3000/api/user/signup/tasks")
      setTotalCount(response.data.result.length)
    } catch (error) {
      console.log("error",error)
    }
  }

  useEffect(()=> {
    fetchTask();
  },[])

  const goToUsers = () => {
    router.push("/users");
  };

  const goToDesignation = () => {
    router.push("/Designation");
  };

  const goToTasks = () => {
    router.push("/tasks");
  };

  const goToDepartments = () => {
    router.push("/departments");
  };

  return (
    <div className="flex items-center w-6xl">
      <div className="font-bold text-lg ">
        <Image src={Logo} alt="Logo" width={70} height={70} />
      </div>
      {/* Navigation bar */}
      <div className="flex justify-between bg-[#ffba00] flex-grow ml-2 rounded-full shadow-lg">
        <div className="flex ">
          <div className=" px-5 py-3"></div>
          <div
            onClick={goToTasks}
            className={`px-4 py-3 font-semibold hover:bg-gray-700 hover:text-white cursor-pointer hover:transition duration-150 ${pathname === "/tasks" ? "bg-gray-700 text-white" : ""}`}
          >
            AMD Task
          </div>

          <div
            onClick={goToDepartments}
            className={`px-4 py-3 font-semibold hover:bg-gray-700 hover:text-white cursor-pointer hover:transition duration-150 ${pathname === "/departments" ? "bg-gray-700 text-white" : ""}`}
          >
            User Management
            
          </div>
          <div
            onClick={goToUsers}
            className={`px-4 py-3 font-semibold hover:bg-gray-700 hover:text-white cursor-pointer hover:transition duration-150 ${pathname === "/users" ? "bg-gray-700 text-white" : ""}`}
          >
            Manage Project
          </div>
          <div
            onClick={goToDesignation}
            className={`px-4 py-3 font-semibold hover:bg-gray-700 hover:text-white cursor-pointer hover:transition duration-150 ${pathname === "/Designation" ? "bg-gray-700 text-white" : ""}`}
          >
           Designation
          </div>
        </div>
        <div className=" px-8 py-3  font-semibold  text-white ">
          Total Active Tasks: <span className=" font-bold text-black">{totalCount}</span>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
