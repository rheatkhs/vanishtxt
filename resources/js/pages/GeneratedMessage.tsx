import { Head, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Clipboard, RefreshCcw } from 'lucide-react';
import { useState } from 'react';

interface GeneratedMessageProps {
    generatedLink: string;
    sender?: string;
    receiver?: string;
}

export default function GeneratedMessage({ generatedLink, sender = 'Anonymous', receiver = 'Anonymous' }: GeneratedMessageProps) {
    const [copied, setCopied] = useState(false);
    const [resetting, setResetting] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleReset = () => {
        setResetting(true);
        setTimeout(() => {
            router.visit('/create');
        }, 500);
    };

    return (
        <>
            <Head title="Message Created" />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#090214] via-[#1b0c3b] to-[#2e104f] px-6 text-white"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                    className="w-full max-w-xl rounded-xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-lg"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="mb-6 bg-gradient-to-r from-[#ff4ecb] to-[#ff7f50] bg-clip-text text-center text-4xl font-bold text-transparent"
                    >
                        🔐 Secret Message Created!
                    </motion.h1>

                    {/* Stylish sender and receiver box */}
                    <div className="mb-6 rounded-md border border-[#ff4ecb] bg-black/20 px-4 py-3 text-center text-sm text-gray-300 shadow-inner">
                        <span className="block">
                            <span className="font-medium text-[#ff4ecb]">{sender}</span> ➡️{' '}
                            <span className="font-medium text-[#ff7f50]">{receiver}</span>
                        </span>
                        <span className="text-xs text-gray-400">Only the recipient can view this once 🔥</span>
                    </div>

                    <div className="rounded-lg border border-[#ff4ecb] bg-black/30 p-4">
                        <p className="mb-2 text-sm text-gray-300">Share this link to reveal the secret message:</p>
                        <textarea
                            readOnly
                            className="w-full rounded-lg border border-[#ff4ecb] bg-transparent p-2 text-sm text-[#ff4ecb] focus:ring-2 focus:ring-[#ff4ecb]"
                            value={generatedLink}
                        />
                    </div>

                    <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                        <motion.button
                            onClick={handleCopy}
                            className="flex items-center gap-2 rounded-lg bg-[#ff4ecb] px-6 py-2 font-semibold text-white shadow-md transition hover:scale-105"
                            whileTap={{ scale: 0.97 }}
                        >
                            <Clipboard size={20} />
                            {copied ? 'Copied!' : 'Copy Link'}
                        </motion.button>

                        <motion.button
                            onClick={handleReset}
                            className="flex items-center justify-center gap-2 rounded-lg border border-gray-400 px-6 py-2 font-semibold text-white transition-all hover:border-pink-400"
                            whileTap={{ scale: 0.97 }}
                        >
                            <RefreshCcw size={20} className={resetting ? 'animate-spin' : ''} />
                            <span>Create New</span>
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
}
