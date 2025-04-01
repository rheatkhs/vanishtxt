import { Head, router, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Clipboard, Eye, RefreshCcw } from 'lucide-react';
import { FormEvent, useState } from 'react';

interface CreateMessageProps {
    generatedLink?: string;
}

export default function CreateMessage({ generatedLink }: CreateMessageProps) {
    const { data, setData, post, processing, reset } = useForm({
        message: '',
        sender: '',
        receiver: '',
    });
    const [copied, setCopied] = useState(false);
    const [resetting, setResetting] = useState(false);
    const [showLink, setShowLink] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!data.message.trim()) return;
        post('/store', { data });
    };

    const handleCopy = () => {
        if (generatedLink) {
            navigator.clipboard.writeText(generatedLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleReset = () => {
        setResetting(true);
        setTimeout(() => {
            reset();
            setResetting(false);
            router.visit('/create');
        }, 500);
    };

    return (
        <>
            <Head title="Create Message" />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#090214] via-[#1b0c3b] to-[#2e104f] px-6 text-white"
            >
                {/* ✅ Page Title */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="mt-24 bg-gradient-to-r from-[#ff4ecb] to-[#ff7f50] bg-clip-text text-center text-5xl font-extrabold text-transparent sm:text-6xl"
                >
                    Create a Secret Message
                </motion.h1>

                {/* ✅ Form Container with Smooth Entrance */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                    className="mt-8 w-full max-w-lg rounded-xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-lg"
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* ✅ Sender Input */}
                        <motion.input
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
                            className="w-full rounded-lg border border-[#ff4ecb] bg-transparent p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#ff4ecb]"
                            placeholder="Your Name (optional)"
                            value={data.sender}
                            onChange={(e) => setData('sender', e.target.value)}
                        />

                        {/* ✅ Receiver Input */}
                        <motion.input
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
                            className="w-full rounded-lg border border-[#ff4ecb] bg-transparent p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#ff4ecb]"
                            placeholder="Receiver's Name (optional)"
                            value={data.receiver}
                            onChange={(e) => setData('receiver', e.target.value)}
                        />

                        {/* ✅ Message Input */}
                        <motion.textarea
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
                            className="w-full rounded-lg border border-[#ff4ecb] bg-transparent p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#ff4ecb]"
                            placeholder="Type your secret message..."
                            rows={4}
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                        ></motion.textarea>

                        {/* ✅ Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={processing || !data.message.trim()}
                            className="w-full rounded-lg bg-gradient-to-r from-[#ff4ecb] to-[#ff7f50] px-8 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 disabled:opacity-50"
                            whileTap={{ scale: 0.97 }}
                        >
                            {processing ? 'Encrypting...' : 'Create Message'}
                        </motion.button>
                    </form>

                    {/* ✅ Secret Link Section */}
                    {generatedLink && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
                            className="mt-6 rounded-xl border border-white/20 bg-white/10 p-6 text-center shadow-xl backdrop-blur-lg"
                        >
                            {/* ✅ Message Created Text */}
                            <motion.h2
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                                className="text-lg font-semibold text-[#ff4ecb]"
                            >
                                🎉 Your secret message has been created!
                            </motion.h2>

                            {/* ✅ Show Link Button with Animation */}
                            {!showLink ? (
                                <motion.button
                                    onClick={() => setShowLink(true)}
                                    className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#ff4ecb] px-6 py-2 font-semibold text-white shadow-md transition hover:scale-105"
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <Eye size={20} />
                                    Show Link
                                </motion.button>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, ease: 'easeOut' }}
                                    className="mt-3 rounded-lg border border-[#ff4ecb] bg-black/30 p-3 text-white"
                                >
                                    <p className="text-sm text-gray-300">Here is your secure link:</p>
                                    <textarea
                                        readOnly
                                        className="mt-2 w-full rounded-lg border border-[#ff4ecb] bg-transparent p-2 text-sm text-[#ff4ecb] focus:ring-2 focus:ring-[#ff4ecb]"
                                        value={generatedLink}
                                    />
                                </motion.div>
                            )}

                            {/* ✅ Action Buttons (Only when "Show Link" is clicked) */}
                            {showLink && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                    className="mt-4 flex flex-col justify-center gap-3 sm:flex-row"
                                >
                                    {/* Copy Button */}
                                    <motion.button
                                        onClick={handleCopy}
                                        className="flex items-center gap-2 rounded-lg bg-[#ff4ecb] px-6 py-2 font-semibold text-white shadow-md transition hover:scale-105"
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        <Clipboard size={20} />
                                        {copied ? 'Copied!' : 'Copy'}
                                    </motion.button>

                                    {/* Reset Button */}
                                    <motion.button
                                        onClick={handleReset}
                                        className="flex items-center justify-center rounded-lg border border-gray-400 px-6 py-2 font-semibold text-white transition-all hover:border-pink-400"
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        <RefreshCcw size={20} className={resetting ? 'animate-spin' : ''} />
                                        Reset
                                    </motion.button>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </>
    );
}
