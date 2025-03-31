'use client'
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowDown, 
  ArrowUp, 
  FileDown, 
  RefreshCw
} from 'lucide-react';

const OrderManagement = () => {
  // Sample orders data
  const initialOrders = [
    {
      id: "ORD-5267",
      productName: "Wireless Earbuds Pro",
      productId: "P-1234",
      price: 129.99,
      quantity: 1,
      totalPrice: 129.99,
      orderDate: "2025-03-25",
      customer: "John Smith",
      shippingAddress: "123 Main St, Apt 4B, New York, NY 10001",
      orderType: "Standard",
      status: "Delivered"
    },
    {
      id: "ORD-5268",
      productName: "Smart Watch Ultra",
      productId: "P-2345",
      price: 249.99,
      quantity: 1,
      totalPrice: 249.99,
      orderDate: "2025-03-26",
      customer: "Emily Johnson",
      shippingAddress: "456 Park Ave, Boston, MA 02115",
      orderType: "Express",
      status: "Shipped"
    },
    {
      id: "ORD-5269",
      productName: "Bluetooth Speaker",
      productId: "P-3456",
      price: 79.99,
      quantity: 2,
      totalPrice: 159.98,
      orderDate: "2025-03-27",
      customer: "Michael Brown",
      shippingAddress: "789 Oak St, Chicago, IL 60601",
      orderType: "Standard",
      status: "Processing"
    },
    {
      id: "ORD-5270",
      productName: "Laptop Sleeve",
      productId: "P-4567",
      price: 29.99,
      quantity: 1,
      totalPrice: 29.99,
      orderDate: "2025-03-27",
      customer: "Sarah Davis",
      shippingAddress: "101 Pine Rd, Seattle, WA 98101",
      orderType: "Standard",
      status: "Processing"
    },
    {
      id: "ORD-5271",
      productName: "Mechanical Keyboard",
      productId: "P-5678",
      price: 149.99,
      quantity: 1,
      totalPrice: 149.99,
      orderDate: "2025-03-28",
      customer: "David Wilson",
      shippingAddress: "202 Maple Dr, Austin, TX 78701",
      orderType: "Express",
      status: "Confirmed"
    },
    {
      id: "ORD-5272",
      productName: "4K Monitor",
      productId: "P-6789",
      price: 349.99,
      quantity: 1,
      totalPrice: 349.99,
      orderDate: "2025-03-28",
      customer: "Jennifer Martinez",
      shippingAddress: "303 Cedar Ln, San Francisco, CA 94102",
      orderType: "Premium",
      status: "Confirmed"
    },
    {
      id: "ORD-5273",
      productName: "Wireless Mouse",
      productId: "P-7890",
      price: 49.99,
      quantity: 2,
      totalPrice: 99.98,
      orderDate: "2025-03-29",
      customer: "Robert Taylor",
      shippingAddress: "404 Birch Blvd, Miami, FL 33101",
      orderType: "Standard",
      status: "Processing"
    },
    {
      id: "ORD-5274",
      productName: "USB-C Hub",
      productId: "P-8901",
      price: 39.99,
      quantity: 1,
      totalPrice: 39.99,
      orderDate: "2025-03-29",
      customer: "Lisa Anderson",
      shippingAddress: "505 Elm St, Denver, CO 80201",
      orderType: "Express",
      status: "Confirmed"
    }
  ];

  // State for orders and search/filter
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'orderDate', direction: 'desc' });

  // Filter orders based on search query
  const filteredOrders = orders.filter(order =>
    order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.productId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.orderType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Request sort
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Get sort indicator
  const getSortDirectionIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="h-4 w-4 ml-1" /> 
      : <ArrowDown className="h-4 w-4 ml-1" />;
  };

  // Status badge styles
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Order type badge styles
  const getOrderTypeBadgeStyle = (type) => {
    switch (type) {
      case 'Express':
        return 'bg-orange-100 text-orange-800';
      case 'Premium':
        return 'bg-indigo-100 text-indigo-800';
      case 'Standard':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 w-full mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Order Management</h1>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 border rounded-md text-sm flex items-center gap-2 text-gray-600 hover:bg-gray-50">
            <FileDown className="h-4 w-4" />
            Export
          </button>
          <button className="px-3 py-2 border rounded-md text-sm flex items-center gap-2 text-gray-600 hover:bg-gray-50">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="text-sm text-gray-500">
          Total <span className="font-medium">{sortedOrders.length}</span> orders
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full sm:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-2 border rounded-lg text-gray-500">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Orders Table */}
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('id')}
                >
                  <div className="flex items-center">
                    Order ID {getSortDirectionIndicator('id')}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('orderDate')}
                >
                  <div className="flex items-center">
                    Date {getSortDirectionIndicator('orderDate')}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th 
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('quantity')}
                >
                  <div className="flex items-center justify-end">
                    Qty {getSortDirectionIndicator('quantity')}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('totalPrice')}
                >
                  <div className="flex items-center justify-end">
                    Price {getSortDirectionIndicator('totalPrice')}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ship To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {order.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{order.productName}</div>
                    <div className="text-xs text-gray-500">ID: {order.productId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                    {order.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                    ${order.totalPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    <div className="truncate max-w-xs" title={order.shippingAddress}>
                      {order.shippingAddress}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getOrderTypeBadgeStyle(order.orderType)}`}>
                      {order.orderType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusBadgeStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
              
              {sortedOrders.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-10 text-center text-gray-500">
                    No orders found. Try adjusting your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer / Pagination */}
        <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
          <div className="hidden sm:block text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedOrders.length}</span> of{" "}
            <span className="font-medium">{orders.length}</span> orders
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border rounded text-sm bg-white text-gray-500">
              Previous
            </button>
            <button className="px-3 py-1 border rounded text-sm bg-white text-gray-500">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;