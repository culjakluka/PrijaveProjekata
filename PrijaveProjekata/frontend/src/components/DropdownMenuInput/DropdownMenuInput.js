import React, {useEffect, useState} from 'react'

const DropdownMenuInput = ({label, data}) => {

    const[selectionValue, setSelectionValue] = useState("");
    const[options, setOptions] = useState(data);


    const handleSelectionChange = (event) => {
        setSelectionValue(event.target.value)
    }

    return(
        <div className='dropdown-menu-container'>
            <select value={selectionValue} onChange={handleSelectionChange}>
                <option value="">Select an option</option>
                {data.map(
                    // takes all the data from "data" and maps it
                    // (data that we can take of each memeber of data) => (html element and us of data's data)
                    (options, index) => (<option key={index} value={options}>{options}</option>)
                )}
            </select>
            {selectionValue && <p>You selected: {selectionValue}</p>}
        </div>
    )
}

export default DropdownMenuInput