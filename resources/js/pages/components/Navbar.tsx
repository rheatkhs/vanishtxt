import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 z-50 w-full bg-purple-950 shadow-md"
        >
            <div className="flex items-center justify-between px-6 py-4 md:px-10">
                <div className="text-2xl font-extrabold tracking-wide text-white">VanishTXT</div>

                {/* ✅ Mobile Menu Toggle */}
                <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* ✅ Desktop Menu */}
                <div className="hidden gap-6 text-sm text-gray-300 md:flex">
                    <NavItem href="/" text="Home" />
                    <NavItem href="/about" text="About" />
                    <NavItem href="/support" text="Support" />
                    <NavItem href="/signin" text="Sign In" />
                </div>
            </div>

            {/* ✅ Mobile Menu Dropdown */}
            {menuOpen && (
                <div className="flex flex-col items-center gap-4 bg-purple-950 py-4 md:hidden">
                    <NavItem href="/" text="Home" />
                    <NavItem href="/about" text="About" />
                    <NavItem href="/support" text="Support" />
                    <NavItem href="/signin" text="Sign In" />
                </div>
            )}
        </motion.nav>
    );
}

/* ✅ Reusable Nav Item */
function NavItem({ href, text }: { href: string; text: string }) {
    return (
        <Link href={href} className="text-white transition hover:text-pink-400">
            {text}
        </Link>
    );
}
