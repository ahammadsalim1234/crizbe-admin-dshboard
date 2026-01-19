'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle forgot password logic here
        console.log('Forgot Password:', { email });
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4">
                <div className="w-full max-w-md">
                    <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-8 shadow-2xl text-center">
                        <div className="mb-6 flex justify-center">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-10 h-10 text-green-500" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-100 mb-3">Check Your Email</h1>
                        <p className="text-gray-400 text-sm mb-6">
                            We've sent a password reset link to <span className="text-gray-300 font-medium">{email}</span>
                        </p>
                        <p className="text-gray-500 text-xs mb-6">
                            Please check your inbox and click on the link to reset your password. If you don't see the email, check your spam folder.
                        </p>
                        <div className="space-y-3">
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors"
                            >
                                Resend Email
                            </button>
                            <Link
                                href="/login"
                                className="block text-center text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                            >
                                Back to Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4">
            <div className="w-full max-w-md">
                <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-100 mb-2">Forgot Password?</h1>
                        <p className="text-gray-400 text-sm">
                            No worries, we'll send you reset instructions.
                        </p>
                    </div>

                    {/* Forgot Password Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-[#2a2a2a] text-gray-100 pl-10 pr-4 py-3 rounded-lg border border-[#3a3a3a] focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors"
                        >
                            Reset Password
                        </button>
                    </form>

                    {/* Back to Login Link */}
                    <div className="mt-6 text-center">
                        <Link
                            href="/login"
                            className="inline-flex items-center text-sm text-gray-400 hover:text-purple-400 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

