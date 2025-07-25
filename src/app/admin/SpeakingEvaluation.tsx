
'use client';

import { useState } from 'react';

export default function SpeakingEvaluation() {
  const [pendingEvaluations, setPendingEvaluations] = useState([
    {
      id: 1,
      studentName: 'Sarah Johnson',
      testName: 'IELTS Mock Test #3',
      part: 'Part 2',
      question: 'Describe a memorable journey you have taken',
      submittedAt: '2024-01-25 14:30',
      duration: '2:15',
      audioUrl: 'audio_sample_1.mp3',
      status: 'Pending',
      aiScore: 6.5,
      aiConfidence: 0.85
    },
    {
      id: 2,
      studentName: 'Michael Chen',
      testName: 'IELTS Mock Test #2',
      part: 'Part 1',
      question: 'Tell me about your hometown',
      submittedAt: '2024-01-25 13:45',
      duration: '1:30',
      audioUrl: 'audio_sample_2.mp3',
      status: 'Pending',
      aiScore: 7.0,
      aiConfidence: 0.92
    }
  ]);

  const [completedEvaluations, setCompletedEvaluations] = useState([
    {
      id: 3,
      studentName: 'Emily Rodriguez',
      testName: 'IELTS Mock Test #1',
      part: 'Part 3',
      question: 'What are the advantages of traveling?',
      submittedAt: '2024-01-24 16:20',
      duration: '2:45',
      evaluatedAt: '2024-01-24 17:00',
      evaluatedBy: 'Dr. Smith',
      humanScore: 6.0,
      aiScore: 6.5,
      feedback: 'Good vocabulary usage, but need to work on fluency and pronunciation.',
      status: 'Completed'
    }
  ]);

  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);

  const handleEvaluate = (evaluation: any) => {
    setSelectedEvaluation(evaluation);
    setShowEvaluationModal(true);
  };

  const handleSaveEvaluation = (evaluationData: any) => {
    const updatedEvaluation = {
      ...selectedEvaluation,
      ...evaluationData,
      status: 'Completed',
      evaluatedAt: new Date().toISOString(),
      evaluatedBy: 'Current Admin'
    };

    setPendingEvaluations(prev => prev.filter(e => e.id !== selectedEvaluation.id));
    setCompletedEvaluations(prev => [...prev, updatedEvaluation]);
    setShowEvaluationModal(false);
    setSelectedEvaluation(null);
  };

  const criteria = [
    { name: 'Fluency & Coherence', weight: 25 },
    { name: 'Lexical Resource', weight: 25 },
    { name: 'Grammatical Range & Accuracy', weight: 25 },
    { name: 'Pronunciation', weight: 25 }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Speaking Evaluation</h1>
          <p className="text-gray-600">Evaluate student speaking responses</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center whitespace-nowrap">
            <i className="ri-settings-line w-4 h-4 mr-2"></i>
            AI Settings
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center whitespace-nowrap">
            <i className="ri-download-line w-4 h-4 mr-2"></i>
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Evaluations</p>
              <p className="text-2xl font-bold text-gray-900">{pendingEvaluations.length}</p>
            </div>
            <div className="bg-orange-500 w-12 h-12 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-white text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Today</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center">
              <i className="ri-check-line text-white text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">6.4</p>
            </div>
            <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center">
              <i className="ri-trophy-line text-white text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Pending Evaluations</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test/Part
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Question
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  AI Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingEvaluations.map((evaluation) => (
                <tr key={evaluation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{evaluation.studentName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{evaluation.testName}</div>
                    <div className="text-sm text-gray-500">{evaluation.part}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{evaluation.question}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {evaluation.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 mr-2">{evaluation.aiScore}</span>
                      <span className="text-xs text-gray-500">({Math.round(evaluation.aiConfidence * 100)}%)</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {evaluation.submittedAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 w-8 h-8 flex items-center justify-center">
                        <i className="ri-play-line"></i>
                      </button>
                      <button
                        onClick={() => handleEvaluate(evaluation)}
                        className="text-green-600 hover:text-green-900 w-8 h-8 flex items-center justify-center"
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Recent Evaluations</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test/Part
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Human Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  AI Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Evaluated By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {completedEvaluations.map((evaluation) => (
                <tr key={evaluation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{evaluation.studentName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{evaluation.testName}</div>
                    <div className="text-sm text-gray-500">{evaluation.part}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-lg font-bold text-gray-900">{evaluation.humanScore}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{evaluation.aiScore}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {evaluation.evaluatedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {evaluation.evaluatedAt.split('T')[0]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 w-8 h-8 flex items-center justify-center">
                      <i className="ri-eye-line"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showEvaluationModal && selectedEvaluation && (
        <EvaluationModal
          evaluation={selectedEvaluation}
          criteria={criteria}
          onSave={handleSaveEvaluation}
          onCancel={() => setShowEvaluationModal(false)}
        />
      )}
    </div>
  );
}

function EvaluationModal({ evaluation, criteria, onSave, onCancel }: any) {
  const [scores, setScores] = useState({
    fluency: 6.0,
    lexical: 6.0,
    grammar: 6.0,
    pronunciation: 6.0
  });

  const [feedback, setFeedback] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const overallScore = (scores.fluency + scores.lexical + scores.grammar + scores.pronunciation) / 4;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      humanScore: parseFloat(overallScore.toFixed(1)),
      feedback,
      criteriaScores: scores
    });
  };

  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Evaluate Speaking Response</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold mb-2">Student Information</h3>
              <p><strong>Name:</strong> {evaluation.studentName}</p>
              <p><strong>Test:</strong> {evaluation.testName}</p>
              <p><strong>Part:</strong> {evaluation.part}</p>
              <p><strong>Duration:</strong> {evaluation.duration}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold mb-2">Question</h3>
              <p className="text-gray-700">{evaluation.question}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold mb-2">Audio Response</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handlePlayAudio}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center whitespace-nowrap"
                >
                  <i className={`${isPlaying ? 'ri-pause-line' : 'ri-play-line'} w-4 h-4 mr-2`}></i>
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                <span className="text-sm text-gray-600">{evaluation.audioUrl}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">AI Assessment</h3>
              <div className="flex items-center space-x-4">
                <span className="text-lg font-bold">Score: {evaluation.aiScore}</span>
                <span className="text-sm text-gray-600">
                  Confidence: {Math.round(evaluation.aiConfidence * 100)}%
                </span>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="font-semibold mb-4">Evaluation Criteria</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fluency & Coherence
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        min="1"
                        max="9"
                        step="0.5"
                        value={scores.fluency}
                        onChange={(e) => setScores({...scores, fluency: parseFloat(e.target.value)})}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-8">{scores.fluency}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lexical Resource
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        min="1"
                        max="9"
                        step="0.5"
                        value={scores.lexical}
                        onChange={(e) => setScores({...scores, lexical: parseFloat(e.target.value)})}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-8">{scores.lexical}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Grammatical Range & Accuracy
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        min="1"
                        max="9"
                        step="0.5"
                        value={scores.grammar}
                        onChange={(e) => setScores({...scores, grammar: parseFloat(e.target.value)})}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-8">{scores.grammar}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pronunciation
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        min="1"
                        max="9"
                        step="0.5"
                        value={scores.pronunciation}
                        onChange={(e) => setScores({...scores, pronunciation: parseFloat(e.target.value)})}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-8">{scores.pronunciation}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold">Overall Score</h4>
                <p className="text-2xl font-bold text-blue-600">{overallScore.toFixed(1)}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Detailed Feedback
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 h-32"
                  placeholder="Provide detailed feedback on strengths and areas for improvement..."
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">{feedback.length}/500 characters</p>
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
                  Save Evaluation
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
