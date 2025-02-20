import React, { useState, useMemo } from "react";
import { Search, Filter, ArrowUpDown, Check, Clock } from 'lucide-react';

const UserDone = () => {
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const items = [
    {
      id: 1,
      name: "Гэгээнээ",
      class: "SW24-1",
      status: "Амараа",
      date: "2025-1-31",
      state: "completed"
    },
    {
      id: 2,
      name: "Гэгээнээ",
      class: "SW24-1",
      status: "Амараа",
      date: "2025-1-31",
      state: "completed"
    },
    {
      id: 3,
      name: "Гэгээнээ",
      class: "SW24-2",
      status: "Амараа",
      date: "2025-1-31",
      state: "completed",
      score: 95,
    },
    {
      id: 4,
      name: "Гэгээнээ",
      class: "SW24-1",
      status: "Амараа",
      date: "2025-1-31",
      state: "completed",
      score: 95,
    },
    {
      id: 5,
      name: "Гэгээнээ",
      class: "SW24-2",
      status: "Амараа",
      date: "2025-1-31",
      state: "completed",
      score: 95,
    },
    {
      id: 6,
      name: "Гэгээнээ",
      class: "DM24-1",
      status: "Амараа",
      date: "2025-1-31",
      state: "pending",
      score: 95,
    },
    {
      id: 7,
      name: "Гэгээнээ",
      class: "SW24-2",
      status: "Амараа",
      date: "2025-1-31",
      state: "pending",
      score: 95,
    },
    {
      id: 8,
      name: "Гэгээнээ",
      class: "SW24-1",
      status: "Амараа",
      date: "2025-1-31",
      state: "pending",
      score: 95,
    },
    {
      id: 9,
      name: "Гэгээнээ",
      class: "DM24-1",
      status: "Амараа",
      date: "2025-1-31",
      state: "pending",
      score: 95,
    },
    {
      id: 10,
      name: "Гэгээнээ",
      class: "SW24-1",
      status: "Амараа",
      date: "2025-1-31",
      state: "pending",
      score: 95,
    },
    {
      id: 11,
      name: "Гэгээнээ",
      class: "SW24-2",
      status: "Амараа",
      date: "2025-1-31",
      state: "pending",
      score: 95,
    },
    {
      id: 12,
      name: "Гэгээнээ",
      class: "SW24-1",
      status: "Амараа",
      date: "2025-1-31",
      state: "inactive",
      score: 95,
    },
    {
      id: 13,
      name: "Гэгээнээ",
      class: "DM24-1",
      status: "Амараа",
      date: "2025-1-31",
      state: "inactive",
      score: 95,
    },
  ];

  // Available classes array
  const classes = [
    { value: "all", label: "Бүх анги" },
    { value: "DM24-1", label: "DM24-1" },
    { value: "SW24-1", label: "SW24-1" },
    { value: "SW24-2", label: "SW24-2" },
    { value: "SW24-3", label: "SW24-3" },
    { value: "SW24-4", label: "SW24-4" }
  ];

  // Filter and search logic
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesClass = selectedClass === "all" || item.class === selectedClass;
      const matchesState = selectedState === "all" || item.state === selectedState;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.class.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesClass && matchesState && matchesSearch;
    });
  }, [items, selectedClass, selectedState, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-20 max-sm:px-6 max-sm:py-4">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Холбогдсон үйлчлүүлэгчид
      </h1>

      {/* Dropdown Filters */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="appearance-none bg-white dark:bg-[#2A2F37] border border-gray-300 dark:border-gray-600 
                       rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {classes.map(cls => (
                <option key={cls.value} value={cls.value}>
                  {cls.label}
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          <div className="relative">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="appearance-none bg-white dark:bg-[#2A2F37] border border-gray-300 dark:border-gray-600 
                       rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Бүх төлөв</option>
              <option value="completed">Амжилттай</option>
              <option value="pending">Хүлээгдэж буй</option>
              <option value="inactive">Идэвхгүй</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Хайх..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-[#2A2F37] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">Нэр</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">Анги</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">Төлөв</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">Огноо</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">Статус</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {currentItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{item.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{item.class}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{item.status}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{item.date}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${item.state === 'completed' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}`}>
                    {item.state === 'completed' 
                      ? <Check className="w-3 h-3 mr-1" /> 
                      : <Clock className="w-3 h-3 mr-1" />}
                    {item.state}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Нийт {filteredItems.length} бичлэгээс {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredItems.length)} харуулж байна
        </div>
        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDone;
