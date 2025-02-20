import React, { useState } from 'react'

const TodoApp = () => {
    const [tasks, setTasks] = useState([])
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        date: new Date().toISOString().split('T')[0],
        status: '',
        flow: '',           // Added flow field
        phone: '',
        callCount: '',      // Added callCount field
        class: '',
        info: ''
    })
    const [editId, setEditId] = useState(null)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (editId !== null) {
            setTasks(
                tasks.map((task) =>
                    task.id === editId ? { ...formData, id: editId } : task
                )
            )
            setEditId(null)
        } else {
            setTasks([...tasks, { ...formData, id: Date.now() }])
        }

        setFormData({
            lastName: '',
            firstName: '',
            date: new Date().toISOString().split('T')[0],
            status: '',
            flow: '',
            phone: '',
            callCount: '',
            class: '',
            info: '',
        })
    }

    const handleEdit = (task) => {
        setFormData(task)
        setEditId(task.id)
    }

    const handleDelete = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 pl-14">
            <div className="">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-blue-500">
                        Tasks
                    </h1>
                    <button
                        onClick={() => {
                            setEditId(null)
                            setFormData({
                                lastName: '',
                                firstName: '',
                                date: '',
                                status: '',
                                flow: '',
                                phone: '',
                                callCount: '',
                                class: '',
                                info: '',
                            })
                            document
                                .getElementById('addForm')
                                .classList.toggle('hidden')
                        }}
                        className="bg-light-blue cursor-pointer rounded px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-500"
                    >
                        {editId ? 'Засах горимоос гарах' : 'Нэмэх '}
                    </button>
                </div>

                {/* Нэмэх / Засах форм */}
                <form
                    id="addForm"
                    onSubmit={handleSubmit}
                    className="mb-6 hidden rounded-lg bg-slate-200 p-4 dark:bg-gray-800"
                >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <input
                            placeholder="Овог"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full rounded bg-white p-2 text-sm text-black placeholder:text-slate-500 dark:bg-gray-700 dark:text-white md:text-base"
                        />
                        <input
                            placeholder="Нэр"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full rounded bg-white p-2 text-sm text-black placeholder:text-slate-500 dark:bg-gray-700 dark:text-white md:text-base"
                        />
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="w-full rounded bg-white p-2 text-sm text-black placeholder:text-slate-500 dark:bg-gray-700 dark:text-white md:text-base"
                        />
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full rounded bg-white p-2 text-sm text-black placeholder:text-slate-500 dark:bg-gray-700 dark:text-white md:text-base"
                        >
                            <option value="">Төлөв сонгох</option>
                            <option value="Амжилттай">Амжилттай</option>
                            <option value="Хүлээгдэж буй">Хүлээгдэж буй</option>
                            <option value="Буцаалт">Буцаалт</option>
                        </select>
                        <select
                            name="flow"
                            value={formData.flow}
                            onChange={handleInputChange}
                            className="w-full rounded bg-white p-2 text-sm text-black placeholder:text-slate-500 dark:bg-gray-700 dark:text-white md:text-base"
                        >
                            <option value="">Урсгал сонгох</option>
                            <option value="flow1">Урсгал 1</option>
                            <option value="flow2">Урсгал 2</option>
                        </select>
                        <input
                            placeholder="Утасны дугаар"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full rounded bg-white p-2 text-sm text-black placeholder:text-slate-500 dark:bg-gray-700 dark:text-white md:text-base"
                        />
                        <input
                            placeholder="Ярьсан тоо"
                            name="callCount"
                            type="number"
                            value={formData.callCount}
                            onChange={handleInputChange}
                            className="w-full rounded bg-white p-2 text-sm text-black placeholder:text-slate-500 dark:bg-gray-700 dark:text-white md:text-base"
                        />
                        <input
                            placeholder="Анги"
                            name="class"
                            value={formData.class}
                            onChange={handleInputChange}
                            className="w-full rounded bg-white p-2 text-sm text-black placeholder:text-slate-500 dark:bg-gray-700 dark:text-white md:text-base"
                        />
                        <textarea
                            placeholder="Мэдээлэл"
                            name="info"
                            value={formData.info}
                            onChange={handleInputChange}
                            className="col-span-full rounded bg-white p-2 text-sm text-black placeholder:text-slate-500 dark:bg-gray-700 dark:text-white md:text-base"
                            rows="3"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="mt-4 w-full bg-light-blue rounded hover:bg-blue-600 dark:bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600 sm:w-auto md:text-base"
                    >
                        {editId ? 'Засах' : 'Хадгалах'}
                    </button>
                </form>

                {/* Хүснэгт */}
                <div className="overflow-x-auto rounded-lg bg-slate-200 dark:bg-gray-800">
                    <table className="w-full">
                        <thead className="">
                            <tr>
                                <th className="text-light-blue p-4 text-left dark:text-blue-400">
                                    Овог
                                </th>
                                <th className="text-light-blue p-4 text-left dark:text-blue-400">
                                    Нэр
                                </th>
                                <th className="text-light-blue p-4 text-left dark:text-blue-400">
                                    Огноо
                                </th>
                                <th className="text-light-blue p-4 text-left dark:text-blue-400">
                                    Төлөв
                                </th>
                                <th className="text-light-blue p-4 text-left dark:text-blue-400">
                                    Урсгал
                                </th>
                                <th className="text-light-blue p-4 text-left dark:text-blue-400">
                                    Утасны дугаар
                                </th>
                                <th className="text-light-blue p-4 text-left dark:text-blue-400">
                                    Ярьсан тоо
                                </th>
                                <th className="text-light-blue p-4 text-left dark:text-blue-400">
                                    Анги
                                </th>
                                <th className="text-light-blue p-4 text-left dark:text-blue-400">
                                    Мэдээлэл
                                </th>
                                <th className="text-light-blue p-4 text-left dark:text-blue-400">
                                    Үйлдэл
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task) => (
                                <tr
                                    key={task.id}
                                    className="border-b border-gray-700 bg-white text-black dark:bg-gray-800 dark:text-white"
                                >
                                    <td className="p-4">{task.lastName}</td>
                                    <td className="p-4">{task.firstName}</td>
                                    <td className="p-4">{task.date}</td>
                                    <td className="">
                                        <div
                                            className={`h- rounded p-1 text-center sm:text-xs lg:text-base ${
                                                task.status === 'Амжилттай'
                                                    ? 'bg-green-500 text-white'
                                                    : task.status ===
                                                        'Хүлээгдэж буй'
                                                      ? 'bg-yellow-500 text-white'
                                                      : task.status ===
                                                          'Буцаалт'
                                                        ? 'bg-red-500 text-white'
                                                        : 'bg-gray-800 text-white'
                                            }`}
                                        >
                                            {task.status}
                                        </div>
                                    </td>
                                    <td className="p-4">{task.flow}</td>
                                    <td className="p-4">{task.phone}</td>
                                    <td className="p-4">{task.callCount}</td>
                                    <td className="p-4">{task.class}</td>
                                    <td className="max-w-[200px] overflow-x-scroll p-4 text-wrap">
                                        {task.info}
                                    </td>
                                    <td className="flex space-x-2 p-4">
                                        <button
                                            className="cursor-pointer rounded bg-slate-200 px-3 py-1 text-green-500 hover:text-green-300 dark:bg-gray-700"
                                            onClick={() => handleEdit(task)}
                                        >
                                            Засах
                                        </button>
                                        <button
                                            className="cursor-pointer rounded bg-slate-200 px-3 py-1 text-red-500 hover:text-red-300 dark:bg-gray-700"
                                            onClick={() =>
                                                handleDelete(task.id)
                                            }
                                        >
                                            Устгах
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TodoApp
