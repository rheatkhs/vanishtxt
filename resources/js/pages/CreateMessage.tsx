import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { RefreshCcw } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import Tooltip from './components/ToolTip';

export default function CreateMessage() {
    const { data, setData, post, processing, errors } = useForm({
        message: '',
        sender: '',
        receiver: '',
        expires_at: '',
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
                className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#090214] via-[#1b0c3b] to-[#2e104f] px-6 pb-32 text-white"
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
                            className="w-full rounded-lg border border-[#ff4ecb] bg-transparent p-3 text-white placeholder-gray-400 transition duration-300 focus:border-white focus:outline-none"
                            placeholder="Your Name (optional)"
                            value={data.sender}
                            onChange={(e) => setData('sender', e.target.value)}
                        />

                        <motion.input
                            className="w-full rounded-lg border border-[#ff4ecb] bg-transparent p-3 text-white placeholder-gray-400 transition duration-300 focus:border-white focus:outline-none"
                            placeholder="Receiver's Name (optional)"
                            value={data.receiver}
                            onChange={(e) => setData('receiver', e.target.value)}
                        />

                        <motion.textarea
                            className="w-full resize-none overflow-hidden rounded-lg border border-[#ff4ecb] bg-transparent p-3 text-white placeholder-gray-400 transition duration-300 focus:border-white focus:outline-none"
                            placeholder="Type your secret message..."
                            rows={4}
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                        />

                        <div className="space-y-4">
                            {/* <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                                <Hourglass size={16} className="text-white" />
                                Message Expiry
                            </label> */}

                            <div className="flex flex-wrap gap-3">
                                {[
                                    { label: '5 min', value: '5', tooltip: 'Auto-expires after 5 minutes, even if unread' },
                                    { label: '10 min', value: '10', tooltip: 'Auto-expires after 10 minutes, even if unread' },
                                    { label: '30 min', value: '30', tooltip: 'Auto-expires after 30 minutes, even if unread' },
                                    { label: '1 hour', value: '60', tooltip: 'Auto-expires after 1 hour, even if unread' },
                                    { label: '1 day', value: '1440', tooltip: 'Auto-expires after 1 day, even if unread' },
                                    { label: 'One-Time Access', value: 'once', tooltip: 'Stays active until opened once' },
                                ].map(({ label, value, tooltip }) => {
                                    const isActive = data.expires_at === value;

                                    return (
                                        <Tooltip key={value} content={tooltip}>
                                            <button
                                                type="button"
                                                onClick={() => setData('expires_at', value)}
                                                className={`min-w-[100px] flex-1 rounded-full px-4 py-2 text-center text-sm font-medium transition-all duration-200 focus:outline-none ${
                                                    isActive
                                                        ? 'bg-gradient-to-r from-[#ff4ecb] to-[#ff7f50] text-white shadow-md ring-2 ring-transparent'
                                                        : 'bg-white/10 text-white hover:bg-white/20 hover:ring-1 hover:ring-transparent'
                                                }`}
                                            >
                                                {label}
                                            </button>
                                        </Tooltip>
                                    );
                                })}
                            </div>

                            {errors.expires_at && <p className="text-sm text-red-400">{errors.expires_at}</p>}

                            <div className="mt-5 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-5 text-sm text-gray-300 shadow-inner backdrop-blur-md">
                                <h5 className="mb-2 flex items-center gap-2 text-base font-semibold text-white">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-pink-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z"
                                        />
                                    </svg>
                                    Message Expiry Info
                                </h5>
                                <p className="leading-relaxed">
                                    <span className="font-medium text-white">Timed messages</span> (e.g. 5 min, 1 hour) will
                                    <span className="font-medium text-white"> automatically expire</span> after the selected duration —
                                    <span className="font-medium text-white"> even if they are never opened</span>.
                                </p>
                                <p className="mt-2 leading-relaxed">
                                    <span className="font-medium text-white">One-Time Access</span> messages will
                                    <span className="font-medium text-white"> remain active indefinitely</span> and will only be deleted
                                    <span className="font-medium text-white"> once they are viewed</span>.
                                </p>
                            </div>
                        </div>

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
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#ff4ecb] to-[#ff7f50] px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50"
                            whileTap={{ scale: 0.97 }}
                        >
                            {processing ? (
                                <>
                                    <RefreshCcw className="animate-spin" size={18} />
                                    Encrypting...
                                </>
                            ) : (
                                'Create Message'
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </motion.div>
        </>
    );
}
