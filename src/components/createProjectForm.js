"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function TaskForm({ onData, onClose, refreshAftersumbit }) {
  const [formData, setFormData] = useState({
    id: "",
    client: "",
    project: "",
    subject: "",
    createdBy: "",
    assignedTo: "",
    assignToDesignation:"",
    startDate: "",
    deadline: "",
    time: "",
    status: "Open" ,
  });

  const [users, setUsers] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/user/signup/createuser"
      );
      console.log(
        "response from assignedTo data from create tabel",
        response.data.result
      );
      setUsers(
        response.data.result.map((user) => ({
          ...user,
          designation: user.designation || "",
        }))
      );
    } catch (error) {
      console.log("error", error);
    }
  };


  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "assignedTo") {
      const selectedUser = users.find(user => user.user === value);   
      setFormData(prev => ({ 
        ...prev, 
        assignedTo: value,
        assignToDesignation: selectedUser ? selectedUser.designation : "" 
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const response = await axios.post("/api/user/signup/tasks", formData);

      if (response.data && response.data.task) {
        onData(response.data.task);
      }
      refreshAftersumbit();
      onClose(response.data.task);

    } catch (error) {
      console.error("Error saving task:", error);
    }
  };
  
  return (
    // <form
    //   onSubmit={handleSubmit}
    //   className="p-6 max-w-2xl mx-auto space-y-5 border rounded-2xl bg-white shadow-[0_10px_60px_rgba(0,0,0,0.4)] absolute z-[999] "
    // >
    //   <div className="w-full flex justify-end ">
    //     <span
    //       onClick={onClose}
    //       className="hover:scale-[120%] transition-transform duration-500 hover:rotate-[270deg] "
    //     >
    //       <FontAwesomeIcon
    //         icon={faXmark}
    //         className="text-[#ffba00] cursor-pointer"
    //       />
    //     </span>
    //   </div>
    //   <h2 className="text-2xl font-semibold text-center text-gray-800">
    //     📝 Create New Task
    //   </h2>

    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //     <input
    //       type="text"
    //       name="client"
    //       value={formData.client}
    //       onChange={handleChange}
    //       placeholder="Client"
    //       className="input-field"
    //     />
    //     <input
    //       type="text"
    //       name="project"
    //       value={formData.project}
    //       onChange={handleChange}
    //       placeholder="Project Name"
    //       className="input-field"
    //     />
    //     <input
    //       type="text"
    //       name="subject"
    //       value={formData.subject}
    //       onChange={handleChange}
    //       placeholder="Subject"
    //       className="input-field"
    //     />
    //     <input
    //       type="text"
    //       name="createdBy"
    //       value={formData.createdBy}
    //       onChange={handleChange}
    //       placeholder="Created By"
    //       className="input-field"
    //     />
    //     <select
    //       name="assignedTo"
    //       value={formData.assignedTo}
    //       onChange={handleChange}
    //       className="input-field"
    //     >
    //       <option value="">Select a user</option>
    //       {users.map((user) => (
    //         <option key={user._id} value={user.user}>
    //           {user.user},
    //           {user.designation}
    //         </option>
    //       ))}
    //     </select>
    //     <span>
    //       <label className="text-[#ffba00]">Starting Date</label> <br/>
    //       <input
    //         type="date"
    //         name="startDate"
    //         placeholder="startDate"
    //         value={formData.startDate}
    //         onChange={handleChange}
    //         className="input-field"
    //       />
    //     </span>
          
        
    //     <span>
    //       <label className="text-[#ffba00]">Deadline</label> <br/>
    //       <input
    //         type="date"
    //         name="deadline"
    //         value={formData.deadline}
    //         onChange={handleChange}
    //         className="input-field"
    //        />
    //     </span>
        
    //     <input
    //       type="time"
    //       name="time"
    //       value={formData.time}
    //       onChange={handleChange}
    //       className="input-field"
    //     />
    //   </div>

    //   <button
    //     type="submit"
    //     className="w-full bg-[#ffba00] hover:scale-[102%] text-white font-semibold py-3 rounded-xl transition-all duration-200"
    //   >
    //     Add Task
    //   </button>
    // </form>
    <form
  onSubmit={handleSubmit}
  className="p-8 max-w-3xl mx-auto space-y-8 border rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.2)] absolute z-[999]"
>
  {/* Close Button */}
  <div className="w-full flex justify-end">
    <span
      onClick={onClose}
      className="hover:scale-110 transition-transform duration-300 hover:rotate-180"
    >
      <FontAwesomeIcon
        icon={faXmark}
        className="text-[#ffba00] text-2xl cursor-pointer"
      />
    </span>
  </div>

  {/* Form Title */}
  <h2 className="text-3xl font-bold text-center text-gray-800">
    📝 Create New Task
  </h2>

  {/* Form Fields */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Text Inputs */}
    {[
      { name: "client", placeholder: "Client" },
      { name: "project", placeholder: "Project Name" },
      { name: "subject", placeholder: "Subject" },
      { name: "createdBy", placeholder: "Created By" },
    ].map((field) => (
      <input
        key={field.name}
        type="text"
        name={field.name}
        value={formData[field.name]}
        onChange={handleChange}
        placeholder={field.placeholder}
        className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-[#ffba00] focus:outline-none transition-all duration-200"
      />
    ))}

    {/* Select User */}
    <select
      name="assignedTo"
      value={formData.assignedTo}
      onChange={handleChange}
      className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-[#ffba00] focus:outline-none transition-all duration-200"
    >
      <option value="">Select a user</option>
      {users.map((user) => (
        <option key={user._id} value={user.user}>
          {user.user}, {user.designation}
        </option>
      ))}
    </select>

    {/* Starting Date */}
    <div className="relative">
    <label className="absolute left-4 top-[-0.05rem] text-sm text-[#ffba00]">Starting Date</label>
      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        onFocus={(e) => e.target.showPicker && e.target.showPicker()}
        className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-500 focus:ring-2 focus:ring-[#ffba00] focus:outline-none transition-all duration-200"
      />
      
    </div>

    {/* Deadline */}
    <div className="relative">
    <label className="absolute left-4 top-[-0.05rem] text-sm text-[#ffba00]">Deadline</label>
      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
        onFocus={(e) => e.target.showPicker && e.target.showPicker()}
        className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-500 focus:ring-2 focus:ring-[#ffba00] focus:outline-none transition-all duration-200"
      />
      
    </div>

    {/* Time */}
    <input
      type="time"
      name="time"
      value={formData.time}
      onChange={handleChange}
      className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-500 focus:ring-2 focus:ring-[#ffba00] focus:outline-none transition-all duration-200"
    />
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full bg-[#ffba00] hover:scale-105 text-white text-lg font-semibold py-3 rounded-[3rem] transition-all duration-300"
  >
    Add Task
  </button>
</form>

  );
}
