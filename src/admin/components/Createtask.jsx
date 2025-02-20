import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const CreateTask = ({ onAddTask }) => {
    const [taskName, setTaskName] = useState('')
    const [className, setClassName] = useState('')
    const [goal, setGoal] = useState('')
    const [deadline, setDeadline] = useState('')
    const [description, setDescription] = useState('')
    const [newClass, setNewClass] = useState('')
    const [classOptions, setClassOptions] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        const savedClasses = JSON.parse(localStorage.getItem('classes')) || []
        setClassOptions(savedClasses)
    }, [])

    const validateForm = () => {
        const newErrors = {}
        if (!taskName.trim()) newErrors.taskName = 'Төслийн нэр шаардлагатай'
        if (!className.trim()) newErrors.className = 'Анги сонгох шаардлагатай'
        if (!goal.trim()) newErrors.goal = 'Зорилт шаардлагатай'
        if (!deadline.trim()) newErrors.deadline = 'Эцсийн хугацаа шаардлагатай'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleAddClass = () => {
        const normalizedClass = newClass.trim().toLowerCase()
        if (
            newClass.trim() &&
            !classOptions.some((c) => c.toLowerCase() === normalizedClass)
        ) {
            const updatedClasses = [...classOptions, newClass.trim()]
            setClassOptions(updatedClasses)
            localStorage.setItem('classes', JSON.stringify(updatedClasses))
            setNewClass('')
        }
    }

    const handleDeleteClass = (classToDelete) => {
        const updatedClasses = classOptions.filter((c) => c !== classToDelete)
        setClassOptions(updatedClasses)
        localStorage.setItem('classes', JSON.stringify(updatedClasses))
    }

    const handleSubmit = () => {
        if (!validateForm()) return

        const newTask = {
            id: Date.now(),
            taskName: taskName.trim(),
            className: className.trim(),
            goal: Number(goal),
            deadline,
            description: description.trim(),
        }

        const tasks = JSON.parse(localStorage.getItem('tasks')) || []
        localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]))
        onAddTask(newTask)

        // Reset form
        setTaskName('')
        setClassName('')
        setGoal('')
        setDeadline('')
        setDescription('')
        setErrors({})
    }

    const handleModalBackgroundClick = (e) => {
        if (e.target === e.currentTarget) handleCloseModal()
    }

    return (
        <div className="dark:bg-dark-elevation mx-auto mb-10 w-full rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
            <h2 className="mb-3 text-center text-lg font-semibold dark:text-white">
                Төсөл үүсгэх
            </h2>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-4 justify-center items-center">
                <div>
                    <select
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        className={`w-full rounded border p-2 text-sm dark:bg-gray-700 dark:text-white ${
                            errors.className ? 'border-red-500' : ''
                        }`}
                    >
                        <option value="">Анги сонгох</option>
                        {classOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    {errors.className && (
                        <p className="text-xs text-red-500">
                            {errors.className}
                        </p>
                    )}
                </div>

                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Шинэ анги"
                        value={newClass}
                        onChange={(e) => setNewClass(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddClass()}
                        className="w-full rounded border p-2 text-sm dark:bg-gray-700 dark:text-white"
                    />
                    <button
                        type="button"
                        onClick={handleAddClass}
                        className="rounded bg-green-500 px-3 py-2 text-sm text-white hover:bg-green-600"
                    >
                        +
                    </button>
                </div>

                <div>
                    <input
                        type="number"
                        placeholder="Goal"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        className={`w-full rounded border p-2 text-sm dark:bg-gray-700 dark:text-white ${
                            errors.goal ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.goal && (
                        <p className="text-xs text-red-500">{errors.goal}</p>
                    )}
                </div>
                <div>
                    <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className={`w-full rounded border p-2 text-sm dark:bg-gray-700 dark:text-white ${
                            errors.deadline ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.deadline && (
                        <p className="text-xs text-red-500">
                            {errors.deadline}
                        </p>
                    )}
                </div>
            </div>

            <textarea
                placeholder="Тайлбар"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-3 mb-2 h-24 w-full rounded border p-2 text-sm dark:bg-gray-700 dark:text-white"
            ></textarea>

            <button
                type="button"
                onClick={handleSubmit}
                className="dark:bg-dark-blue mt-2 w-full rounded bg-blue-500 px-4 py-2 text-sm text-white transition hover:bg-blue-600"
            >
                Төсөл үүсгэх
            </button>

            <div className="mt-4">
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="text-blue-500 hover:underline dark:text-blue-400"
                >
                    Ангийн жагсаалтыг харах
                </button>
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-gray-100/50 dark:bg-gray-700/50"
                    onClick={handleModalBackgroundClick}
                >
                    <div className="w-96 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                        <h3 className="mb-4 text-lg font-semibold dark:text-white">
                            Ангийн нэрс
                        </h3>
                        <ul className="max-h-64 overflow-y-auto">
                            {classOptions.map((classItem) => (
                                <li
                                    key={classItem}
                                    className="mb-2 flex justify-between rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-700"
                                >
                                    <span className="dark:text-white">
                                        {classItem}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDeleteClass(classItem)
                                        }
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        X
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-700"
                        >
                            Хаах
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

CreateTask.propTypes = {
    onAddTask: PropTypes.func.isRequired,
}

export default CreateTask
