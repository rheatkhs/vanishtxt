import Navbar from '@/pages/components/Navbar';
import { Head } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Headphones, HelpCircle, Mail, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function Support() {
    return (
        <>
            <Head title="Support" />
            <Navbar />

            {/* ✅ Page Wrapper */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#090214] via-[#1b0c3b] to-[#2e104f] px-6 pt-24 pb-32 text-white sm:pt-28 sm:pb-40 md:pt-32 md:pb-32 lg:pt-40 lg:pb-40"
            >
                {/* ✅ Title */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="bg-gradient-to-r from-[#ff4ecb] to-[#ff7f50] bg-clip-text text-center text-4xl font-extrabold text-transparent sm:text-5xl"
                >
                    Need Help? We're Here for You.
                </motion.h1>

                {/* ✅ Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                    className="mt-4 max-w-2xl text-center text-lg text-gray-300"
                >
                    Have questions about VanishTXT? Find answers below or reach out to our support team.
                </motion.p>

                {/* ✅ Support Options */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
                    className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2"
                >
                    <SupportCard icon={<Mail size={40} className="text-pink-400" />} title="Email Support" text="Reach us at support@vanishtxt.com" />
                    <SupportCard
                        icon={<MessageCircle size={40} className="text-pink-400" />}
                        title="Live Chat"
                        text="Chat with a support agent in real-time."
                    />
                    <SupportCard icon={<HelpCircle size={40} className="text-pink-400" />} title="FAQ" text="Find answers to common questions." />
                    <SupportCard
                        icon={<Headphones size={40} className="text-pink-400" />}
                        title="Community Forum"
                        text="Join the discussion with other users."
                    />
                </motion.div>

                {/* ✅ FAQ Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
                    className="mt-16 w-full max-w-3xl"
                >
                    <h2 className="text-center text-2xl font-semibold text-pink-400">Frequently Asked Questions</h2>
                    <FAQItem
                        question="How do I send a secure message?"
                        answer="Simply create a message on VanishTXT, set the self-destruct timer, and share the link with your recipient!"
                    />
                    <FAQItem
                        question="Is VanishTXT really private?"
                        answer="Yes! All messages are encrypted end-to-end and disappear after being read."
                    />
                    <FAQItem question="Do I need an account?" answer="Nope! You can use VanishTXT without signing up—just send and forget!" />
                </motion.div>
            </motion.div>
        </>
    );
}

/* ✅ Support Card Component */
function SupportCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center rounded-xl bg-white/10 p-6 shadow-lg backdrop-blur-lg transition-all duration-300 hover:bg-white/20"
        >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 p-3">{icon}</div>
            <h4 className="text-md mt-4 font-semibold text-white">{title}</h4>
            <p className="mt-2 text-center text-gray-300">{text}</p>
        </motion.div>
    );
}

/* ✅ FAQ Item Component with Animated Dropdown */
function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            className="mt-4 cursor-pointer rounded-lg bg-white/10 p-4 text-white transition-all hover:bg-white/20"
            whileHover={{ scale: 1.02 }}
            onClick={() => setIsOpen(!isOpen)}
        >
            {/* ✅ Question Row */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{question}</h3>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={20} />
                </motion.div>
            </div>

            {/* ✅ Animated Answer Section */}
            <AnimatePresence>
                {isOpen && (
                    <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="mt-2 text-gray-300"
                    >
                        {answer}
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
