
'use client';

import { useState } from 'react';

export default function UserManagement() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      registrationDate: '2024-01-15',
      lastLogin: '2024-01-25',
      testsCompleted: 5,
      averageScore: 6.8,
      status: 'Active',
      subscription: 'Premium'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      registrationDate: '2024-01-10',
      lastLogin: '2024-01-24',
      testsCompleted: 3,
      averageScore: 7.2,
      status: 'Active',
      subscription: 'Basic'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      registrationDate: '2024-01-20',
      lastLogin: '2024-01-23',
      testsCompleted: 8,
      averageScore: 6.5,
      status: 'Inactive',
      subscription: 'Premium'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const handleResetPassword = (userId: number) => {
    console.log('Reset password for user:', userId);
  };

  const handleToggleStatus = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
        : user
    ));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-600">Manage student profiles and performance</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center whitespace-nowrap">
          <i className="ri-download-line w-4 h-4 mr-2"></i>
          Export Users
        </button>
      </div>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded-lg px-3 py-2 pr-8"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tests
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.registrationDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.testsCompleted}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.averageScore}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.subscription === 'Premium' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.subscription}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="text-blue-600 hover:text-blue-900 w-8 h-8 flex items-center justify-center"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                      <button
                        onClick={() => handleResetPassword(user.id)}
                        className="text-yellow-600 hover:text-yellow-900 w-8 h-8 flex items-center justify-center"
                      >
                        <i className="ri-lock-password-line"></i>
                      </button>
                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        className="text-green-600 hover:text-green-900 w-8 h-8 flex items-center justify-center"
                      >
                        <i className="ri-toggle-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showUserDetails && selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setShowUserDetails(false)}
        />
      )}
    </div>
  );
}

function UserDetailsModal({ user, onClose }: any) {
  const testHistory = [
    { date: '2024-01-25', testName: 'IELTS Mock Test #3', score: 7.0, listening: 7.5, reading: 6.5, writing: 6.5, speaking: 7.5 },
    { date: '2024-01-22', testName: 'IELTS Mock Test #2', score: 6.8, listening: 7.0, reading: 6.0, writing: 6.5, speaking: 7.5 },
    { date: '2024-01-18', testName: 'IELTS Mock Test #1', score: 6.5, listening: 6.5, reading: 6.0, writing: 6.0, speaking: 7.0 }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">User Details: {user.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Personal Information</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Registration:</strong> {user.registrationDate}</p>
              <p><strong>Last Login:</strong> {user.lastLogin}</p>
              <p><strong>Status:</strong> {user.status}</p>
              <p><strong>Subscription:</strong> {user.subscription}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Performance Summary</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Tests Completed:</strong> {user.testsCompleted}</p>
              <p><strong>Average Score:</strong> {user.averageScore}</p>
              <p><strong>Best Score:</strong> 7.2</p>
              <p><strong>Improvement:</strong> +0.7 points</p>
              <p><strong>Study Hours:</strong> 45 hours</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-4">Test History</h3>
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Test</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Overall</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Listening</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Reading</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Writing</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Speaking</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {testHistory.map((test, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm">{test.date}</td>
                    <td className="px-4 py-2 text-sm">{test.testName}</td>
                    <td className="px-4 py-2 text-sm font-medium">{test.score}</td>
                    <td className="px-4 py-2 text-sm">{test.listening}</td>
                    <td className="px-4 py-2 text-sm">{test.reading}</td>
                    <td className="px-4 py-2 text-sm">{test.writing}</td>
                    <td className="px-4 py-2 text-sm">{test.speaking}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 whitespace-nowrap">
            Reset Password
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap">
            Assign Test
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50 whitespace-nowrap"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
