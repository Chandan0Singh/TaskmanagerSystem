"use client";

import { useState, useEffect } from "react";

const TaskTable = () => {
  const data = [
   
  ];

  const statuses = ["Done", "Pending", "Late", "In Review", "Open"];

  const [selectedStatus, setSelectedStatus] = useState("Open");
  const [showForm, setShowForm] = useState();
  const [count, setCount] = useState(data.length + 1);

  const [newTask, setNewTask] = useState({
    client: "",
    project: "",
    subject: "",
    createdBy: "",
    assignedTo: "",
    startDate: "",
    time: "",
    deadline: "",
    status: "Open",
  });

  const statusHandler = (id, newStatus) => {
    console.log(id);
    console.log(newStatus);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewTask({
      id: count,
      client: "",
      project: "",
      subject: "",
      createdBy: "",
      assignedTo: "",
      startDate: "",
      time: "",
      deadline: "",
      status: "Open",
    });
    setTasks([...tasks, newTask]);
    setCount(count + 1);
    setShowForm(false);

    console.log(count);
  };

  const handleClose = (id) => {
    setTasks(tasks.filter((task) => task.id != id));
  };

  return (
    <div className="flex relative mx-auto ">
      <div className="  mx-auto w-7xl">
        {/* Search Bar */}
        <div className="flex justify-between mb-3">
          <div className="flex items-center">
            <p className=" pr-2 text-lg font-semibold">Search:</p>
            <input
              placeholder="Search task..."
              className="w-96 py-1 pl-6 px-1 border border-none bg-gray-200 rounded-full focus:outline-none focus:ring-2"
            />
          </div>
          <div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-[#ffba00] text-white px-6 py-2 rounded-full hover:scale-110 transition duration-200 "
            >
              Create Task
            </button>
          </div>
        </div>

        {/* Task Table */}
        <div className=" overflow-hidden ">
          <table className=" border-[#ffba00] border-2 rounded-2xl text-center w-7xl me-2">
            <thead className=" text-sm">
              <tr className="">
                {[
                  "S no.",
                  "User",
                  "Designation",
                  "Department",
                  "Emp. Layer",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="border border-[#ffba00] px-4 py-2"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="w-8xl text-sm">
              {data.map((item, index) => (
                <tr key={item.id} className=" bg-white hover:bg-[ffba00] ">
                  <td className="border-2 border-[#ffba00]  ">{index + 1}</td>
                  <td className="border-2 border-[#ffba00] px-2  ">
                    <input className="w-full h-full bg-transparent border-none focus:ring-0 outline-none" />
                  </td>
                  <td className="border-2 border-[#ffba00]  px-2">
                    <input className="w-full items-center h-full bg-transparent border-none focus:ring-0 outline-none" />
                  </td>
                  <td className="border-2 border-[#ffba00]  ">
                    <span className="bg-blue-500 text-sm block  text-white px-3 py-1 rounded-full">
                      {item.department}
                    </span>
                  </td>
                  <td className="border-2 border-[#ffba00] px-4 py-1">
                    <input />
                  </td>
                  <td className="border-2 border-[#ffba00] px-4 py-1">
                    <input className="w-full bg-transparent border-none focus:ring-0 outline-none" />
                  </td>

                  <td className="border-2 border-[#ffba00] px-4 py-1">
                    <button
                      onClick={() => handleClose(task.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded-full text-sm  hover:bg-red-700 transition duration-200 cursor-pointer"
                    >
                      Close
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskTable;
