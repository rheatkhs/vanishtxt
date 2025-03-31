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

                {/* ✅ Mobile Menu Toggle (Animated) */}
                <motion.button
                    whileTap={{ scale: 0.8, rotate: 180 }}
                    className="text-white transition md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={32} className="text-pink-400" /> : <Menu size={32} />}
                </motion.button>
            </div>

            {/* ✅ Full-Screen Mobile Menu (Centered) */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="fixed inset-0 z-40 flex h-screen flex-col items-center justify-center bg-gradient-to-br from-[#1b0c3b] to-[#2e104f] text-white"
                    >
                        {/* ✅ Close Button */}
                        <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute top-6 right-6 text-pink-400"
                            onClick={() => setMenuOpen(false)}
                        >
                            <X size={36} />
                        </motion.button>

                        {/* ✅ Full-Screen Nav Links (Centered Vertically) */}
                        <div className="flex h-full w-full flex-col items-center justify-center">
                            <NavItemFull href="/" text="Home" onClick={() => setMenuOpen(false)} />
                            <NavItemFull href="/about" text="About" onClick={() => setMenuOpen(false)} />
                            <NavItemFull href="/support" text="Support" onClick={() => setMenuOpen(false)} />
                            <NavItemFull href="/signin" text="Sign In" onClick={() => setMenuOpen(false)} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

/* ✅ Full-Screen Mobile Menu Item (Centered) */
function NavItemFull({ href, text, onClick }: { href: string; text: string; onClick?: () => void }) {
    return (
        <motion.div
            whileHover={{ backgroundColor: 'rgba(255, 78, 203, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            className="w-full cursor-pointer border-b border-white/10 py-8 text-center text-2xl font-semibold transition hover:bg-white/20"
            onClick={onClick}
        >
            <Link href={href} className="block w-full">
                {text}
            </Link>
        </motion.div>
    );
}

/* ✅ Desktop Nav Item */
function NavItem({ href, text }: { href: string; text: string }) {
    return (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="cursor-pointer text-white transition hover:text-pink-400">
            <Link href={href}>{text}</Link>
        </motion.div>
    );
}
