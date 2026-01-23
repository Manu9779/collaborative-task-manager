import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FloatingNav } from '../components/ui/floating-navbar';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { Input, Label } from '../components/ui/input';
import { Button } from '../components/ui/moving-border';
import { cn } from '../lib/utils';
import { Home, LogOut, Sun, Moon, User } from 'lucide-react';
import { AuroraBackground } from '../components/ui/AuroraBackground';

const LabelInputContainer = ({ children, className }) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};

const TaskManager = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth(); // Get user and logout
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [dueDate, setDueDate] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await api.get('/auth/users');
                setUsers(data);
                if (data.length > 0) setAssignedTo(data[0]._id);
            } catch (error) {
                console.error("Failed to fetch users");
            }
        };
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/tasks', {
                title,
                description,
                priority,
                dueDate,
                assignedTo,
                status: 'Pending'
            });
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create task');
        }
    };

    const navItems = [
        { name: "Home", link: "/", icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" /> },
    ];

    // Reuse dark mode logic
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
        <div className="relative w-full overflow-hidden min-h-screen bg-black">
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
            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black mt-20 z-10 relative">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    Create New Task
                </h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Assign a new task to your team.
                </p>

                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mt-4">{error}</div>}

                <form className="my-8" onSubmit={handleSubmit}>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="h-20" // taller input for description mock
                        />
                    </LabelInputContainer>

                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <LabelInputContainer>
                            <Label htmlFor="priority">Priority</Label>
                            <select
                                id="priority"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] transition duration-400"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </LabelInputContainer>

                        <LabelInputContainer>
                            <Label htmlFor="dueDate">Due Date</Label>
                            <Input
                                id="dueDate"
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                required
                            />
                        </LabelInputContainer>
                    </div>

                    <LabelInputContainer className="mb-8">
                        <Label htmlFor="assignedTo">Assign To</Label>
                        <select
                            id="assignedTo"
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}
                            className="flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] transition duration-400"
                        >
                            {users.length === 0 && <option>No users found</option>}
                            {users.map(u => (
                                <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
                            ))}
                        </select>
                    </LabelInputContainer>

                    <Button
                        type="submit"
                        borderRadius="0.5rem"
                        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 w-full"
                    >
                        Create Task &rarr;
                    </Button>
                </form>
            </div>

            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-transparent z-0 h-full w-full dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            </div>
        </div>
    );
};

export default TaskManager;
