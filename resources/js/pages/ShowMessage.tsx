import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Clipboard } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ShowMessageProps {
    message: string;
}

export default function ShowMessage({ message }: ShowMessageProps) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!message) window.location.href = '/create';
    }, [message]);

    const handleCopy = () => {
        navigator.clipboard.writeText(message);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <Head title="Show Message" />
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
                    className="w-full max-w-lg rounded-xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-lg"
                >
                    {/* ✅ Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="mb-4 bg-gradient-to-r from-[#ff4ecb] to-[#ff7f50] bg-clip-text text-center text-3xl font-bold text-transparent"
                    >
                        Your Secret Message
                    </motion.h1>

                    {/* ✅ Secret Message Box */}
                    <motion.textarea
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
                        className="h-40 w-full rounded-lg border border-[#ff4ecb] bg-transparent p-3 text-white focus:ring-2 focus:ring-[#ff4ecb]"
                        readOnly
                        value={message}
                    ></motion.textarea>

                    {/* ✅ Copy Button */}
                    <motion.button
                        onClick={handleCopy}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#ff4ecb] to-[#ff7f50] px-6 py-3 font-semibold text-white shadow-md transition hover:scale-105"
                        whileTap={{ scale: 0.97 }}
                    >
                        <Clipboard size={20} />
                        {copied ? 'Copied!' : 'Copy Message'}
                    </motion.button>

                    {/* ✅ Message Expiry Notice */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.6 }}
                        className="mt-3 text-center text-sm text-gray-300"
                    >
                        ⚠️ This message has been **deleted** after viewing.
                    </motion.p>
                </motion.div>
            </motion.div>
        </>
    );
}
