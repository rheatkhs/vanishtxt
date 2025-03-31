import Navbar from '@/pages/components/Navbar';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Home() {
    return (
        <>
            <Head title="Secure Messaging" />
            <Navbar />
            <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-black px-6 text-white">
                {/* ✅ Hero Section (Responsive) */}
                <div className="mt-24 max-w-4xl px-4 text-center sm:px-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-4xl leading-tight font-extrabold sm:text-6xl"
                    >
                        Secrets that <span className="text-pink-400">Disappear</span>, Just Like They Should.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="mt-4 px-2 text-lg text-gray-300"
                    >
                        Your messages are encrypted & self-destruct after being read.
                    </motion.p>

                    {/* ✅ CTA Buttons (Stacked on Mobile, Inline on Desktop) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.7 }}
                        className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row"
                    >
                        <Link
                            href="/create"
                            className="flex items-center gap-2 rounded-full bg-pink-500 px-8 py-3 text-white shadow-lg transition-all hover:bg-pink-600"
                        >
                            Get Started <ArrowRight size={18} />
                        </Link>
                        <Link
                            href="/how-it-works"
                            className="rounded-full border border-gray-400 px-8 py-3 text-white transition-all hover:border-pink-400"
                        >
                            How It Works
                        </Link>
                    </motion.div>
                </div>

                {/* ✅ 3D Animation Placeholder (Make Sure Image Scales Well)
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-12 flex w-full justify-center"
                >
                    <img src="/images/secure-message.svg" alt="Secure Messaging" className="w-72 animate-pulse sm:w-96" />
                </motion.div> */}

                {/* ✅ Footer (Fixed on Mobile) */}
                <motion.footer
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.7 }}
                    className="absolute bottom-4 px-4 text-center text-sm text-gray-400"
                >
                    Made with 🚀 by{' '}
                    <a href="https://github.com/rheatkhs" className="text-pink-400 underline">
                        Rhea Takahashi
                    </a>
                </motion.footer>
            </div>
        </>
    );
}
