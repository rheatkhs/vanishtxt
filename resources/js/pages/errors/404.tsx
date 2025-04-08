import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        <>
            <Head title="404" />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#090214] via-[#1b0c3b] to-[#2e104f] px-6 text-white"
            >
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="text-6xl font-bold text-[#ff4ecb] drop-shadow-lg"
                >
                    404
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                    className="mt-4 max-w-md text-center text-lg text-gray-300"
                >
                    Oops... The page you're looking for doesn't exist or has been moved.
                </motion.p>

                <Link
                    href="/"
                    className="mt-8 inline-block rounded-lg bg-gradient-to-r from-[#ff4ecb] to-[#ff7f50] px-6 py-3 font-semibold text-white shadow-md transition hover:scale-105"
                >
                    Go Home
                </Link>
            </motion.div>
        </>
    );
}
