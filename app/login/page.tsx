'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, DEMO_USERS } from '@/context/AuthContext';
import { LogIn, User, Lock } from 'lucide-react';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const success = login(username, password);
        if (success) {
            router.push('/');
        } else {
            setError('Invalid username or password');
        }
    };

    const handleDemoLogin = (demoUsername: string, demoPassword: string) => {
        setUsername(demoUsername);
        setPassword(demoPassword);
        const success = login(demoUsername, demoPassword);
        if (success) {
            router.push('/');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1C2127] p-8">
            <div className="w-full max-w-5xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Login Form */}
                    <div className="bg-[#2F343C] border border-[#404854] p-8">
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 bg-[#2D72D2] flex items-center justify-center">
                                    <LogIn className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-semibold text-[#F6F7F9]">TMHNA Digital Momentum</h1>
                                    <p className="text-sm text-[#ABB3BF]">Palantir Foundry PoC</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-[#ABB3BF] mb-2">
                                    Username
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#8F99A8]" />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-[#252A31] border border-[#404854] text-[#F6F7F9] focus:border-[#4C90F0] focus:outline-none"
                                        placeholder="Enter username"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#ABB3BF] mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#8F99A8]" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-[#252A31] border border-[#404854] text-[#F6F7F9] focus:border-[#4C90F0] focus:outline-none"
                                        placeholder="Enter password"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 bg-[#CD4246]/10 border border-[#CD4246]/30 text-[#f55656] text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full py-3 bg-[#2D72D2] hover:bg-[#215DB0] text-white font-medium transition-colors"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>

                    {/* Demo Credentials */}
                    <div className="space-y-4">
                        <div className="bg-[#238551]/10 border border-[#238551]/30 p-4">
                            <h3 className="text-sm font-semibold text-[#72CA9B] mb-2">
                                🎯 Demo Environment - Credentials Provided
                            </h3>
                            <p className="text-xs text-[#ABB3BF]">
                                Click any profile below to auto-login with role-based access
                            </p>
                        </div>

                        {/* Admin Account */}
                        <button
                            onClick={() => handleDemoLogin('admin', 'admin123')}
                            className="w-full bg-[#2F343C] border border-[#404854] hover:border-[#4C90F0] p-4 text-left transition-colors"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#9D3F9D] flex items-center justify-center text-white font-semibold">
                                        A
                                    </div>
                                    <div>
                                        <div className="font-semibold text-[#F6F7F9]">System Administrator</div>
                                        <div className="text-xs text-[#ABB3BF]">admin@tmhna.com</div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#404854]">
                                <div className="text-xs">
                                    <span className="text-[#ABB3BF]">Username:</span>
                                    <span className="text-[#4C90F0] ml-2 font-mono">admin</span>
                                </div>
                                <div className="text-xs">
                                    <span className="text-[#ABB3BF]">Password:</span>
                                    <span className="text-[#4C90F0] ml-2 font-mono">admin123</span>
                                </div>
                            </div>
                            <div className="mt-2 text-xs text-[#ABB3BF]">
                                ✓ Access: <span className="text-[#F6F7F9]">All Pages</span>
                            </div>
                        </button>

                        {/* Michael Reynolds - Service Manager */}
                        <button
                            onClick={() => handleDemoLogin('michael', 'service123')}
                            className="w-full bg-[#2F343C] border border-[#404854] hover:border-[#4C90F0] p-4 text-left transition-colors"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#EB0A1E] flex items-center justify-center text-white font-semibold">
                                        MR
                                    </div>
                                    <div>
                                        <div className="font-semibold text-[#F6F7F9]">Michael Reynolds</div>
                                        <div className="text-xs text-[#ABB3BF]">Regional Service Operations Manager (TMH)</div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#404854]">
                                <div className="text-xs">
                                    <span className="text-[#ABB3BF]">Username:</span>
                                    <span className="text-[#4C90F0] ml-2 font-mono">michael</span>
                                </div>
                                <div className="text-xs">
                                    <span className="text-[#ABB3BF]">Password:</span>
                                    <span className="text-[#4C90F0] ml-2 font-mono">service123</span>
                                </div>
                            </div>
                            <div className="mt-2 text-xs text-[#ABB3BF]">
                                ✓ Access: <span className="text-[#F6F7F9]">Home, Factory Floor, Ontology</span>
                            </div>
                        </button>

                        {/* Sarah Martinez - Financial Analyst */}
                        <button
                            onClick={() => handleDemoLogin('sarah', 'finance123')}
                            className="w-full bg-[#2F343C] border border-[#404854] hover:border-[#4C90F0] p-4 text-left transition-colors"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#00843D] flex items-center justify-center text-white font-semibold">
                                        SM
                                    </div>
                                    <div>
                                        <div className="font-semibold text-[#F6F7F9]">Sarah Martinez</div>
                                        <div className="text-xs text-[#ABB3BF]">Senior Financial Planning & Analysis Lead</div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#404854]">
                                <div className="text-xs">
                                    <span className="text-[#ABB3BF]">Username:</span>
                                    <span className="text-[#4C90F0] ml-2 font-mono">sarah</span>
                                </div>
                                <div className="text-xs">
                                    <span className="text-[#ABB3BF]">Password:</span>
                                    <span className="text-[#4C90F0] ml-2 font-mono">finance123</span>
                                </div>
                            </div>
                            <div className="mt-2 text-xs text-[#ABB3BF]">
                                ✓ Access: <span className="text-[#F6F7F9]">Home, Financial Intelligence, Insights, Data Management</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
