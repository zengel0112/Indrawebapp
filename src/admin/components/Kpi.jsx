import React, { useState, useEffect } from 'react'

const KPI = ({ onAddTask }) => {
    const [selectedClass, setSelectedClass] = useState('')
    const [points, setPoints] = useState('')
    const [bonusRates, setBonusRates] = useState({
        starter: '',
        second: '',
        last: '',
    })
    const [targets, setTargets] = useState({
        starterTargetMax: '',
        secondTargetMax: '',
    })
    const [classOptions, setClassOptions] = useState([])

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || []
        const uniqueClasses = [
            ...new Set(storedTasks.map((task) => task.className)),
        ]
        setClassOptions(uniqueClasses)
    }, [])

    const calculateKPI = () => {
        const totalBonus =
            (bonusRates.starter / 100) * points +
            (bonusRates.second / 100) * points +
            (bonusRates.last / 100) * points

        const targetAchieved =
            (targets.starterTargetMax + targets.secondTargetMax) / 2

        return { totalBonus, targetAchieved }
    }

    const handleAddTask = () => {
        if (
            !selectedClass ||
            !points ||
            !targets.starterTargetMax ||
            !targets.secondTargetMax
        ) {
            alert('Та бүх талбарыг бөглөнө үү!')
            return
        }

        const newTask = {
            id: Date.now(),
            className: selectedClass,
            points: parseFloat(points),
            bonusRates: {
                starter: parseFloat(bonusRates.starter),
                second: parseFloat(bonusRates.second),
                last: parseFloat(bonusRates.last),
            },
            targets: {
                starterTargetMax: parseFloat(targets.starterTargetMax),
                secondTargetMax: parseFloat(targets.secondTargetMax),
            },
        }

        const updatedTasks = JSON.parse(localStorage.getItem('tasks')) || []
        updatedTasks.push(newTask)
        localStorage.setItem('tasks', JSON.stringify(updatedTasks))

        if (!classOptions.includes(selectedClass)) {
            setClassOptions([...classOptions, selectedClass])
        }

        onAddTask(newTask)

        setSelectedClass('')
        setPoints('')
        setBonusRates({ starter: '', second: '', last: '' })
        setTargets({ starterTargetMax: '', secondTargetMax: '' })
    }

    const { totalBonus, targetAchieved } = calculateKPI()

    return (
        <div className="mx-auto max-w-full rounded-lg bg-gray-100 p-6 shadow-lg dark:bg-gray-800">
            <h2 className="mb-4 text-center text-2xl font-bold">
                📌 KPI Тооцоолол
            </h2>

            <div className="grid grid-cols-2 gap-4">
                <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full rounded-md border bg-white p-2"
                >
                    <option value="">Ангийг сонгоно уу</option>
                    {classOptions.map((className, index) => (
                        <option key={index} value={className}>
                            {className}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Оноо"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    className="w-full rounded-md border p-2"
                />

                <input
                    type="number"
                    placeholder="Эхлэх дүн"
                    value={bonusRates.starter}
                    onChange={(e) =>
                        setBonusRates({
                            ...bonusRates,
                            starter: e.target.value,
                        })
                    }
                    className="w-full rounded-md border p-2"
                />
                <input
                    type="number"
                    placeholder="GOAL 1"
                    value={targets.starterTargetMax}
                    onChange={(e) =>
                        setTargets({
                            ...targets,
                            starterTargetMax: e.target.value,
                        })
                    }
                    className="w-full rounded-md border p-2"
                />

                <input
                    type="number"
                    placeholder="GOAL 1-ийн нэмэгдэл"
                    value={bonusRates.second}
                    onChange={(e) =>
                        setBonusRates({ ...bonusRates, second: e.target.value })
                    }
                    className="w-full rounded-md border p-2"
                />
                <input
                    type="number"
                    placeholder="GOAL 2"
                    value={targets.secondTargetMax}
                    onChange={(e) =>
                        setTargets({
                            ...targets,
                            secondTargetMax: e.target.value,
                        })
                    }
                    className="w-full rounded-md border p-2"
                />

                <input
                    type="number"
                    placeholder="GOAL 2-ийн нэмэгдэл"
                    value={bonusRates.last}
                    onChange={(e) =>
                        setBonusRates({ ...bonusRates, last: e.target.value })
                    }
                    className="col-span-2 w-full rounded-md border p-2"
                />
            </div>

            <div className="mt-6 rounded-md bg-white p-4 shadow-md dark:bg-gray-700">
                <h3 className="text-lg font-semibold">KPI Тооцоолол</h3>
                <p>
                    <strong>Бонусын дүн:</strong> {totalBonus.toFixed(2)} points
                </p>
                <p>
                    <strong>Хүрэх зорилт:</strong> {targetAchieved.toFixed(2)}{' '}
                    points
                </p>
            </div>

            <button
                onClick={handleAddTask}
                className="mt-6 w-full rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700"
            >
                Төсөл үүсгэх
            </button>
        </div>
    )
}

export default KPI
