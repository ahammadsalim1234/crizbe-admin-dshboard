import React from 'react'
import { X, Trash2, Plus } from 'lucide-react';

export interface SizeVariant {
    size: string;
    price: string;
}

interface ProductFormData {
    name: string;
    category: string;
    icon: string;
    images: string[];
    price: string;
    stock: string;
    description: string;
    ingredients: string;
    variants: SizeVariant[];
}
type Product = {
    id: string;
    name: string;
    productId: string;
    category: string;
    price: string;
    stock: number;
    images?: string[];
    description?: string;
    ingredients?: string;
    variants?: SizeVariant[];
};

interface Props {
    isModalOpen: boolean;
    editingProduct: Product | null;
    handleCloseModal: () => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    formData: ProductFormData;
    setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
    handleImageFilesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleImageUrlAdd: (url: string) => void;
    handleImageRemove: (index: number) => void;
}

function ProductAddEditModal({ isModalOpen, editingProduct, handleCloseModal, handleSubmit, formData, setFormData, handleImageFilesChange, handleImageUrlAdd, handleImageRemove }: Props) {
    const [selectedSize, setSelectedSize] = React.useState('100gm');

    const availableSizes = ['100gm', '200gm', '400gm'];

    // Get sizes that haven't been added yet
    const addedSizes = formData.variants.map(v => v.size);
    const remainingSizes = availableSizes.filter(size => !addedSizes.includes(size));

    const handleAddVariant = () => {
        // Check if this size already exists
        const existingVariant = formData.variants.find(v => v.size === selectedSize);
        if (existingVariant) {
            return; // Don't add duplicate sizes
        }

        const newVariants = [...formData.variants, { size: selectedSize, price: '' }];
        setFormData({
            ...formData,
            variants: newVariants
        });

        // Auto-select the first remaining size after adding
        const newAddedSizes = newVariants.map(v => v.size);
        const nextAvailableSizes = availableSizes.filter(size => !newAddedSizes.includes(size));
        if (nextAvailableSizes.length > 0) {
            setSelectedSize(nextAvailableSizes[0]);
        }
    };

    const handleVariantPriceChange = (index: number, price: string) => {
        const updatedVariants = [...formData.variants];
        updatedVariants[index].price = price;
        setFormData({ ...formData, variants: updatedVariants });
    };

    const handleRemoveVariant = (index: number) => {
        const removedSize = formData.variants[index].size;
        const newVariants = formData.variants.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            variants: newVariants
        });

        // Auto-select the removed size in dropdown if it's available
        if (availableSizes.includes(removedSize)) {
            setSelectedSize(removedSize);
        }
    };

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
                                        Product Images
                                    </label>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">
                                                Upload Image Files (Multiple)
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={handleImageFilesChange}
                                                className="w-full bg-[#2a2a2a] text-gray-100 px-4 py-2 rounded-lg border border-[#3a3a3a] focus:outline-none focus:border-purple-500 file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                                            />
                                        </div>
                                        {formData.images && formData.images.length > 0 && (
                                            <div className="mt-3">
                                                <p className="text-xs text-gray-400 mb-2">Images ({formData.images.length}):</p>
                                                <div className="grid grid-cols-4 gap-2">
                                                    {formData.images.map((image, index) => (
                                                        <div key={index} className="relative group">
                                                            <img
                                                                src={image}
                                                                alt={`Preview ${index + 1}`}
                                                                className="w-full h-20 object-cover rounded-lg border border-[#3a3a3a]"
                                                                onError={(e) => {
                                                                    e.currentTarget.style.display = 'none';
                                                                }}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => handleImageRemove(index)}
                                                                className="absolute top-1 right-1 p-1 bg-red-600 hover:bg-red-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <Trash2 className="w-3 h-3 text-white" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
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
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description || ''}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-[#2a2a2a] text-gray-100 px-4 py-2 rounded-lg border border-[#3a3a3a] focus:outline-none focus:border-purple-500"
                                        placeholder="Enter product description"
                                        rows={4}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Ingredients
                                    </label>
                                    <textarea
                                        value={formData.ingredients || ''}
                                        onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                                        className="w-full bg-[#2a2a2a] text-gray-100 px-4 py-2 rounded-lg border border-[#3a3a3a] focus:outline-none focus:border-purple-500"
                                        placeholder="Enter product ingredients"
                                        rows={4}
                                    />
                                </div>

                                {/* Size Variants Section */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Size Variants (gm) - Add Multiple Sizes with Prices
                                    </label>
                                    <div className="space-y-3">
                                        {remainingSizes.length > 0 ? (
                                            <div className="flex space-x-2">
                                                <select
                                                    value={selectedSize}
                                                    onChange={(e) => setSelectedSize(e.target.value)}
                                                    className="flex-1 bg-[#2a2a2a] text-gray-100 px-4 py-2 rounded-lg border border-[#3a3a3a] focus:outline-none focus:border-purple-500"
                                                >
                                                    {remainingSizes.map((size) => (
                                                        <option key={size} value={size}>
                                                            {size}
                                                        </option>
                                                    ))}
                                                </select>
                                                <button
                                                    type="button"
                                                    onClick={handleAddVariant}
                                                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                    <span>Add Variant</span>
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="bg-[#2a2a2a] px-4 py-3 rounded-lg border border-[#3a3a3a] text-sm text-gray-400">
                                                All size variants (100gm, 200gm, 400gm) have been added.
                                            </div>
                                        )}

                                        {formData.variants.length > 0 && (
                                            <div className="space-y-2">
                                                <p className="text-xs text-gray-400 mb-2 font-medium">
                                                    Added Variants ({formData.variants.length}):
                                                </p>
                                                {formData.variants.map((variant, index) => (
                                                    <div key={index} className="flex items-center space-x-2 bg-[#2a2a2a] p-3 rounded-lg border border-[#3a3a3a]">
                                                        <div className="flex-1 grid grid-cols-2 gap-3">
                                                            <div>
                                                                <label className="block text-xs text-gray-400 mb-1">
                                                                    Size
                                                                </label>
                                                                <div className="bg-[#1a1a1a] text-gray-100 px-3 py-2 rounded border border-[#3a3a3a] font-medium">
                                                                    {variant.size}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs text-gray-400 mb-1">
                                                                    Price ($) <span className="text-red-400">*</span>
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    required
                                                                    step="0.01"
                                                                    min="0"
                                                                    value={variant.price}
                                                                    onChange={(e) => handleVariantPriceChange(index, e.target.value)}
                                                                    className="w-full bg-[#1a1a1a] text-gray-100 px-3 py-2 rounded border border-[#3a3a3a] focus:outline-none focus:border-purple-500"
                                                                    placeholder="0.00"
                                                                />
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveVariant(index)}
                                                            className="p-2 bg-red-600 bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors shrink-0"
                                                            title="Remove variant"
                                                        >
                                                            <Trash2 className="w-4 h-4 text-red-400" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
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