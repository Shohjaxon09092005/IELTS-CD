
'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export default function ResultsReports() {
  const [dateRange, setDateRange] = useState('last30days');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [groupFilter, setGroupFilter] = useState('all');

  const testResults = [
    {
      id: 1,
      studentName: 'Sarah Johnson',
      testName: 'IELTS Mock Test #3',
      date: '2024-01-25',
      overallScore: 7.0,
      listening: 7.5,
      reading: 6.5,
      writing: 6.5,
      speaking: 7.5,
      duration: '118 min',
      group: 'Advanced'
    },
    {
      id: 2,
      studentName: 'Michael Chen',
      testName: 'IELTS Mock Test #2',
      date: '2024-01-24',
      overallScore: 6.8,
      listening: 7.0,
      reading: 6.0,
      writing: 6.5,
      speaking: 7.5,
      duration: '125 min',
      group: 'Intermediate'
    },
    {
      id: 3,
      studentName: 'Emily Rodriguez',
      testName: 'IELTS Mock Test #1',
      date: '2024-01-23',
      overallScore: 6.5,
      listening: 6.5,
      reading: 6.0,
      writing: 6.0,
      speaking: 7.0,
      duration: '132 min',
      group: 'Intermediate'
    }
  ];

  const scoreDistribution = [
    { range: '5.0-5.5', count: 12 },
    { range: '5.5-6.0', count: 25 },
    { range: '6.0-6.5', count: 38 },
    { range: '6.5-7.0', count: 42 },
    { range: '7.0-7.5', count: 28 },
    { range: '7.5-8.0', count: 15 },
    { range: '8.0-8.5', count: 8 },
    { range: '8.5-9.0', count: 3 }
  ];

  const modulePerformance = [
    { module: 'Listening', average: 6.8, improvement: '+0.3' },
    { module: 'Reading', average: 6.2, improvement: '+0.1' },
    { module: 'Writing', average: 5.9, improvement: '+0.2' },
    { module: 'Speaking', average: 6.4, improvement: '+0.4' }
  ];

  const handleExportPDF = () => {
    console.log('Exporting to PDF...');
  };

  const handleExportExcel = () => {
    console.log('Exporting to Excel...');
  };

  const handleViewDetailedReport = (resultId: number) => {
    console.log('Viewing detailed report for:', resultId);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Results & Reports</h1>
          <p className="text-gray-600">Analyze test performance and generate reports</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleExportExcel}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center whitespace-nowrap"
          >
            <i className="ri-file-excel-line w-4 h-4 mr-2"></i>
            Export Excel
          </button>
          <button
            onClick={handleExportPDF}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center whitespace-nowrap"
          >
            <i className="ri-file-pdf-line w-4 h-4 mr-2"></i>
            Export PDF
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border rounded-lg px-3 py-2 pr-8"
              >
                <option value="last7days">Last 7 days</option>
                <option value="last30days">Last 30 days</option>
                <option value="last90days">Last 90 days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Module</label>
              <select
                value={moduleFilter}
                onChange={(e) => setModuleFilter(e.target.value)}
                className="border rounded-lg px-3 py-2 pr-8"
              >
                <option value="all">All Modules</option>
                <option value="listening">Listening</option>
                <option value="reading">Reading</option>
                <option value="writing">Writing</option>
                <option value="speaking">Speaking</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Group</label>
              <select
                value={groupFilter}
                onChange={(e) => setGroupFilter(e.target.value)}
                className="border rounded-lg px-3 py-2 pr-8"
              >
                <option value="all">All Groups</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Score Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={scoreDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Module Performance</h3>
              <div className="space-y-4">
                {modulePerformance.map((module, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{module.module}</p>
                      <p className="text-sm text-gray-600">Average Score</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{module.average}</p>
                      <p className="text-sm text-green-600">{module.improvement}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Recent Test Results</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Test
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Overall
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      L
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      R
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      W
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      S
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {testResults.map((result) => (
                    <tr key={result.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{result.studentName}</div>
                        <div className="text-sm text-gray-500">{result.group}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {result.testName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {result.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-lg font-bold text-gray-900">{result.overallScore}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {result.listening}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {result.reading}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {result.writing}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {result.speaking}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {result.duration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewDetailedReport(result.id)}
                          className="text-blue-600 hover:text-blue-900 w-8 h-8 flex items-center justify-center"
                        >
                          <i className="ri-eye-line"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
