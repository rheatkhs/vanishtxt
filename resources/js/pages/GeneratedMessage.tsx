import { Head, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Clipboard, RefreshCcw, Share2 } from 'lucide-react';
import { useState } from 'react';

interface GeneratedMessageProps {
    generatedLink: string;
    sender?: string;
    receiver?: string;
    expires_at?: string;
    expiresMessage?: string;
}

export default function GeneratedMessage({ generatedLink, sender = 'Anonymous', receiver = 'Anonymous', expiresMessage }: GeneratedMessageProps) {
    const [copied, setCopied] = useState(false);
    const [resetting, setResetting] = useState(false);
    const [shareError, setShareError] = useState('');

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleReset = () => {
        setResetting(true);
        setTimeout(() => {
            router.visit('/create');
        }, 500);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Secret Message via VanishTXT',
                    text: `You've received a secret message from ${sender} 🎁`,
                    url: generatedLink,
                });
                setShareError('');
            } catch (err) {
                setShareError('Sharing was cancelled.');
            }
        } else {
            setShareError('Sharing is not supported on this device.');
        }
    };

    return (
        <>
            <Head title="Message Created" />
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
                    className="w-full max-w-xl rounded-xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-lg"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="mb-6 bg-gradient-to-r from-[#ff4ecb] to-[#ff7f50] bg-clip-text text-center text-4xl font-bold text-transparent"
                    >
                        Secret Message Created!
                    </motion.h1>

                    <div className="mb-6 rounded-md border border-[#ff4ecb] bg-black/20 px-4 py-3 text-center text-sm text-gray-300 shadow-inner">
                        <div className="flex items-center justify-center gap-2">
                            <span className="font-medium text-[#ff4ecb]">{sender}</span>
                            <ArrowRight size={16} className="text-gray-400" />
                            <span className="font-medium text-[#ff7f50]">{receiver}</span>
                        </div>
                        {expiresMessage && (
                            <div className="mt-2 text-xs text-gray-400">
                                <span className="italic">{expiresMessage}</span>
                            </div>
                        )}
                    </div>

                    <div className="rounded-lg border border-[#ff4ecb] bg-black/30 p-4">
                        <p className="mb-2 text-sm text-gray-300">Share this link to reveal the secret message:</p>
                        <textarea
                            readOnly
                            className="w-full resize-none overflow-hidden rounded-lg border border-[#ff4ecb] bg-transparent p-2 text-sm text-[#ff4ecb] transition duration-300 focus:border-white focus:outline-none"
                            value={generatedLink}
                        />
                    </div>

                    {shareError && <p className="mt-2 text-center text-sm text-red-400">{shareError}</p>}

                    <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                        <motion.button
                            onClick={handleCopy}
                            className="flex items-center gap-2 rounded-lg bg-[#ff4ecb] px-6 py-2 font-semibold text-white shadow-md transition hover:scale-105"
                            whileTap={{ scale: 0.97 }}
                        >
                            <Clipboard size={20} />
                            {copied ? 'Copied!' : 'Copy Link'}
                        </motion.button>

                        <motion.button
                            onClick={handleShare}
                            className="flex items-center gap-2 rounded-lg border border-[#ff4ecb] px-6 py-2 font-semibold text-white transition-all hover:border-pink-400"
                            whileTap={{ scale: 0.97 }}
                        >
                            <Share2 size={20} />
                            <span>Share</span>
                        </motion.button>

                        <motion.button
                            onClick={handleReset}
                            className="flex items-center justify-center gap-2 rounded-lg border border-gray-400 px-6 py-2 font-semibold text-white transition-all hover:border-pink-400"
                            whileTap={{ scale: 0.97 }}
                        >
                            <RefreshCcw size={20} className={resetting ? 'animate-spin' : ''} />
                            <span>Create New</span>
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
}
