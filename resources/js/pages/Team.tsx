import Navbar from '@/pages/components/Navbar';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { BotMessageSquare, Brain, Code, ShieldCheck } from 'lucide-react';

const teamMembers = [
    {
        name: 'Febiadi Wisnu Akbar',
        role: 'Founder & Full-Stack Developer',
        description: 'Solo developer behind VanishTXT — building privacy-first messaging with modern tools and design.',
        icon: <Code size={36} className="text-pink-400" />,
    },
    {
        name: 'ChatGPT',
        role: 'AI Assistant & Collaborator',
        description: 'Supports development, writing, and architecture with machine learning intelligence.',
        icon: <BotMessageSquare size={36} className="text-blue-400" />,
    },
    {
        name: 'Claude AI',
        role: 'Language Optimization',
        description: 'Helps craft clean, human-friendly UX copy and tone across the app.',
        icon: <Brain size={36} className="text-green-400" />,
    },
    {
        name: 'Gemini AI',
        role: 'Security & Privacy Review',
        description: 'Contributes insight for encrypted workflows and security logic feedback.',
        icon: <ShieldCheck size={36} className="text-purple-400" />,
    },
];

export default function Teams() {
    return (
        <>
            <Head title="Meet the Team" />
            <Navbar />

            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#090214] via-[#1b0c3b] to-[#2e104f] px-6 pt-28 pb-32 text-white sm:pt-32 sm:pb-40"
            >
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="mb-4 bg-gradient-to-r from-[#ff4ecb] to-[#ff7f50] bg-clip-text text-center text-4xl font-bold text-transparent sm:text-5xl"
                >
                    Meet the Team
                </motion.h1>

                <p className="mb-12 max-w-xl text-center text-gray-300">
                    A powerful mix of code, AI, and creativity — all working together to bring you secure, self-destructing messages.
                </p>

                <div className="grid w-full max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="flex flex-col items-center rounded-xl bg-white/10 p-6 text-center shadow-md backdrop-blur-md transition-all duration-300 hover:bg-white/20"
                        >
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 p-3">{member.icon}</div>
                            <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                            <p className="text-sm text-pink-400">{member.role}</p>
                            <p className="mt-2 text-sm text-gray-300">{member.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </>
    );
}
