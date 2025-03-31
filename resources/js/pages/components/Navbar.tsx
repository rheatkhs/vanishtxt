import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed top-0 left-0 z-50 w-full bg-white/10 shadow-lg backdrop-blur-md"
        >
            <div className="flex items-center justify-between px-6 py-4 md:px-10">
                {/* ✅ Logo */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-2xl font-extrabold tracking-wide text-white"
                >
                    VanishTXT
                </motion.div>

                {/* ✅ Desktop Menu */}
                <div className="hidden gap-6 text-sm text-gray-300 md:flex">
                    <NavItem href="/" text="Home" />
                    <NavItem href="/about" text="About" />
                    <NavItem href="/support" text="Support" />
                    <NavItem href="/signin" text="Sign In" />
                </div>

                {/* ✅ Mobile Menu Toggle */}
                <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-white md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </motion.button>
            </div>

            {/* ✅ Mobile Menu (Animated) */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="absolute top-full left-0 w-full bg-white/10 py-6 shadow-lg backdrop-blur-md md:hidden"
                    >
                        <div className="flex flex-col items-center gap-4">
                            <NavItem href="/" text="Home" />
                            <NavItem href="/about" text="About" />
                            <NavItem href="/support" text="Support" />
                            <NavItem href="/signin" text="Sign In" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

/* ✅ Reusable Nav Item */
function NavItem({ href, text }: { href: string; text: string }) {
    return (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="text-white transition hover:text-pink-400">
            <Link href={href}>{text}</Link>
        </motion.div>
    );
}
