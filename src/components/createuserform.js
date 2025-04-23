"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function TaskForm({ onData, onClose }) {
  const [formData, setFormData] = useState({
    user: "",
    designation: "",
    department: "",
    empLayer: "",
  });

  const [designations, setDesignations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [showDesignationDropdown, setShowDesignationDropdown] = useState(false);
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchDesignation = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/user/signup/Designation"
      );
      console.log("Designation data", res.data);
      setDesignations(res.data.data); 
    } catch (error) {
      console.log("Error while fetching designation", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/user/signup/Department"
      );
      console.log("Department data", res.data);
      setDepartments(res.data.data); 
    } catch (error) {
      console.log("Error while fetching departments", error);
    }
  };

  useEffect(() => {
    fetchDesignation();
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      ...formData,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/signup/createuser", 
        newUser
      );
      console.log("API Response:", response);

      onData(response.data.task);
      onClose();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const selectDesignation = (designation) => {
    setFormData(prev => ({ ...prev, designation }));
    setShowDesignationDropdown(false);
  };

  const selectDepartment = (department) => {
    setFormData(prev => ({ ...prev, department }));
    setShowDepartmentDropdown(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-2xl mx-auto space-y-5 border rounded-2xl bg-white shadow-[0_10px_60px_rgba(0,0,0,0.4)] absolute z-[999]"
    >
      <div className="w-full flex justify-end">
        <span
          onClick={onClose}
          className="hover:scale-[120%] transition-transform duration-500 hover:rotate-[270deg]"
        >
          <FontAwesomeIcon icon={faXmark} className="text-[#ffba00] cursor-pointer" />
        </span>
      </div>

      <h2 className="text-2xl font-semibold text-center text-gray-800">📝 Create New user</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            User Name
          </label>
          <input 
            type="text" 
            name="user" 
            value={formData.user} 
            onChange={handleChange} 
            className="input-field w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffba00]" 
            required
          />
        </div>
        
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Designation
          </label>
          <div 
            onClick={() => setShowDesignationDropdown(!showDesignationDropdown)}
            className="input-field w-full px-4 py-2 border border-gray-300 rounded-md flex justify-between items-center cursor-pointer"
          >
            {formData.designation || "Select Designation"}
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
          {showDesignationDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {designations.map((item) => (
                <div
                  key={item._id}
                  onClick={() => selectDesignation(item.designation || item.destination)}
                  className="px-4 py-2 hover:bg-[#ffba00] hover:text-white cursor-pointer"
                >
                  {item.designation || item.destination}
                </div>
              ))}
            </div>
          )}
        </div>
        
        
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Emp. Layer
          </label>
          <input 
            type="text" 
            name="empLayer" 
            value={formData.empLayer} 
            onChange={handleChange} 
            className="input-field w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffba00]" 
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[#ffba00] hover:scale-[102%] text-white font-semibold py-3 rounded-[3rem] transition-all duration-200"
      >
        Add User
      </button>
    </form>
  );
}