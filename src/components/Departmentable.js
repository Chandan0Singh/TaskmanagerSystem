"use client";

import { useState, useEffect, useRef } from "react";
import CreateTask from "./createuserform";
import axios from "axios";

const TaskTable = ({designationOption}) => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [count, setCount] = useState(tasks.length + 1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const rowRefs = useRef({});
  const [users, setUsers] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/user/signup/createuser"
      );
      console.log("Department table users data", response.data);
      setUsers(response.data.result);
      setFilteredTasks(response.data.result);
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("Usersssss", users)
  useEffect(() => {
    if (designationOption === "All") {
      setFilteredTasks(users);
    } else {
      const filtered = users.filter(
        (user) => user.designation === designationOption
      );
      setFilteredTasks(filtered);
    }
  }, [designationOption, users]);

  useEffect(() => {
    fetchUserData();
  }, []);

  // const handleAddNewUser = () => {
  //   setTasks((prev) => [
  //     ...prev,
  //     {
  //       id: count,
  //       name: "",
  //       designation: "",
  //       department: "",
  //       empLayer: "",
  //       isNew: true,
  //     },
  //   ]);
  //   setCount(count + 1);
  // };

  const handleChildData = (data) => {
    setTasks((prev) => [...prev, data]);
  };

  const handleHideForm = () => {
    setShowForm(false);
  };

  // Filter suggestions based on search term
  const filteredSuggestions = users.filter(
    (user) =>
      user.user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.designation?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      setShowSuggestion(true);
    } else {
      setShowSuggestion(false);
    }
  }, [searchTerm]);

  const handleEdit = (id) => {
    console.log("Edit user with ID:", id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/user/signup/createuser?id=${id}`
      );
      console.log("Response of the user", response);
      fetchUserData();
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (!confirmDelete) return;
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  return (
    <>
      {showForm && (
        <div className="absolute w-full h-fit flex justify-center items-center">
          <CreateTask onData={handleChildData} onClose={handleHideForm} />
        </div>
      )}

      <div className="flex relative mx-auto">
        <div className="mx-auto w-7xl">
          {/* Search Bar */}
          <div className="flex justify-between mb-3">
            <div className="flex items-center">
              <p className="pr-2 text-lg font-semibold">Search :</p>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search task..."
                className="w-96 py-1 pl-6 bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ffba00] transition-all duration-200"
              />
            </div>

            {searchTerm && showSuggestion && (
              <div className="w-96 max-h-48 overflow-y-auto rounded-lg absolute top-12 left-28 py-2 bg-white border-2 border-yellow-500 z-50 shadow-md">
                {filteredSuggestions.map((suggestion) => (
                  <div
                    key={suggestion._id}
                    onClick={() => {
                      setSearchTerm(suggestion.user);
                      setShowSuggestion(false);
                      const targetRow = rowRefs.current[suggestion._id];
                      if (targetRow) {
                        targetRow.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }
                      setHighlightedRow(suggestion._id);
                      setTimeout(() => setHighlightedRow(null), 2000);
                    }}
                    className="cursor-pointer px-4 py-2 hover:bg-yellow-500 transition-all"
                  >
                    {suggestion.user} - {suggestion.designation}
                  </div>
                ))}
                {filteredSuggestions.length === 0 && (
                  <div className="text-center text-gray-600 py-2">
                    No results found.
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setShowForm(true)}
              className="bg-[#ffba00] text-white px-6 py-2 rounded-full hover:scale-110 mt-1"
            >
              Create User
            </button>
          </div>

          {/* Table */}
          <div className="h-40 w-full overflow-y-auto scrollbar rounded-lg border-2 border-yellow-500">
            <div className="border border-yellow-500">
              <table className="text-center w-full">
                <thead className="text-sm">
                  <tr className="text-base bg-yellow-100">
                    <th className="border px-4 border-yellow-500 py-2">
                      S no.
                    </th>
                    <th className="border px-4 border-yellow-500 py-2">User</th>
                    <th className="border px-4 border-yellow-500 py-2">
                      Designation
                    </th>
                    
                    <th className="border px-4 border-yellow-500 py-2">
                      Emp. Layer
                    </th>
                    <th className="border px-4 border-yellow-500 py-2">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {filteredTasks.map((user, index) => (
                    <tr
                      key={user._id}
                      ref={(el) => (rowRefs.current[user._id] = el)}
                      className={
                        highlightedRow === user._id ? "bg-yellow-200" : ""
                      }
                    >
                      <td className="border px-4 border-yellow-500 py-2">
                        {index + 1}
                      </td>
                      <td className="border px-4 border-yellow-500 py-2">
                        {user.user}
                      </td>
                      <td className="border px-4 border-yellow-500 py-2">
                        {user.designation}
                      </td>
                      
                      <td className="border px-4 border-yellow-500 py-2">
                        {user.empLayer}
                      </td>
                      <td className="border px-4 border-yellow-500 py-2">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="bg-[#ffba00] text-white px-4 py-1 rounded-[2rem] hover:scale-110"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default TaskTable;
