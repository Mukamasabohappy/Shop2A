import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Mail, 
  ShoppingBag, 
  UserPlus,
  Star,
  Calendar,
  TrendingUp,
  ChevronDown,
  MoreHorizontal,
  Download
} from 'lucide-react';
import '../Dahboard/DashStyle/Customer.css';

const CustomerManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState('all');
  
  // Sample customer data
  const customers = [
    {
      id: 1,
      name: 'Emma Johnson',
      email: 'emma.j@example.com',
      avatar: '/api/placeholder/40/40',
      totalSpent: 1280,
      orders: 6,
      lastOrder: '2025-03-15',
      joinDate: '2024-08-12',
      status: 'active',
      loyaltyTier: 'gold'
    },
    {
      id: 2,
      name: 'Alexander Chen',
      email: 'alex.c@example.com',
      avatar: '/api/placeholder/40/40',
      totalSpent: 750,
      orders: 3,
      lastOrder: '2025-03-05',
      joinDate: '2024-11-23',
      status: 'active',
      loyaltyTier: 'silver'
    },
    {
      id: 3,
      name: 'Sophia Martinez',
      email: 'sophia.m@example.com',
      avatar: '/api/placeholder/40/40',
      totalSpent: 2450,
      orders: 11,
      lastOrder: '2025-03-22',
      joinDate: '2024-06-14',
      status: 'active',
      loyaltyTier: 'platinum'
    },
    {
      id: 4,
      name: 'Lucas Williams',
      email: 'lucas.w@example.com',
      avatar: '/api/placeholder/40/40',
      totalSpent: 320,
      orders: 2,
      lastOrder: '2025-01-18',
      joinDate: '2024-12-30',
      status: 'inactive',
      loyaltyTier: 'bronze'
    },
    {
      id: 5,
      name: 'Olivia Taylor',
      email: 'olivia.t@example.com',
      avatar: '/api/placeholder/40/40',
      totalSpent: 1870,
      orders: 8,
      lastOrder: '2025-03-19',
      joinDate: '2024-07-08',
      status: 'active',
      loyaltyTier: 'gold'
    }
  ];

  // Segments data
  const segments = [
    { id: 'all', name: 'All Customers', count: 3245 },
    { id: 'new', name: 'New (30 Days)', count: 286 },
    { id: 'loyal', name: 'Loyal Customers', count: 864 },
    { id: 'risk', name: 'At Risk', count: 152 },
    { id: 'inactive', name: 'Inactive', count: 493 }
  ];

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get loyalty tier badge color
  const getLoyaltyColor = (tier) => {
    switch(tier) {
      case 'platinum': return 'bg-purple-100 text-purple-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      case 'bronze': return 'bg-amber-100 text-amber-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="analytics-container">
      <div className="analytics-wrapper">
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-6 w-6 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              <button className="flex items-center px-3 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Customer
              </button>
            </div>
          </div>
          
          {/* Customer Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 text-sm">Total Customers</h3>
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold mt-2">3,245</p>
              <div className="flex items-center mt-2">
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                  +12%
                </span>
                <span className="text-xs text-gray-500 ml-2">vs last month</span>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 text-sm">Customer Lifetime Value</h3>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold mt-2">$245.80</p>
              <div className="flex items-center mt-2">
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                  +5.2%
                </span>
                <span className="text-xs text-gray-500 ml-2">vs last month</span>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 text-sm">Repeat Purchase Rate</h3>
                <ShoppingBag className="h-5 w-5 text-purple-500" />
              </div>
              <p className="text-2xl font-bold mt-2">68.5%</p>
              <div className="flex items-center mt-2">
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                  +2.4%
                </span>
                <span className="text-xs text-gray-500 ml-2">vs last month</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Customer segments */}
        <div className="flex overflow-x-auto gap-3 mb-6 pb-2">
          {segments.map(segment => (
            <button
              key={segment.id}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
                selectedSegment === segment.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedSegment(segment.id)}
            >
              {segment.name} ({segment.count})
            </button>
          ))}
        </div>
        
        {/* Search and filter bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search customers by name or email..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <div className="relative">
                <button 
                  className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setFilterOpen(!filterOpen)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>
                
                {filterOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <div className="p-3 border-b">
                      <h4 className="text-sm font-medium">Filter Customers</h4>
                    </div>
                    <div className="p-3">
                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select className="block w-full px-2 py-1 border border-gray-300 rounded-md text-sm">
                          <option>All Statuses</option>
                          <option>Active</option>
                          <option>Inactive</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Loyalty Tier</label>
                        <select className="block w-full px-2 py-1 border border-gray-300 rounded-md text-sm">
                          <option>All Tiers</option>
                          <option>Platinum</option>
                          <option>Gold</option>
                          <option>Silver</option>
                          <option>Bronze</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                        <select className="block w-full px-2 py-1 border border-gray-300 rounded-md text-sm">
                          <option>Any Time</option>
                          <option>Last 30 Days</option>
                          <option>Last 90 Days</option>
                          <option>This Year</option>
                        </select>
                      </div>
                    </div>
                    <div className="p-3 border-t bg-gray-50 flex justify-between">
                      <button className="text-sm text-gray-600">Reset</button>
                      <button className="text-sm font-medium text-blue-600">Apply Filters</button>
                    </div>
                  </div>
                )}
              </div>
              
              <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort
              </button>
            </div>
          </div>
        </div>
        
        {/* Customer table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loyalty</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={customer.avatar} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                        customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${customer.totalSpent.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.orders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                        {new Date(customer.lastOrder).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getLoyaltyColor(customer.loyaltyTier)}`}>
                        <Star className="h-3 w-3 mr-1" />
                        {customer.loyaltyTier.charAt(0).toUpperCase() + customer.loyaltyTier.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <Mail className="h-4 w-4" />
                        </button>
                        <button className="text-gray-500 hover:text-gray-700">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
                  <span className="font-medium">3,245</span> customers
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    <ChevronDown className="h-5 w-5 rotate-90" />
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-50">
                    2
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    4
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    5
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <ChevronDown className="h-5 w-5 -rotate-90" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;