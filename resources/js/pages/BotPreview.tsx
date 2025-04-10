import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

interface BotPreviewProps {
    messagePreview: string;
    sender?: string;
    receiver?: string;
}

export default function BotPreview({ messagePreview, sender = 'Anonymous', receiver = 'Anonymous' }: BotPreviewProps) {
    return (
        <>
            <Head title="Secure Message Preview" />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#090214] via-[#1b0c3b] to-[#2e104f] px-6 text-white"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="w-full max-w-xl rounded-xl border border-white/20 bg-white/5 p-8 text-center shadow-lg backdrop-blur-md"
                >
                    <div className="mb-4 flex items-center justify-center">
                        <div className="rounded-full bg-white/10 p-4">
                            <Lock size={32} className="text-pink-400" />
                        </div>
                    </div>

                    <h1 className="mb-3 text-2xl font-bold text-white sm:text-3xl">Encrypted Message Preview</h1>

                    <p className="mb-6 text-sm text-gray-400">
                        From <span className="font-semibold text-pink-400">{sender}</span> to{' '}
                        <span className="font-semibold text-orange-400">{receiver}</span>
                    </p>

                    <div className="rounded-md border border-white/10 bg-black/20 px-5 py-4 text-sm text-gray-300">{messagePreview}</div>

                    <p className="mt-4 text-xs text-gray-500 italic">This message will only be decrypted when opened by the intended recipient.</p>
                </motion.div>
            </motion.div>
        </>
    );
}
