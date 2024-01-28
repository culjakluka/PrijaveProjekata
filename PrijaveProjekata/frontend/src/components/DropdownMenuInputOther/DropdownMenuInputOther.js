import {useState, useEffect} from 'react'

const DropdownMenuInputOther = ({data}) => {

    const [selectionValue, setSelectionValue] = useState("");
    const [options, setOptions] = useState([]);
    const [otherVisibility, setOtherVisibility] = useState(false);   

    const handleSelectionChange = (event) => {
        // using selectedValue beacuse selectionValue
        // is not updated immediately because it is asynchronous
        // thus check that we are checking below says false
        const selectedValue = event.target.value
        setSelectionValue(selectedValue)

        if(selectedValue === "Ostalo (navesti)") {
            setOtherVisibility(true)
        }
    }
    

    useEffect(() => {
        setOptions([...data, "Ostalo (navesti)"]);
    }, [data])

    return(
        <div className='dropdown-menu-container'>
            <div className/>
            <select value={selectionValue} onChange={handleSelectionChange}>
                <option value="">Select an option</option>
                {options.map(
                    // takes all the data from "data" and maps it
                    // (data that we can take of each memeber of data) => (html element and us of data's data)
                    (member, index) => (<option key={index} value={member}>{member}</option>)
                )}
            </select>
    
            {otherVisibility && (
                <div> 
                    <p>Navedite ostale izvore financiranja</p>    
                    <input type='text' placeholder='navedite ostale izvore financiranja...'/>
                </div>
            )}
        </div>
    )
}
 
export default DropdownMenuInputOther;