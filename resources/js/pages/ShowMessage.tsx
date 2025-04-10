import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Clipboard } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ShowMessageProps {
    message: string;
    sender: string;
    receiver: string;
}

export default function ShowMessage({ message, sender, receiver }: ShowMessageProps) {
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
                    {/* ✅ Sender & Receiver Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
                        className="mb-4 text-center text-sm text-gray-300"
                    >
                        <p>
                            <span className="font-semibold text-[#ff4ecb]">From:</span> {sender || 'Anonymous'}
                        </p>
                        <p>
                            <span className="font-semibold text-[#ff7f50]">To:</span> {receiver || 'Anonymous'}
                        </p>
                    </motion.div>
                    {/* ✅ Secret Message Box */}
                    <motion.textarea
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
                        className="h-40 w-full resize-none overflow-hidden rounded-lg border border-[#ff4ecb] bg-transparent p-3 text-white transition duration-300 focus:border-white focus:outline-none"
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
                </motion.div>
            </motion.div>
        </>
    );
}
