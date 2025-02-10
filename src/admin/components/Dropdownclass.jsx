import React, { useState } from 'react';

const DropdownClass = () => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleDropdownChange = (event) => {
        setSelectedValue(event.target.value);
        console.log('Selected value:', event.target.value);
    };

    return (
        <div>
            <select id="class" value={selectedValue} onChange={handleDropdownChange}>
                <option value="">Ангиа сонгоно уу</option>
                <option value="Sw24-2">SW24-2</option>
                <option value="Sw24-1">SW24-1</option>
                <option value="GD">GD</option>
                <option value="DM">DM</option>
            </select>
        </div>
    );
};

export default DropdownClass;
