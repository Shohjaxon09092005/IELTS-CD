
'use client';

import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import Dashboard from './Dashboard';
import QuestionBank from './QuestionBank';
import TestBuilder from './TestBuilder';
import UserManagement from './UserManagement';
import ResultsReports from './ResultsReports';
import PaymentManagement from './PaymentManagement';
import ContentManagement from './ContentManagement';
import SpeakingEvaluation from './SpeakingEvaluation';
import RoleManagement from './RoleManagement';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'questionBank':
        return <QuestionBank />;
      case 'testBuilder':
        return <TestBuilder />;
      case 'userManagement':
        return <UserManagement />;
      case 'resultsReports':
        return <ResultsReports />;
      case 'paymentManagement':
        return <PaymentManagement />;
      case 'contentManagement':
        return <ContentManagement />;
      case 'speakingEvaluation':
        return <SpeakingEvaluation />;
      case 'roleManagement':
        return <RoleManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}
