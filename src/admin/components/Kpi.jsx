import React, { useState } from 'react';

const KPI = ({ onAddTask }) => {
    const [taskName, setTaskName] = useState("");
    const [points, setPoints] = useState("");
    const [bonusRates, setBonusRates] = useState({
        starter: "",
        second: "",
        last: "",
    });

    const [targets, setTargets] = useState({
        starterTargetMax: "",
        secondTargetMax: "",
    });

    // KPI тооцоолол хийх функц
    const calculateKPI = () => {
        const totalBonus =
            (bonusRates.starter / 100) * points +
            (bonusRates.second / 100) * points +
            (bonusRates.last / 100) * points;

        const targetAchieved =
            (targets.starterTargetMax + targets.secondTargetMax) / 2;

        return {
            totalBonus,
            targetAchieved,
        };
    };

    const handleAddTask = () => {
        if (!taskName || !points || !targets.starterTargetMax || !targets.secondTargetMax) {
            alert("Та бүх талбарыг бөглөнө үү!");
            return;
        }

        const newTask = {
            id: Date.now(),
            taskName,
            points: parseFloat(points),
            bonusRates: {
                starter: parseFloat(bonusRates.starter),
                second: parseFloat(bonusRates.second),
                last: parseFloat(bonusRates.last),
            },
            targets: {
                starterTargetMax: parseFloat(targets.starterTargetMax),
                secondTargetMax: parseFloat(targets.secondTargetMax),
            }
        };

        const updatedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        updatedTasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        onAddTask(newTask);

        setTaskName("");
        setPoints("");
        setBonusRates({ starter: "", second: "", last: ""});
        setTargets({ starterTargetMax: "", secondTargetMax: ""});
    };

    const { totalBonus, targetAchieved } = calculateKPI();

    return (
        <div className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-black">📌 Add Task (Admin)</h2>
            
            {/* Task Name */}
            <input
                type="text"
                placeholder="Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="p-2 border rounded w-full mb-2 text-black placeholder-gray-800"
            />
            
            {/* Points */}
            <input
                type="number"
                placeholder="Points"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                className="p-2 border rounded w-full mb-2 text-black placeholder-gray-800"
            />

            {/* Bonus Rates */}
            <input
                type="number"
                placeholder="Starter %"
                value={bonusRates.starter}
                onChange={(e) => setBonusRates({...bonusRates, starter: e.target.value})}
                className="p-2 border rounded w-full mb-2 text-black placeholder-gray-800"
            />
            <input
                type="number"
                placeholder="Second %"
                value={bonusRates.second}
                onChange={(e) => setBonusRates({...bonusRates, second: e.target.value})}
                className="p-2 border rounded w-full mb-2 text-black placeholder-gray-800"
            />
            <input
                type="number"
                placeholder="Last %"
                value={bonusRates.last}
                onChange={(e) => setBonusRates({...bonusRates, last: e.target.value})}
                className="p-2 border rounded w-full mb-2 text-black placeholder-gray-800"
            />

            {/* Targets */}
            <input
                type="number"
                placeholder="Starter Target Max"
                value={targets.starterTargetMax}
                onChange={(e) => setTargets({...targets, starterTargetMax: e.target.value})}
                className="p-2 border rounded w-full mb-2 text-black placeholder-gray-800"
            />
            <input
                type="number"
                placeholder="Second Target Max"
                value={targets.secondTargetMax}
                onChange={(e) => setTargets({...targets, secondTargetMax: e.target.value})}
                className="p-2 border rounded w-full mb-2 text-black placeholder-gray-800"
            />

            {/* KPI тооцоолол */}
            <div className="kpi-section mt-4">
                <h3 className="text-lg font-bold">KPI тооцоолол</h3>
                <div>
                    <strong>Бонусын дүн:</strong> {totalBonus.toFixed(2)} points
                </div>
                <div>
                    <strong>Хүрэх зорилт:</strong> {targetAchieved.toFixed(2)} points
                </div>
            </div>

            {/* Add Task Button */}
            <button
                onClick={handleAddTask}
                className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 w-full mt-4"
            >
                Add Task
            </button>
        </div>
    );
};

{/* <h1 className="text-center text-2xl font-bold">Task Manager</h1>
<KPI onAddTask={handleAddTask} /> */}

export default KPI;