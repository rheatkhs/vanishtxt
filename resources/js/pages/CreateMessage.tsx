import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FormEvent, useEffect, useState } from 'react';

export default function CreateMessage() {
    const { data, setData, post, processing, errors } = useForm({
        message: '',
        sender: '',
        receiver: '',
        'cf-turnstile-response': '', // 🔥 use this exact key here (with dashes)
    });

    const [captchaReady, setCaptchaReady] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
        script.async = true;
        script.defer = true;
        script.onload = () => setCaptchaReady(true);
        document.body.appendChild(script);
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!data.message.trim()) return;

        const token = (document.querySelector('[name="cf-turnstile-response"]') as HTMLInputElement)?.value;

        if (!token) {
            alert('Please complete the CAPTCHA.');
            return;
        }

        setData('cf-turnstile-response', token); // ✅ must match exactly
        post('/store');
    };

    useEffect(() => {
        // For TypeScript
        (window as any).onTurnstileSuccess = function (token: string) {
            setData('cf-turnstile-response', token);
        };
    }, []);

    return (
        <>
            <Head title="Create Message" />
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
                    className="mt-24 bg-gradient-to-r from-[#ff4ecb] to-[#ff7f50] bg-clip-text text-center text-5xl font-extrabold text-transparent sm:text-6xl"
                >
                    Create a Secret Message
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                    className="mt-8 w-full max-w-lg rounded-xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-lg"
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <motion.input
                            className="w-full rounded-lg border border-[#ff4ecb] bg-transparent p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#ff4ecb]"
                            placeholder="Your Name (optional)"
                            value={data.sender}
                            onChange={(e) => setData('sender', e.target.value)}
                        />

                        <motion.input
                            className="w-full rounded-lg border border-[#ff4ecb] bg-transparent p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#ff4ecb]"
                            placeholder="Receiver's Name (optional)"
                            value={data.receiver}
                            onChange={(e) => setData('receiver', e.target.value)}
                        />

                        <motion.textarea
                            className="w-full rounded-lg border border-[#ff4ecb] bg-transparent p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#ff4ecb]"
                            placeholder="Type your secret message..."
                            rows={4}
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                        />

                        {/* Cloudflare CAPTCHA */}
                        <div className="flex w-full justify-center">
                            <div
                                className="cf-turnstile"
                                data-sitekey="0x4AAAAAABGKQB-Q7Xko_nNM"
                                data-theme="dark"
                                data-callback="onTurnstileSuccess"
                            ></div>
                        </div>
                        {errors?.['cf-turnstile-response'] && <p className="text-sm text-red-400">{errors['cf-turnstile-response']}</p>}

                        <motion.button
                            type="submit"
                            disabled={processing || !data.message.trim()}
                            className="w-full rounded-lg bg-gradient-to-r from-[#ff4ecb] to-[#ff7f50] px-8 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 disabled:opacity-50"
                            whileTap={{ scale: 0.97 }}
                        >
                            {processing ? 'Encrypting...' : 'Create Message'}
                        </motion.button>
                    </form>
                </motion.div>
            </motion.div>
        </>
    );
}
