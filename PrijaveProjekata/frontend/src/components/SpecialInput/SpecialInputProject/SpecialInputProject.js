import react from 'react'
import '../SpecialInput.css'

const SpecialInputProject = (addNewProject) => {

    return (
        <div id="special-input-member-projects-project">
            <input className="special-input-input" placeholder="naziv projekta..."></input>
            <input className="special-input-input" placeholder="postotak u projektu..."></input>
            <button>ADD PROJECT</button>
        </div>
    );
}
 
export default SpecialInputProject;