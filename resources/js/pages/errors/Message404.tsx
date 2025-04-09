import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function Message404() {
    return (
        <>
            <Head title="Message Not Found" />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#090214] to-[#1b0c3b] px-6 text-white"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                    className="w-full max-w-md rounded-xl bg-transparent p-6"
                >
                    {/* Lock Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 12 }}
                        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20"
                    >
                        <Lock size={32} className="text-pink-400" />
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="text-center text-3xl font-extrabold text-pink-400"
                    >
                        Message Not Found
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
                        className="mt-4 text-center text-sm text-gray-300"
                    >
                        This message has reached its expiry or was already accessed.
                    </motion.p>

                    {/* Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.7 }}
                        className="mt-8 flex justify-center"
                    >
                        <Link
                            href="/create"
                            className="inline-block rounded-full bg-gradient-to-r from-[#ff4ecb] to-[#ff7f50] px-6 py-3 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105"
                        >
                            Back to Home
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </>
    );
}
