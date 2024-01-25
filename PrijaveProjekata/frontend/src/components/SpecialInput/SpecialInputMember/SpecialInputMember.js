import react, { useEffect, useState } from 'react'
import '../SpecialInput.css'
import SpecialInputProjectContainer from '../SpecialInputProjectContainer/SpecialInputProjectContainer';


const SpecialInputMember = ({addProjectMember}) => {

    const[newItemNameSurname, setNewItemNameSurname] = useState("");
    const[newItemEmail, setNewItemEmail] = useState("");
    const[newItemPercentage, setNewItemPercentage] = useState("");
    const[member, setMember]=useState({});

    // when any of those items changes - newItemNameSurname, newItemEmail, newItemPercentage - memeber updates
    useEffect(() => {
        setMember({
            newItemNameSurname,
            newItemEmail,
            newItemPercentage 
        })
        console.log(member)
    }, [newItemNameSurname, newItemEmail, newItemPercentage])

    const handleChangeName = (e) => {
        setNewItemNameSurname(e.target.value)
    }

    // member is sent somewhere
    const handleAddItem = () => {
        addProjectMember(member);
        
    }

    return (  
        <div>
            <div id="special-input-member-info">
                <input className="special-input-input" placeholder="ime i prezime..." onChange={handleChangeName}></input>
                <input className="special-input-input" placeholder="e-mail..." onChange={setNewItemEmail}></input>
                <input className="special-input-input" placeholder="postotak..." onChange={setNewItemPercentage}></input>
                <SpecialInputProjectContainer/>
                <button onClick={handleAddItem}>ADD MEMBER</button>
            </div>

        </div>
    );
}
 
export default SpecialInputMember;