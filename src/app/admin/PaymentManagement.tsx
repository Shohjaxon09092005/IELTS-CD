
'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function PaymentManagement() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      userId: 'USR001',
      userName: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      amount: 29.99,
      plan: 'Premium Monthly',
      status: 'Completed',
      date: '2024-01-25',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN_001234567'
    },
    {
      id: 2,
      userId: 'USR002',
      userName: 'Michael Chen',
      email: 'michael.chen@email.com',
      amount: 89.99,
      plan: 'Premium Quarterly',
      status: 'Completed',
      date: '2024-01-24',
      paymentMethod: 'PayPal',
      transactionId: 'TXN_001234568'
    },
    {
      id: 3,
      userId: 'USR003',
      userName: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      amount: 19.99,
      plan: 'Basic Monthly',
      status: 'Failed',
      date: '2024-01-23',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN_001234569'
    }
  ]);

  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');

  const revenueData = [
    { month: 'Jan', revenue: 12500, subscriptions: 42 },
    { month: 'Feb', revenue: 15200, subscriptions: 51 },
    { month: 'Mar', revenue: 18900, subscriptions: 63 },
    { month: 'Apr', revenue: 22100, subscriptions: 74 },
    { month: 'May', revenue: 25800, subscriptions: 86 },
    { month: 'Jun', revenue: 29500, subscriptions: 98 }
  ];

  const subscriptionTypes = [
    { name: 'Basic Monthly', value: 35, color: '#3B82F6' },
    { name: 'Premium Monthly', value: 45, color: '#10B981' },
    { name: 'Premium Quarterly', value: 15, color: '#F59E0B' },
    { name: 'Premium Annual', value: 5, color: '#EF4444' }
  ];

  const stats = [
    { title: 'Total Revenue', value: '$124,500', change: '+23%', icon: 'ri-money-dollar-circle-line', color: 'bg-green-500' },
    { title: 'Active Subscriptions', value: '1,247', change: '+15%', icon: 'ri-vip-crown-line', color: 'bg-blue-500' },
    { title: 'Failed Payments', value: '23', change: '-8%', icon: 'ri-error-warning-line', color: 'bg-red-500' },
    { title: 'Refunds', value: '5', change: '-12%', icon: 'ri-refund-line', color: 'bg-yellow-500' }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const statusMatch = statusFilter === 'all' || transaction.status.toLowerCase() === statusFilter;
    const planMatch = planFilter === 'all' || transaction.plan.toLowerCase().includes(planFilter);
    return statusMatch && planMatch;
  });

  const handleRefund = (transactionId: string) => {
    console.log('Processing refund for:', transactionId);
  };

  const handleResendInvoice = (transactionId: string) => {
    console.log('Resending invoice for:', transactionId);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Payment Management</h1>
          <p className="text-gray-600">Track transactions and subscription management</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center whitespace-nowrap">
            <i className="ri-download-line w-4 h-4 mr-2"></i>
            Export Report
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center whitespace-nowrap">
            <i className="ri-add-line w-4 h-4 mr-2"></i>
            Manual Payment
          </button>
        </div>
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
          <h3 className="text-lg font-semibold mb-4">Revenue Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Subscription Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={subscriptionTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {subscriptionTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded-lg px-3 py-2 pr-8"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
                <option value="pending">Pending</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
                className="border rounded-lg px-3 py-2 pr-8"
              >
                <option value="all">All Plans</option>
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
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
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{transaction.userName}</div>
                      <div className="text-sm text-gray-500">{transaction.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.plan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${transaction.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      transaction.status === 'Failed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.transactionId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleResendInvoice(transaction.transactionId)}
                        className="text-blue-600 hover:text-blue-900 w-8 h-8 flex items-center justify-center"
                      >
                        <i className="ri-mail-line"></i>
                      </button>
                      {transaction.status === 'Completed' && (
                        <button
                          onClick={() => handleRefund(transaction.transactionId)}
                          className="text-red-600 hover:text-red-900 w-8 h-8 flex items-center justify-center"
                        >
                          <i className="ri-refund-line"></i>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
