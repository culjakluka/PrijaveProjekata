import react from 'react'
import '../SpecialInput.css'
import SpecialInputProjectContainer from '../SpecialInputProjectContainer/SpecialInputProjectContainer';


const SpecialInputMember = () => {
    return (  
        <div>
            <div id="special-input-member-info">
                <input className="special-input-input" placeholder="ime i prezime..."></input>
                <input className="special-input-input" placeholder="e-mail..." ></input>
                <input className="special-input-input" placeholder="postotak..."></input>
            </div>

            <SpecialInputProjectContainer/>

        </div>
    );
}
 
export default SpecialInputMember;