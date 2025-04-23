"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import CreateTask from "./createDesignationForm";

const TaskTable = () => {
  const [designations, setDesignations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [highlightedRow, setHighlightedRow] = useState(null);
  const rowRefs = useRef({});

  const fetchDesignation = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/user/signup/Designation");
      setDesignations(res.data.data);
    } catch (error) {
      console.error("Error while fetching designation", error);
    }
  };

  useEffect(() => {
    fetchDesignation();
  }, []);

  const filteredSuggestions = designations.filter(
    (item) =>
      item.designation &&
      item.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setShowSuggestion(searchTerm.trim().length > 0);
  }, [searchTerm]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this designation?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/user/signup/Designation?id=${id}`);
      fetchDesignation();
    } catch (error) {
      console.error("Error deleting designation:", error);
      alert("Failed to delete designation");
    }
  };

  const handleAdd = () => {
    setShowForm(true);
  };

  const handleChildData = () => {
    setShowForm(false);
    fetchDesignation();
  };

  return (
    <div className="flex relative mx-auto justify-center items-center w-7xl">
      {showForm && (
        <div className="absolute w-full h-fit flex justify-center items-center z-50">
          <CreateTask onData={handleChildData} onClose={() => setShowForm(false)} />
        </div>
      )}

      <div className="w-full">
        <div className="flex justify-between mb-3">
          <div className="flex items-center">
            <p className="pr-2 text-lg font-semibold">Search :</p>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search designation..."
              className="w-96 py-1 pl-6 bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ffba00] transition-all duration-200"
            />
          </div>

          <button
            onClick={handleAdd}
            className="bg-[#ffba00] text-white px-6 py-2 rounded-full hover:scale-110 transition duration-200 mt-1"
          >
            Create Designation
          </button>

          {searchTerm && showSuggestion && (
            <div className="w-96 max-h-48 overflow-y-auto rounded-lg absolute top-12 left-28 py-2 bg-white border-2 border-yellow-500 z-50 shadow-md">
              {filteredSuggestions.map((suggestion) => (
                <div
                  key={suggestion._id}
                  onClick={() => {
                    setSearchTerm(suggestion.designation);
                    setShowSuggestion(false);
                    const targetRow = rowRefs.current[suggestion._id];
                    if (targetRow) {
                      targetRow.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                    setHighlightedRow(suggestion._id);
                    setTimeout(() => setHighlightedRow(null), 2000);
                  }}
                  className="cursor-pointer px-4 py-2 hover:bg-yellow-500 transition-all"
                >
                  {suggestion.designation}
                </div>
              ))}
              {filteredSuggestions.length === 0 && (
                <div className="text-center text-gray-600 py-2">No results found.</div>
              )}
            </div>
          )}
        </div>

        <div className="h-60 w-full overflow-y-auto scrollbar rounded-lg border-2 border-yellow-500">
          <table className="text-center w-full">
            <thead className="text-sm">
              <tr className="text-base bg-yellow-100">
                <th className="border px-4 border-yellow-500 py-2">S no.</th>
                <th className="border px-4 border-yellow-500 py-2">Designation</th>
                <th className="border px-4 border-yellow-500 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {designations.map((item, index) => (
                <tr
                  key={item._id}
                  ref={(el) => (rowRefs.current[item._id] = el)}
                  className={highlightedRow === item._id ? "bg-yellow-200" : ""}
                >
                  <td className="border px-4 border-yellow-500 py-2">{index + 1}</td>
                  <td className="border px-4 border-yellow-500 py-2">{item.designation}</td>
                  <td className="border px-4 border-yellow-500 py-2">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-white bg-[#ffba00] px-4 py-1 rounded-[2rem] hover:scale-110"
                    >
                      Delete
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
