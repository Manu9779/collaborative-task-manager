import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Pencil, Trash2 } from 'lucide-react';
import { CardBody, CardContainer, CardItem } from './ui/3d-card';

const TaskCard = ({ task, onUpdate, onDelete }) => {
    const { user } = useAuth();
    const [status, setStatus] = useState(task.status);
    const [isLoading, setIsLoading] = useState(false);

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        setIsLoading(true);
        await onUpdate(task._id, { status: newStatus });
        setIsLoading(false);
    };

    const priorityColors = {
        Low: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
        High: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    };

    const statusColors = {
        Pending: 'bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-300',
        'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
        Completed: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        Cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    }

    return (
        <CardContainer className="inter-var w-full">
            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:w-[24rem] h-auto rounded-xl p-6 border  ">
                <div className="flex justify-between items-start mb-4">
                    <CardItem
                        translateZ="50"
                        className="text-xl font-bold text-neutral-600 dark:text-white"
                    >
                        {task.title}
                    </CardItem>
                    <CardItem
                        translateZ="50"
                        className="flex space-x-2"
                    >
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[task.priority]}`}>
                            {task.priority}
                        </span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[task.status]}`}>
                            {task.status}
                        </span>
                    </CardItem>
                </div>

                <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                    {task.description}
                </CardItem>

                <CardItem translateZ="50" className="w-full mt-4">
                    <p className="text-xs text-gray-400">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                </CardItem>

                <div className="flex justify-between items-center mt-8">
                    <CardItem
                        translateZ={20}
                        as="div"
                        className="flex items-center space-x-2"
                    >
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Status:</span>
                        <select
                            value={status}
                            onChange={handleStatusChange}
                            disabled={isLoading}
                            className="text-sm border-gray-300 dark:border-zinc-700 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-zinc-800 dark:text-white p-1"
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            {user.role === 'manager' && <option value="Cancelled">Cancelled</option>}
                        </select>
                    </CardItem>

                    {user.role === 'manager' && (
                        <CardItem
                            translateZ={20}
                            as="button"
                            onClick={() => onDelete(task._id)}
                            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                        >
                            Delete
                        </CardItem>
                    )}
                </div>

                {task.assignedTo && (
                    <CardItem translateZ="40" className="mt-4 text-xs text-gray-400 text-right w-full">
                        Assigned to: {task.assignedTo.name}
                    </CardItem>
                )}
            </CardBody>
        </CardContainer>
    );
};

export default TaskCard;
