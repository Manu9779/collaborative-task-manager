import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { AuroraBackground } from '../components/ui/AuroraBackground';
import { motion } from 'framer-motion';
import { Input, Label } from '../components/ui/input';
import { FloatingNav } from '../components/ui/floating-navbar';
import { Home, Sun, Moon } from 'lucide-react';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        const result = await signup(name, email, password, role);
        setIsLoading(false);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    const navItems = [
        { name: "Home", link: "/", icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" /> },
        { name: "Login", link: "/login", icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" /> },
    ];

    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            setDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setDarkMode(false);
        }
    }, []);

    const toggleDarkMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setDarkMode(true);
        }
    };

    return (
        <AuroraBackground>
            <FloatingNav navItems={navItems}>
                <button onClick={toggleDarkMode} className="p-2">
                    {darkMode ? <Sun className="h-4 w-4 text-neutral-500 dark:text-white" /> : <Moon className="h-4 w-4 text-neutral-500 dark:text-white" />}
                </button>
            </FloatingNav>
            <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="relative flex flex-col gap-4 items-center justify-center px-4"
            >
                <div className="w-full max-w-md bg-white dark:bg-black/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/10 shadow-xl p-8">
                    <Link to="/" className="block text-center text-4xl font-bold text-gray-800 dark:text-white mb-8">
                        Sign Up
                    </Link>
                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col space-y-2 w-full">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                required
                                autoComplete="name"
                            />
                        </div>
                        <div className="flex flex-col space-y-2 w-full">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                autoComplete="email"
                            />
                        </div>
                        <div className="flex flex-col space-y-2 w-full">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="flex flex-col space-y-2 w-full">
                            <Label htmlFor="role">Role</Label>
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] transition duration-400"
                            >
                                <option value="user">User</option>
                                <option value="manager">Manager</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-3 px-4 rounded-lg hover:opacity-90 transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>
                    <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
                        Already have an account? <Link to="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Login</Link>
                    </p>
                </div>
            </motion.div>
        </AuroraBackground>
    );
};

export default Signup;
