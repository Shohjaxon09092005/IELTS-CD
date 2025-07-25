
'use client';

import { useState } from 'react';

export default function ContentManagement() {
  const [activeSection, setActiveSection] = useState('banners');
  const [showAddModal, setShowAddModal] = useState(false);

  const [banners, setBanners] = useState([
    {
      id: 1,
      title: 'Welcome to IELTS CD',
      subtitle: 'Your path to IELTS success',
      image: 'https://readdy.ai/api/search-image?query=professional%20IELTS%20study%20materials%20and%20books%20on%20modern%20desk%20with%20soft%20lighting%20minimalist%20educational%20background%20blue%20and%20white%20theme%20inspiring%20learning%20atmosphere&width=800&height=400&seq=banner1&orientation=landscape',
      link: '/tests',
      status: 'Active',
      position: 'Homepage Hero'
    },
    {
      id: 2,
      title: 'Free Mock Test Available',
      subtitle: 'Test your skills today',
      image: 'https://readdy.ai/api/search-image?query=digital%20test%20interface%20on%20modern%20tablet%20with%20IELTS%20practice%20questions%20clean%20modern%20design%20educational%20technology%20blue%20accents%20professional%20study%20environment&width=600&height=300&seq=banner2&orientation=landscape',
      link: '/free-test',
      status: 'Active',
      position: 'Sidebar'
    }
  ]);

  const [notices, setNotices] = useState([
    {
      id: 1,
      title: 'System Maintenance Notice',
      content: 'Our system will be under maintenance on January 30th from 2:00 AM to 4:00 AM UTC.',
      type: 'maintenance',
      status: 'Active',
      startDate: '2024-01-25',
      endDate: '2024-01-30'
    },
    {
      id: 2,
      title: 'New Speaking Features Available',
      content: 'We have added new AI-powered speaking evaluation features to help you practice better.',
      type: 'feature',
      status: 'Active',
      startDate: '2024-01-20',
      endDate: '2024-02-20'
    }
  ]);

  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: 'How long does the IELTS test take?',
      answer: 'The IELTS test takes approximately 2 hours and 45 minutes in total.',
      category: 'General',
      status: 'Active',
      order: 1
    },
    {
      id: 2,
      question: 'What is the scoring system for IELTS?',
      answer: 'IELTS uses a 9-band scoring system, with 9 being the highest score.',
      category: 'Scoring',
      status: 'Active',
      order: 2
    }
  ]);

  const sections = [
    { id: 'banners', name: 'Banners', icon: 'ri-image-line' },
    { id: 'notices', name: 'Notices', icon: 'ri-notification-line' },
    { id: 'faqs', name: 'FAQs', icon: 'ri-question-answer-line' },
    { id: 'homepage', name: 'Homepage', icon: 'ri-home-line' }
  ];

  const handleAddItem = (item: any) => {
    const newItem = { id: Date.now(), ...item };
    
    if (activeSection === 'banners') {
      setBanners([...banners, newItem]);
    } else if (activeSection === 'notices') {
      setNotices([...notices, newItem]);
    } else if (activeSection === 'faqs') {
      setFaqs([...faqs, newItem]);
    }
    
    setShowAddModal(false);
  };

  const handleDeleteItem = (id: number) => {
    if (activeSection === 'banners') {
      setBanners(banners.filter(banner => banner.id !== id));
    } else if (activeSection === 'notices') {
      setNotices(notices.filter(notice => notice.id !== id));
    } else if (activeSection === 'faqs') {
      setFaqs(faqs.filter(faq => faq.id !== id));
    }
  };

  const handleToggleStatus = (id: number) => {
    if (activeSection === 'banners') {
      setBanners(banners.map(banner => 
        banner.id === id ? { ...banner, status: banner.status === 'Active' ? 'Inactive' : 'Active' } : banner
      ));
    } else if (activeSection === 'notices') {
      setNotices(notices.map(notice => 
        notice.id === id ? { ...notice, status: notice.status === 'Active' ? 'Inactive' : 'Active' } : notice
      ));
    } else if (activeSection === 'faqs') {
      setFaqs(faqs.map(faq => 
        faq.id === id ? { ...faq, status: faq.status === 'Active' ? 'Inactive' : 'Active' } : faq
      ));
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'banners':
        return (
          <div className="space-y-4">
            {banners.map((banner) => (
              <div key={banner.id} className="bg-white border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img src={banner.image} alt={banner.title} className="w-24 h-12 object-cover rounded" />
                    <div>
                      <h3 className="font-semibold">{banner.title}</h3>
                      <p className="text-sm text-gray-600">{banner.subtitle}</p>
                      <p className="text-xs text-gray-500">Position: {banner.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      banner.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {banner.status}
                    </span>
                    <button
                      onClick={() => handleToggleStatus(banner.id)}
                      className="text-blue-600 hover:text-blue-800 w-8 h-8 flex items-center justify-center"
                    >
                      <i className="ri-toggle-line"></i>
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 w-8 h-8 flex items-center justify-center">
                      <i className="ri-edit-line"></i>
                    </button>
                    <button
                      onClick={() => handleDeleteItem(banner.id)}
                      className="text-red-600 hover:text-red-800 w-8 h-8 flex items-center justify-center"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'notices':
        return (
          <div className="space-y-4">
            {notices.map((notice) => (
              <div key={notice.id} className="bg-white border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold">{notice.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${
                        notice.type === 'maintenance' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {notice.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notice.content}</p>
                    <p className="text-xs text-gray-500">
                      {notice.startDate} - {notice.endDate}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      notice.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {notice.status}
                    </span>
                    <button
                      onClick={() => handleToggleStatus(notice.id)}
                      className="text-blue-600 hover:text-blue-800 w-8 h-8 flex items-center justify-center"
                    >
                      <i className="ri-toggle-line"></i>
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 w-8 h-8 flex items-center justify-center">
                      <i className="ri-edit-line"></i>
                    </button>
                    <button
                      onClick={() => handleDeleteItem(notice.id)}
                      className="text-red-600 hover:text-red-800 w-8 h-8 flex items-center justify-center"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'faqs':
        return (
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold">{faq.question}</h3>
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                        {faq.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{faq.answer}</p>
                    <p className="text-xs text-gray-500">Order: {faq.order}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      faq.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {faq.status}
                    </span>
                    <button
                      onClick={() => handleToggleStatus(faq.id)}
                      className="text-blue-600 hover:text-blue-800 w-8 h-8 flex items-center justify-center"
                    >
                      <i className="ri-toggle-line"></i>
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 w-8 h-8 flex items-center justify-center">
                      <i className="ri-edit-line"></i>
                    </button>
                    <button
                      onClick={() => handleDeleteItem(faq.id)}
                      className="text-red-600 hover:text-red-800 w-8 h-8 flex items-center justify-center"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'homepage':
        return <HomepageEditor />;

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Content Management</h1>
          <p className="text-gray-600">Manage website content and information</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center whitespace-nowrap"
        >
          <i className="ri-add-line w-4 h-4 mr-2"></i>
          Add {activeSection.slice(0, -1)}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`py-4 border-b-2 font-medium text-sm flex items-center ${
                  activeSection === section.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <i className={`${section.icon} w-4 h-4 mr-2`}></i>
                {section.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
      </div>

      {showAddModal && (
        <AddContentModal
          type={activeSection}
          onSave={handleAddItem}
          onCancel={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}

function HomepageEditor() {
  const [homeContent, setHomeContent] = useState({
    heroTitle: 'Master IELTS with Confidence',
    heroSubtitle: 'Practice with authentic test materials and get instant feedback',
    heroButtonText: 'Start Free Test',
    featuresTitle: 'Why Choose IELTS CD?',
    features: [
      'Authentic practice materials',
      'Instant feedback and scoring',
      'Comprehensive skill development',
      'Expert guidance and tips'
    ]
  });

  const handleSave = () => {
    console.log('Saving homepage content:', homeContent);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-4">Hero Section</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
            <input
              type="text"
              value={homeContent.heroTitle}
              onChange={(e) => setHomeContent({...homeContent, heroTitle: e.target.value})}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle</label>
            <textarea
              value={homeContent.heroSubtitle}
              onChange={(e) => setHomeContent({...homeContent, heroSubtitle: e.target.value})}
              className="w-full border rounded-lg px-3 py-2 h-20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
            <input
              type="text"
              value={homeContent.heroButtonText}
              onChange={(e) => setHomeContent({...homeContent, heroButtonText: e.target.value})}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-4">Features Section</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
            <input
              type="text"
              value={homeContent.featuresTitle}
              onChange={(e) => setHomeContent({...homeContent, featuresTitle: e.target.value})}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
            {homeContent.features.map((feature, index) => (
              <input
                key={index}
                type="text"
                value={feature}
                onChange={(e) => {
                  const newFeatures = [...homeContent.features];
                  newFeatures[index] = e.target.value;
                  setHomeContent({...homeContent, features: newFeatures});
                }}
                className="w-full border rounded-lg px-3 py-2 mb-2"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 whitespace-nowrap"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

function AddContentModal({ type, onSave, onCancel }: any) {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    content: '',
    image: '',
    link: '',
    position: '',
    type: 'feature',
    category: 'General',
    question: '',
    answer: '',
    order: 1,
    startDate: '',
    endDate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add {type.slice(0, -1)}</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'banners' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({...formData, link: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <select
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 pr-8"
                >
                  <option value="Homepage Hero">Homepage Hero</option>
                  <option value="Sidebar">Sidebar</option>
                  <option value="Footer">Footer</option>
                </select>
              </div>
            </>
          )}

          {type === 'notices' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 h-24"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 pr-8"
                >
                  <option value="feature">Feature</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="announcement">Announcement</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>
            </>
          )}

          {type === 'faqs' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({...formData, question: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                <textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({...formData, answer: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 h-24"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 pr-8"
                  >
                    <option value="General">General</option>
                    <option value="Scoring">Scoring</option>
                    <option value="Test Format">Test Format</option>
                    <option value="Registration">Registration</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                    className="w-full border rounded-lg px-3 py-2"
                    min="1"
                  />
                </div>
              </div>
            </>
          )}

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
              Add {type.slice(0, -1)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
