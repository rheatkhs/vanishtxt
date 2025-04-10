import { AnimatePresence, motion } from 'framer-motion';

export default function Toast({ show, message }: { show: boolean; message: string }) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-6 left-1/2 z-[1000] w-fit -translate-x-1/2 px-4"
                >
                    <div className="inline-block max-w-full rounded-xl border border-white/10 bg-red-500/20 px-5 py-3 text-center text-sm text-white shadow-xl backdrop-blur-2xl">
                        <p className="font-medium whitespace-nowrap text-white">{message}</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
