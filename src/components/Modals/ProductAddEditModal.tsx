import React from 'react'
import { X } from 'lucide-react';

interface ProductFormData {
    name: string;
    category: string;
    icon: string;
    image: string;
    price: string;
    stock: string;
    sales: string;
}
type Product = {
    id: string;
    name: string;
    productId: string;
    category: string;
    price: string;
    stock: number;
    sales: number;
    image?: string;
};

interface Props {
    isModalOpen: boolean;
    editingProduct: Product | null;
    handleCloseModal: () => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    formData: ProductFormData;
    setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
    handleImageFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setImagePreview: React.Dispatch<React.SetStateAction<string>>;
    setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
    imagePreview: string;
}

function ProductAddEditModal({ isModalOpen, editingProduct, handleCloseModal, handleSubmit, formData, setFormData, handleImageFileChange, setImageFile, setImagePreview, imagePreview }: Props) {
    console.log(editingProduct, "editingProducteditingProduct")
    return (
        <>
            {
                isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-[#2a2a2a] flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-100">
                                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                                </h2>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Product Image
                                    </label>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">
                                                Upload Image File
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageFileChange}
                                                className="w-full bg-[#2a2a2a] text-gray-100 px-4 py-2 rounded-lg border border-[#3a3a3a] focus:outline-none focus:border-purple-500 file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                                            />
                                        </div>
                                        <div className="relative">
                                            <span className="absolute inset-0 flex items-center">
                                                <span className="w-full border-t border-[#3a3a3a]"></span>
                                            </span>
                                            <div className="relative flex justify-center text-xs">
                                                <span className="bg-[#1a1a1a] px-2 text-gray-400">OR</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">
                                                Enter Image URL
                                            </label>
                                            <input
                                                type="url"
                                                value={formData.image}
                                                onChange={(e) => {
                                                    setFormData({ ...formData, image: e.target.value });
                                                    setImagePreview(e.target.value);
                                                    setImageFile(null);
                                                }}
                                                className="w-full bg-[#2a2a2a] text-gray-100 px-4 py-2 rounded-lg border border-[#3a3a3a] focus:outline-none focus:border-purple-500"
                                                placeholder="https://example.com/image.jpg"
                                            />
                                        </div>
                                        {imagePreview && (
                                            <div className="mt-2">
                                                <p className="text-xs text-gray-400 mb-1">Image Preview:</p>
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="w-20 h-20 object-cover rounded-lg border border-[#3a3a3a]"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2 ">
                                            Product Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-[#2a2a2a] text-gray-100 px-4 py-2 rounded-lg border border-[#3a3a3a] focus:outline-none focus:border-purple-500"
                                            placeholder="Enter product name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Category
                                        </label>
                                        <select
                                            required
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full  bg-[#2a2a2a] text-gray-100 px-4 py-2 rounded-lg border border-[#3a3a3a] focus:outline-none focus:border-purple-500"
                                        >
                                            <option value="Electronics">Electronics</option>
                                            <option value="Home">Home</option>
                                            <option value="Sports">Sports</option>
                                            <option value="Fashion">Fashion</option>
                                            <option value="Books">Books</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Price ($)
                                        </label>
                                        <input
                                            type="number"
                                            required
                                            step="0.01"
                                            min="0"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            className="w-full bg-[#2a2a2a] text-gray-100 px-4 py-2 rounded-lg border border-[#3a3a3a] focus:outline-none focus:border-purple-500"
                                            placeholder="0.00"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Stock
                                        </label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            value={formData.stock}
                                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                            className="w-full bg-[#2a2a2a] text-gray-100 px-4 py-2 rounded-lg border border-[#3a3a3a] focus:outline-none focus:border-purple-500"
                                            placeholder="0"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Sales
                                        </label>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            value={formData.sales}
                                            onChange={(e) => setFormData({ ...formData, sales: e.target.value })}
                                            className="w-full bg-[#2a2a2a] text-gray-100 px-4 py-2 rounded-lg border border-[#3a3a3a] focus:outline-none focus:border-purple-500"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="px-4 py-2 bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a] rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                                    >
                                        {editingProduct ? 'Update Product' : 'Add Product'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

        </>
    )
}

export default ProductAddEditModal