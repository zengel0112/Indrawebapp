// tengisiin heseg
import { PieChart, Pie } from "recharts"
import { useState } from "react"

const Projects = () => {

    const [modal, setModal] = useState({ open: false, project: null });

    const openModal = (i) => {
        setModal({ open: true, project: i });
    }

    return (
        <section className="overflow-x-hidden mx-auto p-4 max-h-screen overflow-y-scroll">
            <h1 className="text-2xl">Projects</h1>
            <hr className="text-slate-500" />

            <h2>Completed Projects</h2>
            <div className="flex flex-nowrap gap-4 overflow-x-auto scroll w-full pb-1 p-4 shadow-2xl snap-proximity snap-x">
                {
                    projects
                        .filter(project => project.completed)
                        .map((project, i) => (
                            <div key={project.id} className="snap-center shadow-[0px_0px_5px_rgba(0,0,0,0.6)] dark:shadow-[0px_0px_3px_rgba(225,225,225,0.7)] p-4 rounded-md min-w-80 min-h-40 cursor-pointer"
                                onClick={() => openModal(project.id)}>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <PieChart width={200} height={200} className="w-full h-full" >
                                    <Pie dataKey="value" animationBegin={200 * i} data={data01} nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label />
                                </PieChart>
                            </div>
                        ))
                }
            </div>

            <h2 className="mt-12">Incomplete Projects</h2>
            <div className="flex flex-nowrap gap-4 overflow-x-auto w-full pb-1 p-4 shadow-2xl snap-proximity snap-x">
                {
                    projects
                        .filter(project => !project.completed)
                        .map((project, i) => (
                            <div key={project.id} className="snap-center shadow-[0px_0px_5px_rgba(0,0,0,0.6)] dark:shadow-[0px_0px_3px_rgba(225,225,225,0.7)] p-4 rounded-md min-w-80 min-h-40 cursor-pointer"
                                onClick={() => openModal(project.id)}>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <PieChart width={200} height={200} className="w-full h-full" >
                                    <Pie dataKey="value" animationBegin={800 + 200 * i} data={data01} nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label />
                                </PieChart>
                            </div>
                        ))
                }
            </div>
            {modal.open && (
                <div className="fixed top-[50%] left-[50%] -translate-[50%] z-50 w-full h-full">
                    <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"></div>
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-dark-bg p-4 z-50">
                        <h1>{projects[modal.project].title}</h1>
                        <p>{projects[modal.project].description}</p>
                        <button onClick={() => setModal({ open: false, project: null })}>Close</button>
                    </div>
                </div>
            )}
        </section>
    )
}

const projects = [{
    id: 1,
    title: 'Project 1',
    description: 'Project Description',
    completed: false,
    members: ['Member 1', 'Member 2', 'Member 3'],
    customers: [{
        name: 'Customer 1',
        contact: 'Contact 1',
        status: 'pending'
    }, {
        name: 'Customer 2',
        contact: 'Contact 2',
        status: 'successful'
    }, {
        name: 'Customer 2',
        contact: 'Contact 2',
        status: 'failed'
    }]
}, {
    id: 2,
    title: 'Project 2',
    description: 'Project Description',
    completed: true,
    members: ['Member 1', 'Member 2', 'Member 3'],
    customers: [{
        name: 'Customer 1',
        contact: 'Contact 1',
        status: 'pending'
    }, {
        name: 'Customer 2',
        contact: 'Contact 2',
        status: 'successful'
    }, {
        name: 'Customer 2',
        contact: 'Contact 2',
        status: 'failed'
    }]
}, {
    id: 3,
    title: 'Project 1',
    description: 'Project Description',
    completed: false,
    members: ['Member 1', 'Member 2', 'Member 3'],
    customers: [{
        name: 'Customer 1',
        contact: 'Contact 1',
        status: 'pending'
    }, {
        name: 'Customer 2',
        contact: 'Contact 2',
        status: 'successful'
    }, {
        name: 'Customer 2',
        contact: 'Contact 2',
        status: 'failed'
    }]
}, {
    id: 4,
    title: 'Project 2',
    description: 'Project Description',
    completed: true,
    members: ['Member 1', 'Member 2', 'Member 3'],
    customers: [{
        name: 'Customer 1',
        contact: 'Contact 1',
        status: 'pending'
    }, {
        name: 'Customer 2',
        contact: 'Contact 2',
        status: 'successful'
    }, {
        name: 'Customer 2',
        contact: 'Contact 2',
        status: 'failed'
    }]
}, {
    id: 5,
    title: 'Project 1',
    description: 'Project Description',
    completed: false,
    members: ['Member 1', 'Member 2', 'Member 3'],
    customers: [{
        name: 'Customer 1',
        contact: 'Contact 1',
        status: 'pending'
    }, {
        name: 'Customer 2',
        contact: 'Contact 2',
        status: 'successful'
    }, {
        name: 'Customer 2',
        contact: 'Contact 2',
        status: 'failed'
    }]
}, {
    id: 6,
    title: 'Project 2',
    description: 'Project Description',
    completed: true,
    members: ['Member 1', 'Member 2', 'Member 3'],
    customers: [{
        name: 'Customer 1',
        contact: 'Contact 1',
        status: 'pending'
    }, {
        name: 'Customer 2',
        contact: 'Contact 2',
        status: 'successful'
    }, {
        name: 'Customer 2',
        contact: 'Contact 2',
        status: 'failed'
    }]
}, {
    id: 7,
    title: 'Project 1',
    description: 'Project Description',
    completed: false,
    members: ['Member 1', 'Member 2', 'Member 3'],
    customers: [{
        name: 'Customer 1',
        contact: 'Contact 1',
        status: 'pending'
    }, {
        name: 'Customer 2',
        contact: 'Contact 2',
        status: 'successful'
    }, {
        name: 'Customer 2',
        contact: 'Contact 2',
        status: 'failed'
    }]
}, {
    id: 8,
    title: 'Project 2',
    description: 'Project Description',
    completed: true,
    members: ['Member 1', 'Member 2', 'Member 3'],
    customers: [{
        name: 'Customer 1',
        contact: 'Contact 1',
        status: 'pending'
    }, {
        name: 'Customer 2',
        contact: 'Contact 2',
        status: 'successful'
    }, {
        name: 'Customer 2',
        contact: 'Contact 2',
        status: 'failed'
    }]
},]

const data01 = [
    {
        "name": "Group A",
        "value": 400
    },
    {
        "name": "Group B",
        "value": 300
    },
    {
        "name": "Group C",
        "value": 300
    },
    {
        "name": "Group D",
        "value": 200
    },
    {
        "name": "Group E",
        "value": 278
    },
    {
        "name": "Group F",
        "value": 189
    }
];

export default Projects