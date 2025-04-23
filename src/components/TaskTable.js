"use client";

import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const TaskTable = ({ designationOption }) => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const fetchTask = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/user/signup/tasks"
      );
      console.log("response from task table", response.data.result);

      const mappedTasks = response.data.result.map((t, index) => ({
        id: t._id || index + 1,
        client: t.client || "",
        projectName: t.project || "",
        subject: t.subject || "",
        createdBy: t.createdBy || "",
        assignTo: t.assignedTo || "",
        assignToDesignation: t.assignToDesignation || "",
        startDate: t.startDate || "",
        deadline: t.deadline || "",
        time: t.time || "",
        status: t.status || "",
      }));

      setTasks(mappedTasks);
      setFilteredTasks(mappedTasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (designationOption === "All") {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(
        (task) => task.assignToDesignation === designationOption
      );
      setFilteredTasks(filtered);
    }
  }, [designationOption, tasks]);

  useEffect(() => {
    fetchTask();
  }, []);

  const rowRefs = useRef({});

  useEffect(() => {
    setShowSuggestion(searchTerm.trim().length > 0);
  }, [searchTerm]);

  const filteredSuggestions = tasks.filter(
    (task) =>
      task.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchSelect = (task) => {
    setSearchTerm(task.subject);
    setShowSuggestion(false);
    const row = rowRefs.current[task.id];
    if (row) {
      row.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlightedRow(task.id);
      setTimeout(() => setHighlightedRow(null), 2000);
    }
  };

  const handleAddTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
    setShowForm(false);
  };

  return (
    <>


      <div className="flex relative mx-auto w-full">
        <div className="w-full">
          {/* Search & Create Task */}
          <div className="flex justify-between mb-3 w-[90%] mx-auto">
            <div className="flex items-center mt-1">
              <p className="pr-2 text-lg font-semibold">Search:</p>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search task..."
                className="w-96 py-1 pl-6 bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ffba00]"
              />
            </div>

            {showSuggestion && (
              <div className="w-96 max-h-[200px] overflow-y-auto rounded-[15px] absolute top-[5vh] left-[11vw] py-2 bg-white border-2 border-[#ffba00] z-50 shadow-md">
                {filteredSuggestions.map((s, i) => (
                  <div
                    key={i}
                    onClick={() => handleSearchSelect(s)}
                    className="cursor-pointer px-4 py-2 hover:bg-[#ffba00]"
                  >
                    {s.client} - {s.projectName}
                  </div>
                ))}
                {filteredSuggestions.length === 0 && (
                  <div className="text-center text-gray-600 py-2">
                    No results found.
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Task Table */}
          <div className="overflow-y-auto w-[90%] h-[44vh] border-2 border-[#ffba00] rounded-[20px] overflow-auto mx-auto">
            <table className="w-full table-fixed text-sm text-center">
              <thead>
                <tr>
                  {[
                    "S No.",
                    "Client",
                    "Project Name",
                    "Subject",
                    "Created By",
                    "Assign To",
                    "Assigned To Designation",
                    "Start Date",
                    "Deadline",
                    "Time",
                    "Status",
                  ].map((head) => (
                    <th
                      key={head}
                      className="border border-[#ffba00] px-2 py-1"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task, idx) => (
                  <tr
                    key={task.id}
                    ref={(el) => (rowRefs.current[task.id] = el)}
                    className={`bg-white hover:bg-yellow-100 ${
                      highlightedRow === task.id
                        ? "bg-yellow-300 animate-pulse"
                        : ""
                    }`}
                  >
                    <td className="border border-[#ffba00] px-2">{idx + 1}</td>
                    <td className="border border-[#ffba00] px-2 overflow-hidden text-ellipsis">{task.client}</td>
                    <td className="border border-[#ffba00] px-2 overflow-hidden text-ellipsis">{task.projectName}</td>
                    <td className="border border-[#ffba00] px-2 overflow-hidden text-ellipsis">{task.subject}</td>
                    <td className="border border-[#ffba00] px-2 overflow-hidden text-ellipsis">{task.createdBy}</td>
                    <td className="border border-[#ffba00] px-2 overflow-hidden text-ellipsis">{task.assignTo}</td>
                    <td className="border border-[#ffba00] px-2">{task.assignToDesignation || "-"}</td>
                    <td className="border border-[#ffba00] px-2">{task.startDate}</td>
                    <td className="border border-[#ffba00] px-2">{task.deadline}</td>
                    <td className="border border-[#ffba00] px-2">{task.time}</td>
                    <td className="border border-[#ffba00] px-2">
                      <span
                        className={`px-3 py-1 rounded-full text-white ${
                          {
                            Done: "bg-green-500",
                            Pending: "bg-purple-500",
                            Late: "bg-red-500",
                            Open: "bg-yellow-500",
                            "In Review": "bg-blue-500",
                          }[task.status] || "bg-gray-500"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskTable;