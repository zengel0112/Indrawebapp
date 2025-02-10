import React, { useState } from 'react';

const CreateTask = ({ onAddTask }) => {
    const [taskName, setTaskName] = useState('');
    const [className, setClassName] = useState('');
    const [goal, setGoal] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        const newTask = {
            id: Date.now(),
            taskName,
            className,
            goal,
            description
        };

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        onAddTask(newTask);

        setTaskName('');
        setClassName('');
        setGoal('');
        setDescription('');
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Create Task</h2>
            <input
                type="text"
                placeholder="Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="p-2 border rounded w-full mb-2"
            />
            <select
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="p-2 border rounded w-full mb-2"
            >
                <option value="">Select Class</option>
                <option value="Class A">Class A</option>
                <option value="Class B">Class B</option>
                <option value="Class C">Class C</option>
            </select>
            <input
                type="number"
                placeholder="Goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="p-2 border rounded w-full mb-2"
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 border rounded w-full mb-2"
            ></textarea>
            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded"
            >
                Create Task
            </button>
        </div>
    );
};

export default CreateTask;
