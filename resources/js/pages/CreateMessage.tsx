import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FormEvent } from 'react';

export default function CreateMessage() {
    const { data, setData, post, processing } = useForm({
        message: '',
        sender: '',
        receiver: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!data.message.trim()) return;
        post('/store', { data });
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
                </motion.div>
            </motion.div>
        </>
    );
}
