'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Plus, History, Layers, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import VariantStockAddModal from '@/components/Modals/VariantStockAddModal';

// Mock data
const productData = {
    '1': { name: 'Smartphone', productId: '#A7F3D67', totalStock: 120 },
    '2': { name: 'Laptop', productId: '#B6E4F24', totalStock: 15 },
} as any;

const variantData = [
    { id: 'v1', size: '128GB', quantity: 50, price: '699.99' },
    { id: 'v2', size: '256GB', quantity: 70, price: '799.99' },
];

const stockHistory = [
    {
        id: 'h1',
        variant: '128GB',
        quantity: 50,
        type: 'Addition',
        date: '2024-03-20 10:30 AM',
        notes: 'Initial stock',
    },
    {
        id: 'h2',
        variant: '256GB',
        quantity: 30,
        type: 'Addition',
        date: '2024-03-21 02:15 PM',
        notes: 'Restock',
    },
    {
        id: 'h3',
        variant: '256GB',
        quantity: 40,
        type: 'Addition',
        date: '2024-03-22 11:00 AM',
        notes: 'New delivery',
    },
];

export default function ProductStockPage() {
    const params = useParams();
    const router = useRouter();
    const productId = params.productId as string;
    const product = productData[productId] || {
        name: 'Unknown Product',
        productId: '#0000',
        totalStock: 0,
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [history, setHistory] = useState(stockHistory);
    const [variants, setVariants] = useState(variantData);

    const handleAddVariantStock = (data: any) => {
        const variant = variants.find((v) => v.id === data.variantId);
        const newEntry = {
            id: Date.now().toString(),
            variant: variant?.size || 'Unknown',
            quantity: data.quantity,
            type: 'Addition',
            date: new Date().toLocaleString(),
            notes: data.notes || 'Manual entry',
        };
        setHistory([newEntry, ...history]);

        setVariants(
            variants.map((v) =>
                v.id === data.variantId
                    ? { ...v, quantity: v.quantity + data.quantity, price: data.price }
                    : v
            )
        );

        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-100">{product.name}</h1>
                        <p className="text-gray-400">
                            Manage stock and variants for {product.productId}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Variant Stock</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Variants List */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] overflow-hidden">
                        <div className="p-4 border-b border-[#2a2a2a] flex items-center space-x-2">
                            <Layers className="w-4 h-4 text-purple-400" />
                            <h2 className="font-semibold text-gray-100">Product Variants</h2>
                        </div>
                        <div className="divide-y divide-[#2a2a2a]">
                            {variants.map((v) => (
                                <Link
                                    key={v.id}
                                    href={`/dashboard/stock/${productId}/${v.id}`}
                                    className="p-4 flex items-center justify-between hover:bg-[#2a2a2a] transition-colors group"
                                >
                                    <div>
                                        <p className="text-gray-100 font-medium">{v.size}</p>
                                        <p className="text-sm text-gray-400">
                                            ${parseFloat(v.price).toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-sm font-semibold text-purple-400">
                                            {v.quantity} in stock
                                        </span>
                                        <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stock History */}
                <div className="lg:col-span-2">
                    <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
                        <div className="p-4 border-b border-[#2a2a2a] flex items-center space-x-2">
                            <History className="w-4 h-4 text-blue-400" />
                            <h2 className="font-semibold text-gray-100">Stock History</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-[#2a2a2a]">
                                        <th className="text-left p-4 text-gray-400 font-medium text-sm">
                                            VARIANT
                                        </th>
                                        <th className="text-left p-4 text-gray-400 font-medium text-sm">
                                            QUANTITY
                                        </th>
                                        <th className="text-left p-4 text-gray-400 font-medium text-sm">
                                            TYPE
                                        </th>
                                        <th className="text-left p-4 text-gray-400 font-medium text-sm">
                                            DATE
                                        </th>
                                        <th className="text-left p-4 text-gray-400 font-medium text-sm">
                                            NOTES
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-b border-[#2a2a2a] hover:bg-[#2a2a2a] transition-colors text-sm"
                                        >
                                            <td className="p-4 text-gray-100">{item.variant}</td>
                                            <td className="p-4 text-gray-300">+{item.quantity}</td>
                                            <td className="p-4">
                                                <span className="px-2 py-0.5 rounded-full bg-blue-500 bg-opacity-10 text-blue-400 text-xs">
                                                    {item.type}
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-400">{item.date}</td>
                                            <td className="p-4 text-gray-400 max-w-xs truncate">
                                                {item.notes}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <VariantStockAddModal
                isModalOpen={isModalOpen}
                handleCloseModal={() => setIsModalOpen(false)}
                handleSubmit={handleAddVariantStock}
                variants={variants}
                productName={product.name}
            />
        </div>
    );
}
