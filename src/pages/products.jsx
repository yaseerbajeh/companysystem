import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';


const initialProducts = [
  {
    id: 1,
    name: 'Project Widget',
    description: 'Core component for project X',
    category: 'Hardware',
    stock: 50,
    price: 29.99,
  },
  {
    id: 2,
    name: 'Software License',
    description: 'Annual subscription for tool Y',
    category: 'Software',
    stock: 100,
    price: 99.99,
  },
  {
    id: 3,
    name: 'Gizmo Pro',
    description: 'Advanced gadget for project Z',
    category: 'Hardware',
    stock: 20,
    price: 149.99,
  },
];

const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: '',
    stock: '',
    price: '',
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      id: products.length + 1,
      name: newProduct.name,
      description: newProduct.description,
      category: newProduct.category,
      stock: parseInt(newProduct.stock),
      price: parseFloat(newProduct.price),
    };
    setProducts([...products, product]);
    setNewProduct({ name: '', description: '', category: '', stock: '', price: '' });
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="min-h-screen p-4 lg:ml-64 bg-gray-100 dark:bg-gray-900 font-quickSand">
      <div className="max-w-4xl mx-auto">
        {/* Add Product Form */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Add New Product</h1>
          <form onSubmit={handleAddProduct} className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="Product name"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  rows="4"
                  placeholder="Describe the product..."
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="stock" className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="Stock quantity"
                  min="0"
                  required
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="Price (USD)"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 flex items-center px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700"
            >
              <FaPlus className="mr-2" />
              Add Product
            </button>
          </form>
        </div>

        {/* Product List */}
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Products</h1>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          {products.length === 0 ? (
            <p className="p-4 text-gray-600 dark:text-gray-400">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="p-4 border border-gray-200 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <p className="text-gray-800 dark:text-gray-200 font-semibold">{product.name}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{product.description}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Category: {product.category}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Stock: {product.stock}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Price: ${product.price.toFixed(2)}</p>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="mt-2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                  >
                    <FaTrash className="inline mr-2" />
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;