import React from "react";
import styles from './SpecialInput.css'

const SpecialInput = () => {
    let label="NAVEDITE SVE ČLANOVE..."

    return (
        <div className="special-input-container">
            <p className="special-input-label">{label}</p>

            <div id="special-input-member-info">
                <input className="special-input-input" placeholder="ime i prezime..."></input>
                <input className="special-input-input" placeholder="e-mail..."></input>
                <input className="special-input-input" placeholder="postotak..."></input>
            </div>
            <div id="special-input-member-projects">
                <p id="other-project-title">Ostali projekti</p>
                <div id="special-input-member-projects-project">
                    <input className="special-input-input" placeholder="naziv projekta..."></input>
                    <input className="special-input-input" placeholder="postotak u projektu..."></input>
                    <button>X</button>
                    <button>Dodaj projekt</button>
                </div>
            </div>
            <button>Dodaj novog clana</button>
        </div>
      );
}
 
export default SpecialInput;