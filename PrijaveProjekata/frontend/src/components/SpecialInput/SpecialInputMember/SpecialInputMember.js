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

    // member is sent somewhere
    const handleAddItem = () => {
        addProjectMember(member);
        
    }

    return (  
        <div>
            <div id="special-input-member-info">
                <input className="special-input-input" placeholder="ime i prezime..." onChange={(e) => setNewItemNameSurname(e.target.value)}></input>
                <input className="special-input-input" placeholder="e-mail..." onChange={(e) => setNewItemEmail(e.target.value)}></input>
                <input className="special-input-input" placeholder="postotak..." onChange={(e) => setNewItemPercentage(e.target.value)}></input>
                <SpecialInputProjectContainer/>
                <button onClick={handleAddItem}>ADD MEMBER</button>
            </div>

        </div>
    );
}
 
export default SpecialInputMember;