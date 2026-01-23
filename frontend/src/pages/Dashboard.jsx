import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FloatingNav } from '../components/ui/floating-navbar'; // Updated import
import TaskCard from '../components/TaskCard';
import api from '../api';
import { Link } from 'react-router-dom';
import { Plus, Home, LogOut, Sun, Moon } from 'lucide-react'; // Added icons

import { WavyBackground } from '../components/ui/wavy-background';
import Footer from '../components/Footer';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(false); // Local state for dark mode toggle in floating nav for demo

    // Logic for dark mode (reused from old navbar for now, but integrated into floating nav)
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


    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data } = await api.get('/tasks');
                setTasks(data);
            } catch (error) {
                console.error("Failed to fetch tasks", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleUpdate = async (id, updates) => {
        try {
            setTasks(tasks.map(t => t._id === id ? { ...t, ...updates } : t));
            await api.put(`/tasks/${id}`, updates);
        } catch (error) {
            console.error("Update failed", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await api.delete(`/tasks/${id}`);
                setTasks(tasks.filter(t => t._id !== id));
            } catch (error) {
                console.error("Delete failed", error);
            }
        }
    }

    const navItems = [
        { name: "Home", link: "/", icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" /> },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 w-full relative">
            <FloatingNav navItems={navItems}>
                <div className="flex items-center space-x-2 border-l pl-4 border-gray-200 dark:border-white/[0.2]">
                    <span className="hidden sm:block text-xs font-medium text-neutral-600 dark:text-neutral-300">
                        {user?.name}
                    </span>
                    <button onClick={toggleDarkMode} className="p-2">
                        {darkMode ? <Sun className="h-4 w-4 text-neutral-500 dark:text-white" /> : <Moon className="h-4 w-4 text-neutral-500 dark:text-white" />}
                    </button>
                    <button onClick={logout} className="p-2" title="Logout">
                        <LogOut className="h-4 w-4 text-neutral-500 dark:text-white" />
                    </button>
                </div>
            </FloatingNav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Welcome back, {user.name}
                    </h1>
                    {user.role === 'manager' && (
                        <Link to="/tasks" className="flex items-center bg-black dark:bg-white dark:text-black text-white px-6 py-3 rounded-full font-bold hover:transform hover:scale-105 transition duration-200">
                            <Plus className="w-5 h-5 mr-2" />
                            Create Task
                        </Link>
                    )}
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-20">
                        <p className="text-xl">No tasks found. Get started by creating one!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-center w-full">
                        {tasks.map(task => (
                            <TaskCard key={task._id} task={task} onUpdate={handleUpdate} onDelete={handleDelete} />
                        ))}
                    </div>
                )}
            </div>
            <div className="fixed inset-0 z-[-10]">
                <WavyBackground className="max-w-4xl mx-auto pb-40" />
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
