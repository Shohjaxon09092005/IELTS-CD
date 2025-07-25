
'use client';

import { useState } from 'react';

export default function QuestionBank() {
  const [selectedModule, setSelectedModule] = useState('listening');
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      module: 'listening',
      type: 'multiple-choice',
      question: 'What is the main topic of the conversation?',
      difficulty: 'medium',
      audioFile: 'listening_1.mp3',
      options: ['Travel plans', 'Work schedule', 'Weekend activities', 'Study plans'],
      correctAnswer: 'Travel plans',
      explanation: 'The speakers discuss their upcoming trip to Europe.'
    },
    {
      id: 2,
      module: 'reading',
      type: 'true-false',
      question: 'The author supports the use of renewable energy.',
      difficulty: 'easy',
      passage: 'Climate change is one of the most pressing issues...',
      correctAnswer: 'True',
      explanation: 'The author clearly states benefits of renewable energy in paragraph 2.'
    }
  ]);

  const modules = [
    { id: 'listening', name: 'Listening', icon: 'ri-headphone-line' },
    { id: 'reading', name: 'Reading', icon: 'ri-book-open-line' },
    { id: 'writing', name: 'Writing', icon: 'ri-pencil-line' },
    { id: 'speaking', name: 'Speaking', icon: 'ri-mic-line' }
  ];

  const questionTypes = {
    listening: ['multiple-choice', 'fill-blanks', 'matching', 'labeling'],
    reading: ['multiple-choice', 'true-false', 'matching', 'summary'],
    writing: ['task1-chart', 'task1-process', 'task2-essay'],
    speaking: ['part1-intro', 'part2-topic', 'part3-discussion']
  };

  const filteredQuestions = questions.filter(q => q.module === selectedModule);

  const handleAddQuestion = (newQuestion: any) => {
    const question = {
      id: Date.now(),
      module: selectedModule,
      ...newQuestion
    };
    setQuestions([...questions, question]);
    setShowAddQuestion(false);
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Question Bank Management</h1>
          <p className="text-gray-600">Organize and manage test questions by module</p>
        </div>
        <button
          onClick={() => setShowAddQuestion(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center whitespace-nowrap"
        >
          <i className="ri-add-line w-4 h-4 mr-2"></i>
          Add Question
        </button>
      </div>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => setSelectedModule(module.id)}
                className={`py-4 border-b-2 font-medium text-sm flex items-center ${
                  selectedModule === module.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <i className={`${module.icon} w-4 h-4 mr-2`}></i>
                {module.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold capitalize">{selectedModule} Questions</h3>
            <p className="text-sm text-gray-600">{filteredQuestions.length} questions available</p>
          </div>

          <div className="space-y-4">
            {filteredQuestions.map((question) => (
              <div key={question.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mr-2">
                        {question.type}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                        question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {question.difficulty}
                      </span>
                    </div>
                    <p className="font-medium text-gray-900 mb-2">{question.question}</p>
                    {question.audioFile && (
                      <p className="text-sm text-gray-600 mb-2">
                        <i className="ri-file-music-line mr-1"></i>
                        Audio: {question.audioFile}
                      </p>
                    )}
                    {question.options && (
                      <div className="text-sm text-gray-600 mb-2">
                        Options: {question.options.join(', ')}
                      </div>
                    )}
                    <p className="text-sm text-green-600">
                      <strong>Answer:</strong> {question.correctAnswer}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 w-8 h-8 flex items-center justify-center">
                      <i className="ri-edit-line"></i>
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(question.id)}
                      className="text-red-600 hover:text-red-800 w-8 h-8 flex items-center justify-center"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAddQuestion && (
        <AddQuestionModal
          module={selectedModule}
          questionTypes={questionTypes[selectedModule as keyof typeof questionTypes]}
          onSave={handleAddQuestion}
          onCancel={() => setShowAddQuestion(false)}
        />
      )}
    </div>
  );
}

function AddQuestionModal({ module, questionTypes, onSave, onCancel }: any) {
  const [formData, setFormData] = useState({
    type: questionTypes[0],
    question: '',
    difficulty: 'medium',
    options: ['', '', '', ''],
    correctAnswer: '',
    explanation: '',
    audioFile: '',
    imageFile: '',
    passage: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Question</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Question Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full border rounded-lg px-3 py-2 pr-8"
              >
                {questionTypes.map((type: string) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                className="w-full border rounded-lg px-3 py-2 pr-8"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
            <textarea
              value={formData.question}
              onChange={(e) => setFormData({...formData, question: e.target.value})}
              className="w-full border rounded-lg px-3 py-2 h-20"
              required
            />
          </div>

          {module === 'listening' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Audio File</label>
              <input
                type="file"
                accept="audio/*"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          )}

          {module === 'reading' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reading Passage</label>
              <textarea
                value={formData.passage}
                onChange={(e) => setFormData({...formData, passage: e.target.value})}
                className="w-full border rounded-lg px-3 py-2 h-32"
              />
            </div>
          )}

          {(formData.type === 'multiple-choice' || formData.type === 'matching') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
              {formData.options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...formData.options];
                    newOptions[index] = e.target.value;
                    setFormData({...formData, options: newOptions});
                  }}
                  className="w-full border rounded-lg px-3 py-2 mb-2"
                  placeholder={`Option ${index + 1}`}
                />
              ))}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correct Answer</label>
            <input
              type="text"
              value={formData.correctAnswer}
              onChange={(e) => setFormData({...formData, correctAnswer: e.target.value})}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Explanation</label>
            <textarea
              value={formData.explanation}
              onChange={(e) => setFormData({...formData, explanation: e.target.value})}
              className="w-full border rounded-lg px-3 py-2 h-20"
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
              Add Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
