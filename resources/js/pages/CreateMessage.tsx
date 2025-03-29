import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Clipboard, RefreshCcw } from 'lucide-react';
import { FormEvent, useState } from 'react';

interface CreateMessageProps {
    generatedLink?: string;
}

export default function CreateMessage({ generatedLink }: CreateMessageProps) {
    const { data, setData, post, processing, reset } = useForm({ message: '' });
    const [copied, setCopied] = useState(false);
    const [resetting, setResetting] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!data.message.trim()) return; // Prevent empty submission
        post('/store');
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
            reset(); // Reset form
            setResetting(false);
        }, 500);
    };

    return (
        <>
            <Head title="Create Message" />
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-black p-6 text-white">
                <div className="w-full max-w-md rounded-xl bg-gray-800 p-6 shadow-md">
                    {/* ✅ Title */}
                    <h1 className="mb-4 text-center text-2xl font-bold">Create a Secret Message</h1>

                    {/* ✅ Message Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <textarea
                            className="w-full rounded-lg bg-gray-700 p-3 text-white focus:ring-2 focus:ring-orange-500"
                            placeholder="Type your secret message..."
                            rows={4}
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                        ></textarea>

                        {/* ✅ Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={processing || !data.message.trim()}
                            className="w-full rounded-lg bg-orange-500 py-3 text-white hover:bg-orange-600 disabled:opacity-50"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            {processing ? 'Encrypting...' : 'Create Message'}
                        </motion.button>
                    </form>

                    {/* ✅ Display the Generated Link */}
                    {generatedLink && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="mt-4 rounded-lg bg-gray-700 p-4 text-center"
                        >
                            <p className="text-sm text-gray-300">Your Secret Link:</p>
                            <textarea readOnly className="mt-2 w-full rounded-lg bg-white p-2 text-sm text-black" value={generatedLink} />

                            {/* ✅ Buttons: Copy & Reset */}
                            <div className="mt-3 flex flex-col justify-center gap-3 sm:flex-row">
                                {/* Copy Button */}
                                <motion.button
                                    onClick={handleCopy}
                                    className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <Clipboard size={20} />
                                    {copied ? 'Copied!' : 'Copy'}
                                </motion.button>

                                {/* Reset Button */}
                                <motion.button
                                    onClick={handleReset}
                                    className="flex items-center justify-center rounded-lg bg-gray-700 p-3 text-white shadow-md hover:bg-gray-600"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <RefreshCcw size={20} className={resetting ? 'animate-spin' : ''} />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    );
}
