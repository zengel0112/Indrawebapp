import { useState, useEffect } from "react";

const UserTask = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(savedTasks);
    }, []);

    const handleDeleteTask = (id) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const handleUpdateTask = (id, updatedData) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, ...updatedData } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    return (
        <div>
            <h2>User Tasks</h2>
            {tasks.length === 0 ? (
                <p>No tasks available</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <strong>{task.taskName}</strong><br />
                            Points: {task.points}<br />
                            Starter Bonus: {task.bonusRates.starter}%<br />
                            Second Bonus: {task.bonusRates.second}%<br />
                            Last Bonus: {task.bonusRates.last}%<br />
                            Targets: Starter: {task.targets.starterTargetMax}, Second: {task.targets.secondTargetMax}<br />
                            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                            <button onClick={() => handleUpdateTask(task.id, { taskName: "Updated Task" })}>
                                Update
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserTask;
