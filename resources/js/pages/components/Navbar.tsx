import { Link, usePage } from '@inertiajs/react'; // ✅ Import usePage to detect current route
import { motion } from 'framer-motion';
import { Headphones, Home, Info, LogIn } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const { url } = usePage(); // ✅ Get current route from Inertia
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <>
            {/* ✅ Top Navbar (Hidden on Mobile) */}
            {!isMobile && (
                <motion.nav
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="fixed top-0 left-0 z-50 w-full bg-white/10 shadow-lg backdrop-blur-md"
                >
                    <div className="flex items-center justify-between px-6 py-4 md:px-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="text-2xl font-extrabold tracking-wide text-white"
                        >
                            VanishTXT
                        </motion.div>
                        <div className="hidden gap-6 text-sm text-gray-300 md:flex">
                            <NavItem href="/" text="Home" active={url === '/'} />
                            <NavItem href="/about" text="About" active={url === '/about'} />
                            <NavItem href="/support" text="Support" active={url === '/support'} />
                            <NavItem href="/login" text="Sign In" active={url === '/login'} />
                        </div>
                    </div>
                </motion.nav>
            )}

            {/* ✅ Bottom Navigation (Only on Mobile) */}
            {isMobile && (
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="fixed bottom-5 left-1/2 z-50 flex w-[90%] max-w-[400px] -translate-x-1/2 items-center justify-around rounded-full bg-white/10 p-3 shadow-lg backdrop-blur-md"
                >
                    <NavItemMobile href="/" text="Home" icon={<Home />} active={url === '/'} />
                    <NavItemMobile href="/about" text="About" icon={<Info />} active={url === '/about'} />
                    <NavItemMobile href="/support" text="Support" icon={<Headphones />} active={url === '/support'} />
                    <NavItemMobile href="/login" text="Sign In" icon={<LogIn />} active={url === '/login'} />
                </motion.div>
            )}
        </>
    );
}

/* ✅ Desktop Navigation Items */
function NavItem({ href, text, active }: { href: string; text: string; active: boolean }) {
    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`cursor-pointer transition ${active ? 'text-pink-400' : 'text-white'}`}
        >
            <Link href={href}>{text}</Link>
        </motion.div>
    );
}

/* ✅ Mobile Navigation Items (Active Matches Link) */
function NavItemMobile({ href, text, icon, active }: { href: string; text: string; icon: JSX.Element; active: boolean }) {
    return (
        <motion.div
            whileTap={{ scale: 0.9 }}
            className={`relative flex flex-col items-center justify-center px-4 py-2 transition ${active ? 'text-pink-400' : 'text-gray-300'}`}
        >
            <Link href={href} className="flex flex-col items-center">
                <motion.div animate={{ scale: active ? 1.2 : 1 }} className={`text-2xl transition ${active ? 'text-pink-400' : 'text-gray-300'}`}>
                    {icon}
                </motion.div>
                <span className="text-xs">{text}</span>
            </Link>
            {active && <motion.div layoutId="active-underline" className="absolute -bottom-1 h-1 w-5 rounded-full bg-pink-400" />}
        </motion.div>
    );
}
