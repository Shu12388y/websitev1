'use client'

import React, { useState } from 'react';
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  FileDown, 
  RefreshCw,
  Search,
  SlidersHorizontal
} from 'lucide-react';

const InventoryManagement = () => {
  // Sample product data
  const initialProducts = [
    { id: 1, name: "Wireless Earbuds", sku: "WE-001", category: "Electronics", price: 49.99, quantity: 120, status: "In Stock" },
    { id: 2, name: "Smart Watch", sku: "SW-002", category: "Electronics", price: 129.99, quantity: 85, status: "In Stock" },
    { id: 3, name: "Bluetooth Speaker", sku: "BS-003", category: "Electronics", price: 79.99, quantity: 42, status: "Low Stock" },
    { id: 4, name: "Phone Case", sku: "PC-004", category: "Accessories", price: 19.99, quantity: 200, status: "In Stock" },
    { id: 5, name: "USB-C Cable", sku: "UC-005", category: "Accessories", price: 12.99, quantity: 15, status: "Low Stock" },
    { id: 6, name: "Laptop Sleeve", sku: "LS-006", category: "Accessories", price: 29.99, quantity: 0, status: "Out of Stock" },
    { id: 7, name: "Wireless Keyboard", sku: "WK-007", category: "Electronics", price: 59.99, quantity: 75, status: "In Stock" },
    { id: 8, name: "Digital Camera", sku: "DC-008", category: "Electronics", price: 299.99, quantity: 0, status: "Out of Stock" }
  ];

  // Product categories
  const categories = ["Electronics", "Accessories", "Home & Kitchen", "Clothing", "Sports", "Books"];

  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Current product being edited/deleted
  const [currentProduct, setCurrentProduct] = useState(null);
  
  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    quantity: "",
    description: ""
  });

  // Filter products based on search query and active tab
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "in-stock") return matchesSearch && product.status === "In Stock";
    if (activeTab === "low-stock") return matchesSearch && product.status === "Low Stock";
    if (activeTab === "out-of-stock") return matchesSearch && product.status === "Out of Stock";
    
    return matchesSearch;
  });

  // Create a new product
  const handleCreateProduct = () => {
    // Validate required fields
    if (!newProduct.name || !newProduct.sku || !newProduct.category || !newProduct.price || !newProduct.quantity) {
      alert("Please fill in all required fields");
      return;
    }

    // Determine status based on quantity
    const quantity = parseInt(newProduct.quantity);
    const status = quantity <= 0 ? "Out of Stock" : quantity <= 20 ? "Low Stock" : "In Stock";

    const createdProduct = {
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      name: newProduct.name,
      sku: newProduct.sku,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      quantity,
      description: newProduct.description,
      status
    };

    setProducts([...products, createdProduct]);
    setNewProduct({
      name: "",
      sku: "",
      category: "",
      price: "",
      quantity: "",
      description: ""
    });
    setIsCreateModalOpen(false);
  };

  // Update an existing product
  const handleUpdateProduct = () => {
    if (!currentProduct) return;

    // Validate required fields
    if (!currentProduct.name || !currentProduct.sku || !currentProduct.category || !currentProduct.price || currentProduct.quantity === "") {
      alert("Please fill in all required fields");
      return;
    }

    // Determine status based on quantity
    const quantity = parseInt(currentProduct.quantity);
    const status = quantity <= 0 ? "Out of Stock" : quantity <= 20 ? "Low Stock" : "In Stock";

    const updatedProducts = products.map(product => {
      if (product.id === currentProduct.id) {
        return {
          ...currentProduct,
          price: parseFloat(currentProduct.price),
          quantity,
          status
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    setIsEditModalOpen(false);
    setCurrentProduct(null);
  };

  // Delete a product
  const handleDeleteProduct = () => {
    if (!currentProduct) return;
    
    const updatedProducts = products.filter(product => product.id !== currentProduct.id);
    setProducts(updatedProducts);
    setIsDeleteModalOpen(false);
    setCurrentProduct(null);
  };

  // Edit product handler
  const openEditModal = (product) => {
    setCurrentProduct({ ...product });
    setIsEditModalOpen(true);
  };

  // Delete product handler
  const openDeleteModal = (product) => {
    setCurrentProduct({ ...product });
    setIsDeleteModalOpen(true);
  };

  // Render status badge
  const StatusBadge = ({ status }) => {
    let bgColor = "bg-gray-100";
    let textColor = "text-gray-800";
    
    if (status === "In Stock") {
      bgColor = "bg-green-100";
      textColor = "text-green-800";
    } else if (status === "Low Stock") {
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-800";
    } else if (status === "Out of Stock") {
      bgColor = "bg-red-100";
      textColor = "text-red-800";
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
        {status}
      </span>
    );
  };

  // Modal component for reuse
  const Modal = ({ isOpen, onClose, title, children, footer }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md md:max-w-xl mx-4 overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-medium">{title}</h3>
          </div>
          <div className="px-6 py-4">
            {children}
          </div>
          <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-2">
            {footer}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 w-full mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <div className="flex items-center gap-4">
          <button className="px-3 py-2 border rounded-md text-sm flex items-center gap-2">
            <FileDown className="h-4 w-4" />
            Export
          </button>
          <button className="px-3 py-2 border rounded-md text-sm flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <button 
            className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm flex items-center gap-2"
            
          >
            <PlusCircle className="h-4 w-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button 
            className={`px-4 py-2 text-sm rounded-md ${activeTab === "all" ? "bg-white shadow" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Products
          </button>
          <button 
            className={`px-4 py-2 text-sm rounded-md ${activeTab === "in-stock" ? "bg-white shadow" : ""}`}
            onClick={() => setActiveTab("in-stock")}
          >
            In Stock
          </button>
          <button 
            className={`px-4 py-2 text-sm rounded-md ${activeTab === "low-stock" ? "bg-white shadow" : ""}`}
            onClick={() => setActiveTab("low-stock")}
          >
            Low Stock
          </button>
          <button 
            className={`px-4 py-2 text-sm rounded-md ${activeTab === "out-of-stock" ? "bg-white shadow" : ""}`}
            onClick={() => setActiveTab("out-of-stock")}
          >
            Out of Stock
          </button>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-2 border rounded-lg">
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Products Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={product.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button 
                        className="text-indigo-600 hover:text-indigo-900 p-1"
                       
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900 p-1"
                        onClick={() => openDeleteModal(product)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No products found. Try adjusting your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredProducts.length}</span> of <span className="font-medium">{products.length}</span> products
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border rounded text-sm bg-white" disabled>
              Previous
            </button>
            <button className="px-3 py-1 border rounded text-sm bg-white" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
      
          
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
        footer={
          <>
            <button 
              className="px-4 py-2 border rounded-md text-sm"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button 
              className="px-4 py-2 bg-red-600 text-white rounded-md text-sm"
              onClick={handleDeleteProduct}
            >
              Delete
            </button>
          </>
        }
      >
        {currentProduct && (
          <div>
            <p className="mb-2">Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="font-medium">{currentProduct.name}</p>
              <p className="text-sm text-gray-500">SKU: {currentProduct.sku}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default InventoryManagement;