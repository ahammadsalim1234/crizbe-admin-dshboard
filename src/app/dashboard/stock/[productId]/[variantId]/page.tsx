'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Plus, History, Boxes } from 'lucide-react';
import VariantStockAddModal from '@/components/Modals/VariantStockAddModal';

// Mock data
const productData = {
    '1': { name: 'Smartphone', productId: '#A7F3D67' },
    '2': { name: 'Laptop', productId: '#B6E4F24' },
} as any;

const variantData = {
    v1: { size: '128GB', quantity: 50, price: '699.99' },
    v2: { size: '256GB', quantity: 70, price: '799.99' },
} as any;

const stockHistory = [
    {
        id: 'h1',
        quantity: 20,
        type: 'Addition',
        price: '699.99',
        date: '2024-03-20 10:30 AM',
        notes: 'Initial stock',
    },
    {
        id: 'h2',
        quantity: 30,
        type: 'Addition',
        price: '689.99',
        date: '2024-03-21 02:15 PM',
        notes: 'New Batch',
    },
];

export default function VariantStockDetailPage() {
    const params = useParams();
    const router = useRouter();
    const productId = params.productId as string;
    const variantId = params.variantId as string;

    const product = productData[productId] || { name: 'Unknown Product', productId: '#0000' };
    const variant = variantData[variantId] || { size: 'Standard', quantity: 0, price: '0.00' };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [history, setHistory] = useState(stockHistory);
    const [currentQty, setCurrentQty] = useState(variant.quantity);

    const handleAddStock = (data: any) => {
        const newEntry = {
            id: Date.now().toString(),
            quantity: data.quantity,
            type: 'Addition',
            price: data.price,
            date: new Date().toLocaleString(),
            notes: data.notes || 'Manual entry',
        };
        setHistory([newEntry, ...history]);
        setCurrentQty((prev: number) => prev + data.quantity);
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
                        <h1 className="text-2xl font-bold text-gray-100">
                            {product.name} - {variant.size}
                        </h1>
                        <p className="text-gray-400">Detailed stock history for this variant</p>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#2a2a2a]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm mb-1">Current Stock</p>
                            <p className="text-3xl font-bold text-gray-100">{currentQty}</p>
                        </div>
                        <div className="text-purple-400 bg-purple-500 bg-opacity-10 p-3 rounded-lg">
                            <Boxes className="w-6 h-6" />
                        </div>
                    </div>
                </div>
                {/* Could add more stats here */}
            </div>

            <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
                <div className="p-4 border-b border-[#2a2a2a] flex items-center space-x-2">
                    <History className="w-4 h-4 text-blue-400" />
                    <h2 className="font-semibold text-gray-100">Variation Stock History</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#2a2a2a]">
                                <th className="text-left p-4 text-gray-400 font-medium text-sm">
                                    QUANTITY
                                </th>
                                <th className="text-left p-4 text-gray-400 font-medium text-sm">
                                    PRICE
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
                                    className="border-b border-[#2a2a2a] hover:bg-[#2a2a2a] transition-colors"
                                >
                                    <td className="p-4 text-gray-100 font-medium">
                                        +{item.quantity}
                                    </td>
                                    <td className="p-4 text-purple-400">
                                        ${parseFloat(item.price).toFixed(2)}
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-0.5 rounded-full bg-blue-500 bg-opacity-10 text-blue-400 text-xs">
                                            {item.type}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-400 text-sm">{item.date}</td>
                                    <td className="p-4 text-gray-400 text-sm">{item.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <VariantStockAddModal
                isModalOpen={isModalOpen}
                handleCloseModal={() => setIsModalOpen(false)}
                handleSubmit={handleAddStock}
                variants={[{ id: variantId, size: variant.size }]}
                productName={product.name}
            />
        </div>
    );
}
