
'use client';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'ri-dashboard-line' },
    { id: 'questionBank', label: 'Question Bank', icon: 'ri-question-line' },
    { id: 'testBuilder', label: 'Test Builder', icon: 'ri-tools-line' },
    { id: 'userManagement', label: 'User Management', icon: 'ri-user-line' },
    { id: 'resultsReports', label: 'Results & Reports', icon: 'ri-file-chart-line' },
    { id: 'paymentManagement', label: 'Payment Management', icon: 'ri-money-dollar-circle-line' },
    { id: 'contentManagement', label: 'Content Management', icon: 'ri-file-text-line' },
    { id: 'speakingEvaluation', label: 'Speaking Evaluation', icon: 'ri-mic-line' },
    { id: 'roleManagement', label: 'Role Management', icon: 'ri-shield-user-line' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">IELTS CD Admin</h2>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center px-6 py-3 text-left hover:bg-blue-50 transition-colors ${
              activeTab === item.id ? 'bg-blue-100 border-r-4 border-blue-600 text-blue-600' : 'text-gray-700'
            }`}
          >
            <i className={`${item.icon} w-5 h-5 mr-3`}></i>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
