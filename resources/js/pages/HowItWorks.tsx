import Navbar from '@/pages/components/Navbar';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Lock, MessageSquareOff, Send, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function HowItWorks() {
    const [hoveredStep, setHoveredStep] = useState<number | null>(null);

    const steps = [
        {
            number: 1,
            icon: <MessageSquareOff size={40} className="text-pink-400" />,
            title: 'Compose a Secure Message',
            description: 'Write your message. It will be encrypted instantly.',
        },
        {
            number: 2,
            icon: <Lock size={40} className="text-blue-400" />,
            title: 'Encrypt & Generate a Secure Link',
            description: 'Your message is locked with end-to-end encryption.',
        },
        {
            number: 3,
            icon: <Send size={40} className="text-green-400" />,
            title: 'Share the Secure Link',
            description: 'Send the link to your recipient. No accounts needed!',
        },
        {
            number: 4,
            icon: <Trash2 size={40} className="text-red-400" />,
            title: 'Message Self-Destructs',
            description: 'Once read, it vanishes forever. No logs, no traces.',
        },
    ];

    return (
        <>
            <Head title="How It Works" />
            <Navbar />

            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="relative flex flex-col items-center justify-center bg-gradient-to-br from-[#090214] via-[#1b0c3b] to-[#2e104f] px-6 pt-24 pb-32 text-white sm:pt-28 sm:pb-40 md:pt-32 md:pb-32 lg:pt-40 lg:pb-40"
            >
                {/* Section Title */}
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="mb-2 bg-gradient-to-r from-[#ff4ecb] to-[#ff7f50] bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl"
                >
                    Send Confidential Messages
                </motion.h2>
                <motion.h3
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    className="mb-8 bg-gradient-to-r from-[#ff4ecb] to-[#ff7f50] bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl"
                >
                    with Perfect Privacy
                </motion.h3>

                {/* Quick Delivery Note */}
                <div className="mb-16 flex items-center">
                    <div className="mr-2 h-3 w-3 animate-pulse rounded-full bg-green-400"></div>
                    <p className="text-green-400">Messages self-destruct after reading</p>
                </div>

                {/* Timeline Bar with Hover Effect */}
                <div className="relative mb-12 w-full max-w-5xl">
                    {/* Background Line */}
                    <div className="absolute top-1/2 right-0 left-0 h-0.5 -translate-y-1/2 bg-white/20"></div>

                    {/* Numbers on Timeline */}
                    <div className="relative flex justify-between">
                        {steps.map((step) => (
                            <motion.div
                                key={step.number}
                                className="flex flex-col items-center"
                                onMouseEnter={() => setHoveredStep(step.number)}
                                onMouseLeave={() => setHoveredStep(null)}
                            >
                                <motion.div
                                    initial={{ scale: 1 }}
                                    animate={{ scale: hoveredStep === step.number ? 1.4 : 1 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    className={`z-10 flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold text-white shadow-lg transition-all ${
                                        step.number === 1
                                            ? 'bg-pink-400'
                                            : step.number === 2
                                              ? 'bg-blue-400'
                                              : step.number === 3
                                                ? 'bg-green-400'
                                                : 'bg-red-400'
                                    }`}
                                >
                                    {step.number}
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Steps Grid */}
                <div className="grid w-full max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{
                                scale: 1.08,
                                boxShadow: `0px 0px 15px ${
                                    step.number === 1 ? '#ff4ecb' : step.number === 2 ? '#4a90e2' : step.number === 3 ? '#28a745' : '#ff3b3b'
                                }`,
                            }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="flex flex-col items-center rounded-lg bg-white/10 p-6 text-center shadow-lg transition-all"
                        >
                            {/* Step Icon */}
                            <div
                                className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 p-3 transition-all duration-300 ${
                                    hoveredStep === step.number ? 'scale-110 shadow-lg' : ''
                                }`}
                            >
                                {step.icon}
                            </div>

                            {/* Step Title */}
                            <h4 className="mb-2 text-lg font-semibold text-white">{step.title}</h4>

                            {/* Step Description */}
                            <p className="text-gray-300">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </>
    );
}
