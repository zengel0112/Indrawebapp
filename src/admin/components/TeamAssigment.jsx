import { useState } from 'react'

const TeamAssignment = () => {
    const [teamMember, setTeamMember] = useState('')
    const [role, setRole] = useState('')

    const handleAddTeamMember = () => {
        const teamMembers =
            JSON.parse(localStorage.getItem('teamMembers')) || []
        teamMembers.push({ name: teamMember, role })
        localStorage.setItem('teamMembers', JSON.stringify(teamMembers))

        setTeamMember('')
        setRole('')
    }

    return (
        <div className="bg-light-bg dark:bg-dark-elevation mt-[40px] rounded-lg p-4 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Гишүүн нэмэх</h2>
            <div className="flex-col justify-start">
                <input
                    type="text"
                    placeholder="Нэмэх гишүүний нэр"
                    value={teamMember}
                    onChange={(e) => setTeamMember(e.target.value)}
                    className="dark:bg-dark-bg mb-2 w-[300px] rounded border p-2"
                />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="dark:bg-dark-bg mb-2 ml-[30px] w-[300px] rounded border p-2"
                >
                    <option value="">Үүрэг</option>
                    <option value="Борлуулагч">Борлуулагч</option>
                    <option value="Менежер">Менежер</option>
                </select>
                <br />
                <button
                    onClick={handleAddTeamMember}
                    className="bg-light-blue dark:bg-dark-blue ml-[210px] rounded px-4 py-2 text-white"
                >
                    гишүүн нэмэх
                </button>
            </div>
        </div>
    )
}

export default TeamAssignment
