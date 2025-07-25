
'use client';

import { useState } from 'react';

export default function RoleManagement() {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Super Admin',
      description: 'Full access to all system features',
      permissions: ['all'],
      userCount: 2,
      color: 'bg-red-100 text-red-800',
      editable: false
    },
    {
      id: 2,
      name: 'Content Manager',
      description: 'Manage questions, tests, and content',
      permissions: ['question_bank', 'test_builder', 'content_management'],
      userCount: 5,
      color: 'bg-blue-100 text-blue-800',
      editable: true
    },
    {
      id: 3,
      name: 'Evaluator',
      description: 'Evaluate speaking responses and provide feedback',
      permissions: ['speaking_evaluation', 'results_reports'],
      userCount: 8,
      color: 'bg-green-100 text-green-800',
      editable: true
    },
    {
      id: 4,
      name: 'Support Staff',
      description: 'Handle user support and basic management',
      permissions: ['user_management', 'results_reports'],
      userCount: 3,
      color: 'bg-yellow-100 text-yellow-800',
      editable: true
    }
  ]);

  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@ieltscd.com',
      role: 'Super Admin',
      lastLogin: '2024-01-25 10:30',
      status: 'Active',
      avatar: 'JS'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@ieltscd.com',
      role: 'Content Manager',
      lastLogin: '2024-01-25 09:15',
      status: 'Active',
      avatar: 'SW'
    },
    {
      id: 3,
      name: 'Dr. Michael Chen',
      email: 'michael.chen@ieltscd.com',
      role: 'Evaluator',
      lastLogin: '2024-01-24 16:45',
      status: 'Active',
      avatar: 'MC'
    },
    {
      id: 4,
      name: 'Lisa Anderson',
      email: 'lisa.anderson@ieltscd.com',
      role: 'Support Staff',
      lastLogin: '2024-01-23 14:20',
      status: 'Inactive',
      avatar: 'LA'
    }
  ]);

  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const allPermissions = [
    { id: 'dashboard', name: 'Dashboard', description: 'View system dashboard and analytics' },
    { id: 'question_bank', name: 'Question Bank', description: 'Manage test questions and content' },
    { id: 'test_builder', name: 'Test Builder', description: 'Create and manage tests' },
    { id: 'user_management', name: 'User Management', description: 'Manage student accounts' },
    { id: 'results_reports', name: 'Results & Reports', description: 'View and export test results' },
    { id: 'payment_management', name: 'Payment Management', description: 'Handle transactions and subscriptions' },
    { id: 'content_management', name: 'Content Management', description: 'Manage website content' },
    { id: 'speaking_evaluation', name: 'Speaking Evaluation', description: 'Evaluate speaking responses' },
    { id: 'role_management', name: 'Role Management', description: 'Manage admin roles and permissions' }
  ];

  const handleAddRole = () => {
    setSelectedRole(null);
    setShowRoleModal(true);
  };

  const handleEditRole = (role: any) => {
    setSelectedRole(role);
    setShowRoleModal(true);
  };

  const handleAddAdmin = () => {
    setSelectedAdmin(null);
    setShowAdminModal(true);
  };

  const handleEditAdmin = (admin: any) => {
    setSelectedAdmin(admin);
    setShowAdminModal(true);
  };

  const handleSaveRole = (roleData: any) => {
    if (selectedRole) {
      setRoles(roles.map(role => 
        role.id === selectedRole.id ? { ...role, ...roleData } : role
      ));
    } else {
      const newRole = {
        id: Date.now(),
        userCount: 0,
        color: 'bg-gray-100 text-gray-800',
        editable: true,
        ...roleData
      };
      setRoles([...roles, newRole]);
    }
    setShowRoleModal(false);
  };

  const handleSaveAdmin = (adminData: any) => {
    if (selectedAdmin) {
      setAdmins(admins.map(admin => 
        admin.id === selectedAdmin.id ? { ...admin, ...adminData } : admin
      ));
    } else {
      const newAdmin = {
        id: Date.now(),
        lastLogin: 'Never',
        status: 'Active',
        avatar: adminData.name.split(' ').map((n: string) => n[0]).join(''),
        ...adminData
      };
      setAdmins([...admins, newAdmin]);
    }
    setShowAdminModal(false);
  };

  const handleDeleteRole = (roleId: number) => {
    setRoles(roles.filter(role => role.id !== roleId));
  };

  const handleDeleteAdmin = (adminId: number) => {
    setAdmins(admins.filter(admin => admin.id !== adminId));
  };

  const handleToggleAdminStatus = (adminId: number) => {
    setAdmins(admins.map(admin => 
      admin.id === adminId 
        ? { ...admin, status: admin.status === 'Active' ? 'Inactive' : 'Active' }
        : admin
    ));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Role Management</h1>
          <p className="text-gray-600">Manage admin roles and permissions</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleAddRole}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center whitespace-nowrap"
          >
            <i className="ri-add-line w-4 h-4 mr-2"></i>
            Add Role
          </button>
          <button
            onClick={handleAddAdmin}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center whitespace-nowrap"
          >
            <i className="ri-user-add-line w-4 h-4 mr-2"></i>
            Add Admin
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Roles</p>
              <p className="text-2xl font-bold text-gray-900">{roles.length}</p>
            </div>
            <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center">
              <i className="ri-shield-user-line text-white text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Admins</p>
              <p className="text-2xl font-bold text-gray-900">{admins.length}</p>
            </div>
            <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center">
              <i className="ri-admin-line text-white text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Admins</p>
              <p className="text-2xl font-bold text-gray-900">
                {admins.filter(admin => admin.status === 'Active').length}
              </p>
            </div>
            <div className="bg-purple-500 w-12 h-12 rounded-lg flex items-center justify-center">
              <i className="ri-user-star-line text-white text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Roles & Permissions</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {roles.map((role) => (
                <div key={role.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${role.color}`}>
                        {role.name}
                      </span>
                      <span className="text-sm text-gray-500">{role.userCount} users</span>
                    </div>
                    <div className="flex space-x-2">
                      {role.editable && (
                        <>
                          <button
                            onClick={() => handleEditRole(role)}
                            className="text-blue-600 hover:text-blue-800 w-8 h-8 flex items-center justify-center"
                          >
                            <i className="ri-edit-line"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteRole(role.id)}
                            className="text-red-600 hover:text-red-800 w-8 h-8 flex items-center justify-center"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{role.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions[0] === 'all' ? (
                      <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs">
                        All Permissions
                      </span>
                    ) : (
                      role.permissions.map((permission) => (
                        <span key={permission} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {permission.replace('_', ' ')}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Admin Users</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {admins.map((admin) => (
                <div key={admin.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                        {admin.avatar}
                      </div>
                      <div>
                        <p className="font-medium">{admin.name}</p>
                        <p className="text-sm text-gray-500">{admin.email}</p>
                        <p className="text-xs text-gray-400">Last login: {admin.lastLogin}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        admin.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {admin.status}
                      </span>
                      <button
                        onClick={() => handleToggleAdminStatus(admin.id)}
                        className="text-blue-600 hover:text-blue-800 w-8 h-8 flex items-center justify-center"
                      >
                        <i className="ri-toggle-line"></i>
                      </button>
                      <button
                        onClick={() => handleEditAdmin(admin)}
                        className="text-gray-600 hover:text-gray-800 w-8 h-8 flex items-center justify-center"
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="text-red-600 hover:text-red-800 w-8 h-8 flex items-center justify-center"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm font-medium text-gray-700">Role: </span>
                    <span className="text-sm text-gray-600">{admin.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showRoleModal && (
        <RoleModal
          role={selectedRole}
          permissions={allPermissions}
          onSave={handleSaveRole}
          onCancel={() => setShowRoleModal(false)}
        />
      )}

      {showAdminModal && (
        <AdminModal
          admin={selectedAdmin}
          roles={roles}
          onSave={handleSaveAdmin}
          onCancel={() => setShowAdminModal(false)}
        />
      )}
    </div>
  );
}

function RoleModal({ role, permissions, onSave, onCancel }: any) {
  const [formData, setFormData] = useState({
    name: role?.name || '',
    description: role?.description || '',
    permissions: role?.permissions || []
  });

  const handlePermissionToggle = (permissionId: string) => {
    if (formData.permissions.includes(permissionId)) {
      setFormData({
        ...formData,
        permissions: formData.permissions.filter((p: string) => p !== permissionId)
      });
    } else {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, permissionId]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{role ? 'Edit Role' : 'Add New Role'}</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full border rounded-lg px-3 py-2 h-20"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {permissions.map((permission: any) => (
                <div key={permission.id} className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id={permission.id}
                    checked={formData.permissions.includes(permission.id)}
                    onChange={() => handlePermissionToggle(permission.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor={permission.id} className="text-sm font-medium text-gray-700">
                      {permission.name}
                    </label>
                    <p className="text-xs text-gray-500">{permission.description}</p>
                  </div>
                </div>
              ))}
            </div>
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
              {role ? 'Update Role' : 'Create Role'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdminModal({ admin, roles, onSave, onCancel }: any) {
  const [formData, setFormData] = useState({
    name: admin?.name || '',
    email: admin?.email || '',
    role: admin?.role || roles[0]?.name || '',
    status: admin?.status || 'Active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{admin ? 'Edit Admin' : 'Add New Admin'}</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full border rounded-lg px-3 py-2 pr-8"
              required
            >
              {roles.map((role: any) => (
                <option key={role.id} value={role.name}>{role.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full border rounded-lg px-3 py-2 pr-8"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
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
              {admin ? 'Update Admin' : 'Create Admin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
