import React, { useState } from 'react';
import { FaDownload, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import * as XLSX from 'xlsx';

const DiscountCodeManagement = () => {
  const [discountCodes, setDiscountCodes] = useState([
    {
      id: 1,
      code: 'NEWUSER15',
      type: 'Percentage',
      value: '15%',
      assignedTo: 'All experts',
      usage: '5 usage',
      expiryDate: '26/02/2025',
    },
    {
      id: 2,
      code: 'SUMMER25',
      type: 'Percentage',
      value: '25%',
      assignedTo: 'Specific experts',
      usage: '10 usage',
      expiryDate: '31/08/2025',
    },
  ]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    code: '',
    type: 'Percentage',
    value: '',
    assignedTo: '',
    usage: '',
    expiryDate: ''
  });

  // Form state for new discount code
  const [newDiscountCode, setNewDiscountCode] = useState({
    value: '',
    assignedTo: '',
    expiryDate: ''
  });

  // Generate random discount code
  const generateDiscountCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Handle export to Excel
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(discountCodes);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DiscountCodes");
    XLSX.writeFile(workbook, "DiscountCodes.xlsx");
  };

  // Handle delete
  const handleDelete = (id) => {
    setDiscountCodes(discountCodes.filter(code => code.id !== id));
  };

  // Handle edit start
  const handleEditStart = (code) => {
    setEditingId(code.id);
    setEditFormData({
      code: code.code,
      type: code.type,
      value: code.value.replace('%', ''),
      assignedTo: code.assignedTo,
      usage: code.usage,
      expiryDate: code.expiryDate
    });
  };

  // Handle edit form change
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  // Handle edit save
  const handleEditSave = (id) => {
    setDiscountCodes(discountCodes.map(code => 
      code.id === id ? { 
        ...code, 
        ...editFormData,
        value: `${editFormData.value}%`
      } : code
    ));
    setEditingId(null);
  };

  // Handle edit cancel
  const handleEditCancel = () => {
    setEditingId(null);
  };

  // Handle new discount code form change
  const handleNewDiscountChange = (e) => {
    const { name, value } = e.target;
    setNewDiscountCode({
      ...newDiscountCode,
      [name]: value
    });
  };

  // Handle create new discount code
  const handleCreateDiscountCode = () => {
    if (!newDiscountCode.value || !newDiscountCode.expiryDate) {
      alert('Please fill in Value and Expiry Date');
      return;
    }

    // Validate date format (simple check)
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(newDiscountCode.expiryDate)) {
      alert('Please enter date in DD/MM/YYYY format');
      return;
    }

    const newCode = {
      id: discountCodes.length + 1,
      code: generateDiscountCode(),
      type: 'Percentage',
      value: `${newDiscountCode.value}%`,
      assignedTo: newDiscountCode.assignedTo || 'All experts',
      usage: '0 usage',
      expiryDate: newDiscountCode.expiryDate
    };

    setDiscountCodes([...discountCodes, newCode]);
    
    // Reset form
    setNewDiscountCode({
      value: '',
      assignedTo: '',
      expiryDate: ''
    });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = discountCodes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(discountCodes.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 ">
        <h2 className="text-2xl font-bold">DISCOUNT CODE MANAGEMENT</h2>
        <div 
          className="flex items-center space-x-2 ml-auto cursor-pointer"
          onClick={handleExport}
        >
          <span className="text-red-700 mt-20">Export as CSV Format</span>
          <FaDownload className="text-black mt-20" />
        </div>
      </div>

{/* Add New Discount Code Form */}
<div className="bg-white p-6 rounded shadow-md mb-6">
  <h3 className="text-xl font-semibold mb-4 border-b-2 border-black">
    Add New Discount Code
  </h3>
  <div className="grid grid-cols-5 gap-4 items-end">
    {/* Code */}
    <div className="flex flex-col">
      <label className="font-semibold">Code</label>
      <input
        type="text"
        placeholder="Enter Code"
        value={newDiscountCode.code}
        onChange={(e) => setNewDiscountCode({...newDiscountCode, code: e.target.value})}
        className="w-full p-2 mt-1 border rounded-lg bg-gray-100 placeholder:text-black"
      />
    </div>

    {/* Type */}
    <div className="flex flex-col">
      <label className="font-semibold">Type</label>
      <select
        value={newDiscountCode.type}
        onChange={(e) => setNewDiscountCode({...newDiscountCode, type: e.target.value})}
        className="w-full p-2 mt-1 border rounded-lg bg-gray-100 text-black"
      >
        <option value="Percentage">Percentage</option>
        <option value="Fixed">Fixed</option>
      </select>
    </div>

    {/* Value */}
    <div className="flex flex-col">
      <label className="font-semibold">Value</label>
      <input
        type="number"
        placeholder="Enter Value"
        value={newDiscountCode.value}
        onChange={(e) => setNewDiscountCode({...newDiscountCode, value: e.target.value})}
        className="w-full p-2 mt-1 border rounded-lg bg-gray-100 placeholder:text-black"
      />
    </div>

    {/* Expiry Date */}
    <div className="flex flex-col">
      <label className="font-semibold">Expiry Date</label>
      <input
        type="text"
        placeholder="DD/MM/YYYY"
        value={newDiscountCode.expiryDate}
        onChange={(e) => setNewDiscountCode({...newDiscountCode, expiryDate: e.target.value})}
        className="w-full p-2 mt-1 border rounded-lg bg-gray-100 placeholder:text-black"
      />
    </div>

    {/* Assign To */}
    <div className="flex flex-col">
      <label className="font-semibold">Assign To</label>
      <input
        type="text"
        placeholder="Expert Name"
        value={newDiscountCode.assignedTo}
        onChange={(e) => setNewDiscountCode({...newDiscountCode, assignedTo: e.target.value})}
        className="w-full p-2 mt-1 border rounded-lg bg-gray-100 placeholder:text-black"
      />
    </div>

    {/* Create Discount Code Button */}
    <button 
      onClick={handleCreateDiscountCode}
      className="col-span-5 mt-4 px-6 py-2 bg-[#D9D9D9] text-black rounded w-[20%]"
    >
      Create Discount Code
    </button>
  </div>
</div>

      {/* Discount Code Table */}
      <div className="bg-white p-6">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-t-2 border-b-2 border-red-500">
              <th className="p-2 text-center border-r border-[#808080] py-5">CODE</th>
              <th className="p-2 text-center border-r border-[#808080]">TYPE</th>
              <th className="p-2 text-center border-r border-[#808080]">VALUE</th>
              <th className="p-2 text-center border-r border-[#808080]">ASSIGNED TO</th>
              <th className="p-2 text-center border-r border-[#808080]">USAGE</th>
              <th className="p-2 text-center border-r border-[#808080]">EXPIRY DATE</th>
              <th className="p-2 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((code) => (
              <tr key={code.id} className="border-b">
                {editingId === code.id ? (
                  <>
                    <td className="p-2 border-[#808080]">
                      <input
                        type="text"
                        name="code"
                        value={editFormData.code}
                        onChange={handleEditFormChange}
                        className="w-full p-1 border rounded"
                        disabled
                      />
                    </td>
                    <td className="p-2 border-[#808080]">
                      <input
                        type="text"
                        name="type"
                        value={editFormData.type}
                        onChange={handleEditFormChange}
                        className="w-full p-1 border rounded"
                        disabled
                      />
                    </td>
                    <td className="p-2 border-[#808080]">
                      <div className="flex items-center">
                        <input
                          type="number"
                          name="value"
                          value={editFormData.value}
                          onChange={handleEditFormChange}
                          className="w-full p-1 border rounded"
                        />
                        <span className="ml-1">%</span>
                      </div>
                    </td>
                    <td className="p-2 border-[#808080]">
                      <input
                        type="text"
                        name="assignedTo"
                        value={editFormData.assignedTo}
                        onChange={handleEditFormChange}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="p-2 border-[#808080]">
                      <input
                        type="text"
                        name="usage"
                        value={editFormData.usage}
                        onChange={handleEditFormChange}
                        className="w-full p-1 border rounded"
                        disabled
                      />
                    </td>
                    <td className="p-2 border-[#808080]">
                      <input
                        type="text"
                        name="expiryDate"
                        value={editFormData.expiryDate}
                        onChange={handleEditFormChange}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="p-2">
                      <button 
                        className="text-green-500 hover:text-green-700 mr-2"
                        onClick={() => handleEditSave(code.id)}
                      >
                        Save
                      </button>
                      <button 
                        className="text-gray-500 hover:text-gray-700"
                        onClick={handleEditCancel}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-2 border-[#808080]">{code.code}</td>
                    <td className="p-2 border-[#808080]">{code.type}</td>
                    <td className="p-2 border-[#808080]">{code.value}</td>
                    <td className="p-2 border-[#808080]">{code.assignedTo}</td>
                    <td className="p-2 border-[#808080]">{code.usage}</td>
                    <td className="p-2 border-[#808080]">{code.expiryDate}</td>
                    <td className="p-2">
                      <button 
                        className="text-[#737373] hover:text-blue-700 mr-2"
                        onClick={() => handleEditStart(code)}
                      >
                        <RiEdit2Fill className="h-7 w-7" /> 
                      </button>
                      <button 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(code.id)}
                      >
                        <MdDelete className="h-7 w-7" />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`mx-1 px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            <FaChevronLeft />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {i + 1}
            </button>
          ))}
          
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`mx-1 px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountCodeManagement;