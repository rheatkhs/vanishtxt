import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Clipboard } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ShowMessageProps {
    message: string;
}

export default function ShowMessage({ message }: ShowMessageProps) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!message) window.location.href = '/create';
    }, [message]);

    const handleCopy = () => {
        navigator.clipboard.writeText(message);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <Head title="Show Message" />
            <div className="flex min-h-screen items-center justify-center bg-gray-900 p-6 text-white">
                <div className="w-full max-w-md rounded-xl bg-gray-800 p-6 shadow-md">
                    <h1 className="mb-4 text-center text-2xl font-bold">Your Secret Message</h1>

                    <textarea
                        className="h-40 w-full rounded-lg bg-gray-700 p-3 text-white focus:ring-2 focus:ring-orange-500"
                        readOnly
                        value={message}
                    ></textarea>

                    <motion.button
                        onClick={handleCopy}
                        className="mt-4 flex w-full items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-white hover:bg-orange-600"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <Clipboard size={20} />
                        {copied ? 'Copied!' : 'Copy Message'}
                    </motion.button>

                    <p className="mt-3 text-center text-sm text-gray-400">This message has been deleted after viewing.</p>
                </div>
            </div>
        </>
    );
}
