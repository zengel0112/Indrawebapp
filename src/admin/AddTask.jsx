import React, { useState } from 'react';
import CreateTask from './components/Createtask';
import KpiSetup from './components/Kpi';
import TeamAssignment from './components/TeamAssigment';

const AddTask = () => {
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);

    const handleAddTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    return (
        <div className="p-4">
            <CreateTask onAddTask={handleAddTask} />
            <KpiSetup />
            <TeamAssignment />

            {/* <div className="mt-8">
                <h2 className="text-xl font-bold">Tasks</h2>
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id} className="p-2 border-b">
                            <h3 className="font-semibold">{task.taskName}</h3>
                            <p>Class: {task.className}</p>
                            <p>Goal: {task.goal}</p>
                            <p>Description: {task.description}</p>
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
    );
};

export default AddTask;

