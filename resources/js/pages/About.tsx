import Navbar from '@/pages/components/Navbar';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Lock, MessageSquareOff, UserX } from 'lucide-react'; // ✅ Import Lucide Icons

export default function About() {
    return (
        <>
            <Head title="About" />
            <Navbar />

            {/* ✅ Modern Full-Page Layout */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#090214] via-[#1b0c3b] to-[#2e104f] px-6 pt-24 pb-32 sm:pt-28 sm:pb-40 md:pt-32 md:pb-32 lg:pt-40 lg:pb-40"
            >
                {/* ✅ Title Section */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="bg-gradient-to-r from-[#ff4ecb] to-[#ff7f50] bg-clip-text text-center text-4xl leading-tight font-extrabold text-transparent sm:text-5xl md:text-6xl"
                >
                    The Future of Secure Messaging
                </motion.h1>

                {/* ✅ Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                    className="mt-4 max-w-xl text-center text-base text-gray-300 sm:text-lg md:max-w-3xl md:text-xl"
                >
                    VanishTXT allows you to send **self-destructing** messages with **end-to-end encryption**. No tracking. No logs. Just pure
                    privacy.
                </motion.p>

                {/* ✅ Features Section (Now With Lucide Icons) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
                    className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-0 lg:grid-cols-3"
                >
                    <FeatureCard
                        icon={<Lock size={40} className="text-pink-400" />}
                        title="End-to-End Encryption"
                        text="Only the recipient can read your messages."
                    />
                    <FeatureCard
                        icon={<MessageSquareOff size={40} className="text-pink-400" />}
                        title="Self-Destructing Messages"
                        text="Your messages disappear forever after being read."
                    />
                    <FeatureCard
                        icon={<UserX size={40} className="text-pink-400" />}
                        title="No Accounts Needed"
                        text="Just send a message & forget. Simple & secure."
                    />
                </motion.div>
            </motion.div>
        </>
    );
}

/* ✅ Feature Card Component */
function FeatureCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center rounded-xl bg-white/10 p-8 shadow-lg backdrop-blur-lg transition-all duration-300 hover:bg-white/20"
        >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 p-3">{icon}</div>
            <h4 className="text-md mt-4 font-semibold text-white">{title}</h4>
            <p className="mt-2 text-center text-gray-300">{text}</p>
        </motion.div>
    );
}
