import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <>
            <Head title="About VanishTXT" />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0a0218] to-[#1b0c3b] px-6 text-white"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                    className="w-full max-w-2xl rounded-xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-lg"
                >
                    {/* ✅ Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="mb-4 bg-gradient-to-r from-[#ff4ecb] to-[#ff7f50] bg-clip-text text-center text-4xl font-extrabold text-transparent"
                    >
                        About VanishTXT
                    </motion.h1>

                    {/* ✅ Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                        className="text-lg leading-relaxed text-gray-300"
                    >
                        VanishTXT is a secure messaging platform that lets you send self-destructing messages. Your messages are encrypted and
                        disappear forever after being read. No logs, no tracking – just **true privacy**.
                    </motion.p>

                    {/* ✅ Features Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
                        className="mt-6 space-y-4"
                    >
                        <FeatureItem
                            title="🔐 End-to-End Encryption"
                            text="Your messages are encrypted and unreadable by anyone but the recipient."
                        />
                        <FeatureItem title="🔥 Self-Destructing Messages" text="Once viewed, your message is permanently deleted." />
                        <FeatureItem title="🚀 Fast & Secure" text="No accounts required. Just send and forget." />
                    </motion.div>

                    {/* ✅ CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.7 }}
                        className="mt-8 flex justify-center"
                    >
                        <Link
                            href="/create"
                            className="rounded-full bg-pink-500 px-8 py-3 text-lg text-white shadow-lg transition-all hover:bg-pink-600"
                        >
                            Start Sending
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </>
    );
}

/* ✅ Feature Item Component */
function FeatureItem({ title, text }: { title: string; text: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
            className="flex items-start gap-3"
        >
            <span className="text-xl font-semibold text-[#ff4ecb]">{title}</span>
            <p className="text-gray-300">{text}</p>
        </motion.div>
    );
}
