"use client";

import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CreateTask from "./createTaskForm";

const TaskTable = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      client: "Jungle morels",
      projectName: "Office Operations",
      subject: "Making salaries",
      createdBy: "Suraj Poswal",
      assignTo: "Aman ",
      assignToSurname:"Negi",
      inputsReceived: "21/03/25",
      startDate: "21/03/25",
      deadline: "24/03/25",
      time: "6:43 pm",
      status: "Open",
      sentToClient: "Close",
      feedbackReceived: "21/03/25",
      feedbackSent: "21/03/25"
    },
    {
      id: 2,
      client: "CH BZR",
      projectName: "Character Bazaar",
      subject: "Work on Add",
      createdBy: "Self",
      assignTo: "Vishal",
      assignToSurname:" Bisht",
      inputsReceived: "21/03/25",
      startDate: "21/03/25",
      deadline: "24/03/25",
      time: "10:11 am",
      status: "Open",
      sentToClient: "Close",
      feedbackReceived: "21/03/25",
      feedbackSent: "21/03/25"
    },
    {
      id: 3,
      client: "CH BZR",
      projectName: "Character Bazaar",
      subject: "Work on Add",
      createdBy: "Self",
      assignTo: "Vishal",
      assignToSurname:" Bisht",
      inputsReceived: "21/03/25",
      startDate: "21/03/25",
      deadline: "24/03/25",
      time: "10:11 am",
      status: "Open",
      sentToClient: "Close",
      feedbackReceived: "21/03/25",
      feedbackSent: "21/03/25"
    },
    {
      id: 4,
      client: "CH BZR",
      projectName: "Character Bazaar",
      subject: "Work on Add",
      createdBy: "Self",
      assignTo: "Vishal",
      assignToSurname:" Bisht",
      inputsReceived: "21/03/25",
      startDate: "21/03/25",
      deadline: "24/03/25",
      time: "10:11 am",
      status: "Open",
      sentToClient: "Close",
      feedbackReceived: "21/03/25",
      feedbackSent: "21/03/25"
    },
    {
      id: 5,
      client: "CH BZR",
      projectName: "Character Bazaar",
      subject: "Work on Add",
      createdBy: "Self",
      assignTo: "Vishal",
      assignToSurname:" Bisht",
      inputsReceived: "21/03/25",
      startDate: "21/03/25",
      deadline: "24/03/25",
      time: "10:11 am",
      status: "Open",
      sentToClient: "Close",
      feedbackReceived: "21/03/25",
      feedbackSent: "21/03/25"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [count, setCount] = useState(tasks.length + 1);
  const [activePicker, setActivePicker] = useState({ id: null, field: null });
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [statusDropdown, setStatusDropdown] = useState(null);
  const [assignDropdown, setAssignDropdown] = useState(null);


  const rowRefs = useRef({});
  const statuses = ["Done", "Pending", "Late", "In Review", "Open"];

  useEffect(() => {
    setShowSuggestion(searchTerm.trim().length > 0);
  }, [searchTerm]);

  const filteredSuggestions = tasks.filter(task =>
    task.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (id, newStatus) => { 
    setTasks(tasks.map(task => task.id === id ? { ...task, status: newStatus } : task));
    setStatusDropdown(null);
  };

  const handleCalendarChange = (id, field, date) => {
    const formattedDate = date.toLocaleDateString("en-GB");
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, [field]: formattedDate } : task
    ));
    setActivePicker({ id: null, field: null });
  };

  const handleAddTask = (newTask) => {
    setTasks(prev => [...prev, { ...newTask, id: count }]);
    setCount(prev => prev + 1);
    setShowForm(false);
  };

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

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleAddNewUser = () => {
    setTasks((prev) => [
      ...prev,
      {
        id: count,
        client: "",
        projectName: "",
        subject: "",
        createdBy: "",
        assignTo: "",
        assignToSurname:"",
        inputsReceived: "",
        startDate: "",
        deadline: "",
        time: "",
        status: "",
        sentToClient: "",
        feedbackReceived: "",
        feedbackSent: "",
        isNew: true,
      },
    ]);
    setCount(count + 1);
  };

  return (
    <>
      {showForm && (
        <div className="absolute w-full flex justify-center z-50">
          <CreateTask onData={handleAddTask} onClose={() => setShowForm(false)} />
        </div>
      )}

      <div className="flex relative mx-auto w-full">
        <div className="w-full">
          {/* Search & Create Task */}
          <div className="flex justify-between mb-3 w-[90%] mx-auto">
            <div className="flex items-center">
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
                  <div className="text-center text-gray-600 py-2">No results found.</div>
                )}
              </div>
            )}

            <button
              onClick={() => setShowForm(true)}
              className="bg-[#ffba00] text-white px-6 py-2 rounded-full hover:scale-110"
            >
              Create Project
            </button>
          </div>

          {/* Task Table */}
          <div className="overflow-y-auto w-[90%] h-[44vh] border-2 border-[#ffba00] rounded-[20px] overflow-auto mx-auto">
            <table className="w-max text-sm text-center">
              <thead>
                <tr>
                  {[
                    "S No.", "Client", "Project Name", "Subject", "Created By", "Assign To",
                    "Inputs Received", "Start Date", "Deadline", "Feedback Received", "Feedback Sent" ,"Time" , "Status",
                    "Sent to Client",
                  ].map((head) => (
                    <th key={head} className="border border-[#ffba00] px-2 py-1">{head}</th>
                  ))}
                </tr>
              </thead>
            <tbody>
              {tasks.map((task, idx) => (
                <tr
                  key={task.id}           
                  ref={(el) => (rowRefs.current[task.id] = el)}
                  className={`bg-white hover:bg-yellow-100 ${
                  highlightedRow === task.id ? "bg-yellow-300 animate-pulse" : ""
                  }`}
                >
                  <td className="border border-[#ffba00] px-2">{idx + 1}</td>
                
                  {/* Editable Cell for Client */}
                  <td className="border border-[#ffba00] px-2">
                    {task.isNew ? (
                      <input
                        type="text"
                        value={task.client}
                        onChange={(e) =>
                          setTasks((prev) =>
                            prev.map((t) =>
                              t.id === task.id ? { ...t, client: e.target.value } : t
                            )
                          )
                        }
                        className="w-full px-2 py-1 rounded"
                      />
                    ) : (
                      task.client
                    )}
                  </td>
                  
                  {/* Project Name */}
                  <td className="border border-[#ffba00] px-2">
                    {task.isNew ? (
                      <input
                        type="text"
                        value={task.projectName}
                                   onChange={(e) =>
                          setTasks((prev) =>
                            prev.map((t) =>
                            t.id === task.id ? { ...t, projectName: e.target.value } : t
                            )
                          )
                        }
                        className="w-full px-2 py-1 rounded"
                      />
                    ) : (
                      task.projectName
                    )}
                  </td>

                  {/* Subject */}
                    <td className="border border-[#ffba00] px-2">
                                    {task.isNew ? (
                      <input
                        type="text"
                        value={task.subject}
                        onChange={(e) =>
                          setTasks((prev) =>
                            prev.map((t) =>
                              t.id === task.id ? { ...t, subject: e.target.value } : t
                            )
                          )
                        }
                        className="w-full px-2 py-1 rounded"
                      />
                    ) : (
                      task.subject
                    )}
                    </td>
            
                    {/* Created By */}
                    <td className="border border-[#ffba00] px-2">
                      {task.isNew ? (
                        <input
                          type="text"
                          value={task.createdBy}
                          onChange={(e) =>
                            setTasks((prev) =>
                              prev.map((t) =>
                                t.id === task.id ? { ...t, createdBy: e.target.value } : t
                              )
                            )
                          }
                          className="w-full px-2 py-1 rounded"
                        />
                      ) : (
                        task.createdBy
                     )}
                    </td>
            
                    {/* Assign To */}
                    <td className="border border-[#ffba00] px-2 relative">
                      {/* Assigned User Badge */}
                      <span
                        className="bg-blue-500 text-white px-3 py-1 rounded-full inline-block cursor-pointer"
                        onClick={() =>
                          setAssignDropdown(assignDropdown === task.id ? null : task.id)
                        }
                      >
                        {task.assignTo} {task.assignToSurname}
                        <FontAwesomeIcon icon={faCaretDown} className="w-5 ml-2" />
                      </span>
                      
                      {/* Dropdown - only for active task */}
                      {assignDropdown === task.id && (
                        <div className="absolute top-full left-0 w-full text-center bg-[#616262] text-white rounded-[20px] py-2 text-lg z-10 shadow-md">
                          {[
                                               { first: "Aman", last: "Negi" },
                            { first: "Vishal", last: "Bisht" },
                            { first: "Deepanshu", last: "Negi" },
                            { first: "Jay", last: "Negi" },
                            {first:"Bharat",last:"Khathi"}
                          ].map((person, index) => (
                            <div
                              key={index}
                              className="cursor-pointer py-1 text-sm hover:bg-[#ffba00] hover:rounded-full"
                              onClick={() => {
                                setTasks(prev =>
                                  prev.map(t =>
                                    t.id === task.id
                                      ? { ...t, assignTo: person.first, assignToSurname: person.last }
                                      : t
                                  )
                                );
                                setAssignDropdown(null); // close dropdown
                              }}
                            >
                              {person.first} {person.last}
                            </div>
                          ))}
                        </div>
                      )}
                    </td>

            
                    {/* Date Fields */}
                    {["inputsReceived", "startDate", "deadline", "feedbackReceived", "feedbackSent"].map(
                      (field) => (
                        <td key={field} className="border px-2 border-[#ffba00] relative">
                          {task[field]}
                          <FontAwesomeIcon
                            icon={faCalendarDays}
                            onClick={() => setActivePicker({ id: task.id, field })}
                            className="text-yellow-600 cursor-pointer ml-2"
                          />
                          {activePicker.id === task.id && activePicker.field === field && (
                            <div className="absolute z-50 mt-2">
                              <DatePicker
                                selected={new Date()}
                                onChange={(date) => handleCalendarChange(task.id, field, date)}
                                inline
                              />
                              </div>
                            )}
                          </td>
                        )
                                    )}

                      {/* Time */}
                    <td className="border px-2 border-[#ffba00]">
                      {task.isNew ? (
                        <input
                          type="date" // <-- yahan type change kiya
                          value={task.time}
                          onChange={(e) =>
                            setTasks((prev) =>
                              prev.map((t) =>
                                t.id === task.id ? { ...t, time: e.target.value } : t
                              )
                            )
                          }
                          className="w-full px-2 py-1 rounded"
                        />
                      ) : (
                        task.time
                      )}
                    </td>

                    
                    {/* Status */}
                    <td className="border px-2 border-[#ffba00] relative">
                      <span
                        onClick={() => setStatusDropdown(task.id)}
                        className={`cursor-pointer px-2 py-1 rounded-full text-white ${
                          {
                            Done: "bg-green-500",
                            Pending: "bg-purple-500",
                            Late: "bg-red-500",
                            Open: "bg-yellow-500",
                            "In Review": "bg-blue-500",
                          }[task.status] || "bg-gray-500"
                        }`}
                      >
                        {task.status} <FontAwesomeIcon icon={faCaretDown} />
                      </span>
                      
                      {statusDropdown === task.id && (
                        <div className="absolute bg-[#616262] text-white w-[10vw] left-[-2vw] rounded-[20px] z-10 mt-1 py-2 shadow-md overflow-hidden">
                          {statuses.map((status) => (
                            <div
                              key={status}
                              onClick={() => handleStatusChange(task.id, status)}
                              className="px-4 py-1 hover:bg-[#ffba00] cursor-pointer"
                            >
                              {status}
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                    
                    {/* Sent to Client / Delete */}
                    <td className="border px-2 border-[#ffba00]">
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="bg-red-500 text-white px-3 py-1 my-1 rounded-full text-sm hover:bg-red-700"
                      >
                        Close
                      </button>
                    </td>
                </tr>
              ))}
            </tbody>

            </table>
          </div>
          <button
            onClick={handleAddNewUser}
            className="mt-4 px-6 py-2 bg-[#ffba00] border border-[#ffba00] rounded-full ms-[5%]"
          >
            + Add New User
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskTable;
