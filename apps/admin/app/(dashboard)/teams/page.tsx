'use client'
import React, { useState } from 'react';
import { 
  UserPlus, 
  MoreHorizontal,
  Search,
  Check,
  X
} from 'lucide-react';

const TeamMembersList = () => {
  // Sample team members data
  const initialMembers = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", active: true },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Developer", active: true },
    { id: 3, name: "Robert Johnson", email: "robert.johnson@example.com", role: "Designer", active: true },
    { id: 4, name: "Emily Davis", email: "emily.davis@example.com", role: "Marketing", active: false },
    { id: 5, name: "Michael Wilson", email: "michael.wilson@example.com", role: "Developer", active: true },
    { id: 6, name: "Sarah Brown", email: "sarah.brown@example.com", role: "Product Manager", active: true },
    { id: 7, name: "David Miller", email: "david.miller@example.com", role: "Customer Support", active: false },
    { id: 8, name: "Emma Taylor", email: "emma.taylor@example.com", role: "HR Manager", active: true },
  ];

  // State for team members and search
  const [members, setMembers] = useState(initialMembers);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter members based on search query
  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 w-full relative mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Team Members</h1>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <UserPlus className="h-4 w-4" />
          Create New Member
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">{filteredMembers.length}</span> team members
        </div>
        
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search members..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Team Members Table */}
      <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600 font-medium">
                          {member.name.split(' ').map(name => name[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{member.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{member.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{member.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.active ? (
                      <span className="px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        <Check className="h-3 w-3 mr-1" /> Active
                      </span>
                    ) : (
                      <span className="px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        <X className="h-3 w-3 mr-1" /> Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end">
                      <button className="text-gray-400 hover:text-gray-500">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                    No team members found. Try adjusting your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer / Pagination */}
        <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
          <div className="hidden sm:block text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredMembers.length}</span> of{" "}
            <span className="font-medium">{members.length}</span> team members
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border rounded text-sm bg-white text-gray-500" disabled>
              Previous
            </button>
            <button className="px-3 py-1 border rounded text-sm bg-white text-gray-500" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMembersList;