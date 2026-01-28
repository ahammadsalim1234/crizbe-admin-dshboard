'use client';

import { useState } from 'react';
import { Package, Box, Search, Plus, Eye, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Link from 'next/link';
import StockAddModal from '@/components/Modals/StockAddModal';

interface Product {
    id: string;
    name: string;
    productId: string;
    category: string;
    totalStock: number;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const initialProducts: Product[] = [
    {
        id: '1',
        name: 'Smartphone',
        productId: '#A7F3D67',
        category: 'Electronics',
        totalStock: 120,
        status: 'In Stock',
    },
    {
        id: '2',
        name: 'Laptop',
        productId: '#B6E4F24',
        category: 'Electronics',
        totalStock: 15,
        status: 'Low Stock',
    },
    {
        id: '3',
        name: 'Mouse',
        productId: '#D4B7C34',
        category: 'Electronics',
        totalStock: 0,
        status: 'Out of Stock',
    },
    {
        id: '4',
        name: 'Keyboard',
        productId: '#F8G9H45',
        category: 'Electronics',
        totalStock: 150,
        status: 'In Stock',
    },
    {
        id: '5',
        name: 'Coffee Table',
        productId: '#C5D2A89',
        category: 'Home',
        totalStock: 341,
        status: 'In Stock',
    },
];

export default function StockPage() {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.productId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const stats = [
        {
            title: 'Total Stock',
            value: products.reduce((sum, p) => sum + p.totalStock, 0).toLocaleString(),
            icon: Box,
            color: 'text-blue-400',
        },
        {
            title: 'Low Stock Items',
            value: products.filter((p) => p.status === 'Low Stock').length.toString(),
            icon: ArrowDownRight,
            color: 'text-orange-400',
        },
        {
            title: 'Out of Stock',
            value: products.filter((p) => p.status === 'Out of Stock').length.toString(),
            icon: ArrowDownRight,
            color: 'text-red-400',
        },
        {
            title: 'Recently Added',
            value: '+450',
            icon: ArrowUpRight,
            color: 'text-green-400',
        },
    ];

    const handleAddStock = (data: any) => {
        // Logic to update local state or call API
        console.log('Adding stock:', data);
        setProducts(
            products.map((p) => {
                if (p.id === data.productId) {
                    const newStock = p.totalStock + data.quantity;
                    return {
                        ...p,
                        totalStock: newStock,
                        status:
                            newStock === 0
                                ? 'Out of Stock'
                                : newStock < 20
                                  ? 'Low Stock'
                                  : 'In Stock',
                    };
                }
                return p;
            })
        );
        setIsAddModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.title}
                            className="bg-[#1a1a1a] rounded-lg p-6 border border-[#2a2a2a]"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-100">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} bg-opacity-10 p-3 rounded-lg`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
                <div className="p-6 border-b border-[#2a2a2a] flex items-center justify-between">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search Products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-[#2a2a2a] text-gray-100 pl-10 pr-4 py-2 rounded-lg border border-[#3a3a3a] focus:outline-none focus:border-purple-500 w-64"
                        />
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Stock</span>
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#2a2a2a]">
                                <th className="text-left p-4 text-gray-400 font-medium text-sm">
                                    PRODUCT ID
                                </th>
                                <th className="text-left p-4 text-gray-400 font-medium text-sm">
                                    NAME
                                </th>
                                <th className="text-left p-4 text-gray-400 font-medium text-sm">
                                    CATEGORY
                                </th>
                                <th className="text-left p-4 text-gray-400 font-medium text-sm">
                                    TOTAL STOCK
                                </th>
                                <th className="text-left p-4 text-gray-400 font-medium text-sm">
                                    STATUS
                                </th>
                                <th className="text-left p-4 text-gray-400 font-medium text-sm">
                                    ACTIONS
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr
                                    key={product.id}
                                    className="border-b border-[#2a2a2a] hover:bg-[#2a2a2a] transition-colors"
                                >
                                    <td className="p-4 text-gray-300 font-medium">
                                        {product.productId}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-[#2a2a2a] rounded overflow-hidden flex items-center justify-center">
                                                <Package className="w-4 h-4 text-gray-500" />
                                            </div>
                                            <span className="text-gray-100">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-300">{product.category}</td>
                                    <td className="p-4 text-gray-300">{product.totalStock}</td>
                                    <td className="p-4">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                product.status === 'In Stock'
                                                    ? 'bg-green-500 bg-opacity-10 text-green-400'
                                                    : product.status === 'Low Stock'
                                                      ? 'bg-orange-500 bg-opacity-10 text-orange-400'
                                                      : 'bg-red-500 bg-opacity-10 text-red-400'
                                            }`}
                                        >
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <Link
                                            href={`/dashboard/stock/${product.id}`}
                                            className="p-2 inline-block bg-purple-500 bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
                                            title="View History"
                                        >
                                            <Eye className="w-4 h-4 text-purple-400" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <StockAddModal
                isModalOpen={isAddModalOpen}
                handleCloseModal={() => setIsAddModalOpen(false)}
                handleSubmit={handleAddStock}
                availableProducts={products.map((p) => ({
                    id: p.id,
                    name: p.name,
                    product_id_code: p.productId,
                }))}
            />
        </div>
    );
}
