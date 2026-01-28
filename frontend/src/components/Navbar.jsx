import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
    // Get logged-in user details and logout function from AuthContext
    const { user, logout } = useAuth();

    // State to track whether dark mode is enabled or not
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        /*
         Check if:
         1. User has already selected dark mode (stored in localStorage), OR
         2. User's system preference is dark mode
         If yes, enable dark mode on initial load
        */
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark');
            setDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setDarkMode(false);
        }
    }, []);

    const toggleDarkMode = () => {
        /*
         Toggle dark mode:
         - Update HTML root class
         - Store user preference in localStorage
         - Update component state so UI icon changes
        */
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
        <nav className="bg-white dark:bg-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        {/* App logo / brand name */}
                        <Link to="/" className="text-2xl font-bold text-primary">
                            TaskMaster
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Button to toggle between light and dark mode */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
                        >
                            {darkMode ? (
                                <Sun className="w-6 h-6 text-yellow-500" />
                            ) : (
                                <Moon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                            )}
                        </button>

                        {/* Conditional rendering based on authentication status */}
                        {user ? (
                            <>
                                {/* Show user name when logged in */}
                                <span className="text-gray-700 dark:text-gray-200">
                                    Hello, {user.name}
                                </span>

                                {/* Dashboard link for authenticated users */}
                                <Link
                                    to="/"
                                    className="text-gray-600 dark:text-gray-300 hover:text-primary"
                                >
                                    Dashboard
                                </Link>

                                {/* Logout button clears auth state */}
                                <button
                                    onClick={logout}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Links shown when user is not logged in */}
                                <Link
                                    to="/login"
                                    className="text-gray-600 dark:text-gray-300 hover:text-primary"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                                >
                                    Signup
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
