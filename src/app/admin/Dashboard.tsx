
'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard() {
  const stats = [
    { title: 'Total Users', value: '12,847', change: '+12%', icon: 'ri-user-line', color: 'bg-blue-500' },
    { title: 'Tests Taken', value: '8,923', change: '+18%', icon: 'ri-file-text-line', color: 'bg-green-500' },
    { title: 'Average Score', value: '6.5', change: '+0.3', icon: 'ri-trophy-line', color: 'bg-yellow-500' },
    { title: 'Active Today', value: '1,234', change: '+5%', icon: 'ri-pulse-line', color: 'bg-purple-500' },
  ];

  const userActivityData = [
    { name: 'Jan', users: 4000, tests: 2400 },
    { name: 'Feb', users: 3000, tests: 1398 },
    { name: 'Mar', users: 2000, tests: 9800 },
    { name: 'Apr', users: 2780, tests: 3908 },
    { name: 'May', users: 1890, tests: 4800 },
    { name: 'Jun', users: 2390, tests: 3800 },
  ];

  const sectionScores = [
    { section: 'Listening', score: 6.8 },
    { section: 'Reading', score: 6.2 },
    { section: 'Writing', score: 5.9 },
    { section: 'Speaking', score: 6.4 },
  ];

  const questionTypes = [
    { name: 'Multiple Choice', value: 35, color: '#0088FE' },
    { name: 'Fill in Blanks', value: 28, color: '#00C49F' },
    { name: 'True/False', value: 22, color: '#FFBB28' },
    { name: 'Matching', value: 15, color: '#FF8042' },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Overview of your IELTS CD platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600">{stat.change}</p>
              </div>
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <i className={`${stat.icon} text-white text-xl`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">User Activity Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="tests" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Average Scores by Section</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sectionScores}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="section" />
              <YAxis domain={[0, 9]} />
              <Tooltip />
              <Bar dataKey="score" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Most Missed Question Types</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={questionTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {questionTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <i className="ri-user-add-line w-5 h-5 text-green-500 mr-3"></i>
              <div>
                <p className="text-sm font-medium">New user registration</p>
                <p className="text-xs text-gray-500">Sarah Johnson joined 2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <i className="ri-file-text-line w-5 h-5 text-blue-500 mr-3"></i>
              <div>
                <p className="text-sm font-medium">Test completed</p>
                <p className="text-xs text-gray-500">Michael Chen completed IELTS Mock Test #3</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <i className="ri-money-dollar-circle-line w-5 h-5 text-purple-500 mr-3"></i>
              <div>
                <p className="text-sm font-medium">Payment received</p>
                <p className="text-xs text-gray-500">Premium subscription - $29.99</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
