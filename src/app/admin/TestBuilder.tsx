
'use client';

import { useState } from 'react';

export default function TestBuilder() {
  const [tests, setTests] = useState([
    {
      id: 1,
      name: 'IELTS Mock Test #1',
      status: 'Published',
      created: '2024-01-15',
      questions: 40,
      duration: 120,
      attempts: 245
    },
    {
      id: 2,
      name: 'IELTS Mock Test #2',
      status: 'Draft',
      created: '2024-01-20',
      questions: 38,
      duration: 120,
      attempts: 0
    }
  ]);

  const [showCreateTest, setShowCreateTest] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  const handleCreateTest = (testData: any) => {
    const newTest = {
      id: Date.now(),
      ...testData,
      created: new Date().toISOString().split('T')[0],
      attempts: 0
    };
    setTests([...tests, newTest]);
    setShowCreateTest(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Test Builder</h1>
          <p className="text-gray-600">Create and manage IELTS mock tests</p>
        </div>
        <button
          onClick={() => setShowCreateTest(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center whitespace-nowrap"
        >
          <i className="ri-add-line w-4 h-4 mr-2"></i>
          Create Test
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Questions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attempts
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tests.map((test) => (
                <tr key={test.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{test.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      test.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {test.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {test.questions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {test.duration} min
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {test.attempts}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {test.created}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 w-8 h-8 flex items-center justify-center">
                        <i className="ri-edit-line"></i>
                      </button>
                      <button className="text-green-600 hover:text-green-900 w-8 h-8 flex items-center justify-center">
                        <i className="ri-eye-line"></i>
                      </button>
                      <button className="text-red-600 hover:text-red-900 w-8 h-8 flex items-center justify-center">
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showCreateTest && (
        <CreateTestModal
          onSave={handleCreateTest}
          onCancel={() => setShowCreateTest(false)}
        />
      )}
    </div>
  );
}

function CreateTestModal({ onSave, onCancel }: any) {
  const [formData, setFormData] = useState({
    name: '',
    status: 'Draft',
    listeningQuestions: 10,
    readingQuestions: 13,
    writingQuestions: 2,
    speakingQuestions: 3,
    duration: 120,
    instructions: '',
    passingScore: 60
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalQuestions = formData.listeningQuestions + formData.readingQuestions + 
                          formData.writingQuestions + formData.speakingQuestions;
    onSave({
      ...formData,
      questions: totalQuestions
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create New Test</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Test Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full border rounded-lg px-3 py-2 pr-8"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                className="w-full border rounded-lg px-3 py-2"
                min="60"
                max="180"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Listening Questions</label>
              <input
                type="number"
                value={formData.listeningQuestions}
                onChange={(e) => setFormData({...formData, listeningQuestions: parseInt(e.target.value)})}
                className="w-full border rounded-lg px-3 py-2"
                min="1"
                max="20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reading Questions</label>
              <input
                type="number"
                value={formData.readingQuestions}
                onChange={(e) => setFormData({...formData, readingQuestions: parseInt(e.target.value)})}
                className="w-full border rounded-lg px-3 py-2"
                min="1"
                max="20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Writing Questions</label>
              <input
                type="number"
                value={formData.writingQuestions}
                onChange={(e) => setFormData({...formData, writingQuestions: parseInt(e.target.value)})}
                className="w-full border rounded-lg px-3 py-2"
                min="1"
                max="5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Speaking Questions</label>
              <input
                type="number"
                value={formData.speakingQuestions}
                onChange={(e) => setFormData({...formData, speakingQuestions: parseInt(e.target.value)})}
                className="w-full border rounded-lg px-3 py-2"
                min="1"
                max="10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Test Instructions</label>
            <textarea
              value={formData.instructions}
              onChange={(e) => setFormData({...formData, instructions: e.target.value})}
              className="w-full border rounded-lg px-3 py-2 h-24"
              placeholder="Enter test instructions for students..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Passing Score (%)</label>
            <input
              type="number"
              value={formData.passingScore}
              onChange={(e) => setFormData({...formData, passingScore: parseInt(e.target.value)})}
              className="w-full border rounded-lg px-3 py-2"
              min="0"
              max="100"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50 whitespace-nowrap"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap"
            >
              Create Test
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
