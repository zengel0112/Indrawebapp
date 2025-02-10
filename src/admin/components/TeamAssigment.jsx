import React, { useState } from 'react';

const TeamAssignment = () => {
    const [teamMember, setTeamMember] = useState('');
    const [role, setRole] = useState('');

    const handleAddTeamMember = () => {
        const teamMembers = JSON.parse(localStorage.getItem('teamMembers')) || [];
        teamMembers.push({ name: teamMember, role });
        localStorage.setItem('teamMembers', JSON.stringify(teamMembers));

        setTeamMember('');
        setRole('');
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg mt-4">
            <h2 className="text-xl font-bold mb-4">Team Assignment</h2>
            <input
                type="text"
                placeholder="Team Member Name"
                value={teamMember}
                onChange={(e) => setTeamMember(e.target.value)}
                className="p-2 border rounded w-full mb-2"
            />
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="p-2 border rounded w-full mb-2"
            >
                <option value="">Select Role</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Manager">Manager</option>
            </select>
            <button
                onClick={handleAddTeamMember}
                className="bg-blue-500 text-white py-2 px-4 rounded"
            >
                Add Team Member
            </button>
        </div>
    );
};

export default TeamAssignment;
