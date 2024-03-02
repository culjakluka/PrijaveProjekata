import {useState, useEffect} from 'react'
import './DropdownMenuInputOther.css'

const DropdownMenuInputOther = ({name, name2, data, setSpecificState}) => {

    const [selectionValue, setSelectionValue] = useState("");
    const [otherSelectionValue, setOtherSelectionValue] = useState("");
    const [options, setOptions] = useState([]);
    const [otherVisibility, setOtherVisibility] = useState(false);   

    const handleSelectionChange = (event) => {
        // using selectedValue beacuse selectionValue
        // is not updated immediately because it is asynchronous
        // thus comparsion that we are doing below says false
        const selectedValue = event.target.value
        setSelectionValue(selectedValue)

        if(selectedValue === "Ostalo (navesti)") {
            setOtherVisibility(true)
        } else {
            setOtherVisibility(false)
        }

        setSpecificState(event.target.value);

        // save selection in sessionStorage
        sessionStorage.setItem(name, event.target.value);
    }
    

    useEffect(() => {
        setOptions([...data, "Ostalo (navesti)"]);

        
        // check if the selection value is stored in storage
        const selectionValueSessionStorage = sessionStorage.getItem(name);

        // check if other selection value is stored in storage
        const otherSelectionValueSessionStorage = sessionStorage.getItem(name2);


        // if it is stored, load it
        if(selectionValueSessionStorage) {
            setSelectionValue(selectionValueSessionStorage);
            setSpecificState(selectionValueSessionStorage)

            // if value of selected value equals 'Ostalo (navesti)', then make visible other options
            if(selectionValueSessionStorage === 'Ostalo (navesti)') {
                setOtherVisibility(true)
                // check if there is something written in storage inside other selection
                if(otherSelectionValueSessionStorage) {
                    setOtherSelectionValue(otherSelectionValueSessionStorage)
                    setSpecificState(otherSelectionValueSessionStorage)
                }
            }
        }

        


    }, [data])


    const updateOtherChoice = (event) => {
        setSpecificState(event.target.value);
        setOtherSelectionValue(event.target.value)
        sessionStorage.setItem(name2, event.target.value)
    }

    return(
        <div className='dropdown-menu-container-other'>
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
                    <input value={otherSelectionValue} type='text' placeholder='navedite ostale izvore financiranja...' onChange={updateOtherChoice}/>
                </div>
            )}
        </div>
    )
}
 
export default DropdownMenuInputOther;