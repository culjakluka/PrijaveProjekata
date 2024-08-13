import React, { useEffect, useState } from "react";
import Style from "../SpecialInputFirstInputForm.module.css"; 
import SpecialInputProjectContainer from "../SpecialInputProjectContainer/SpecialInputProjectContainer";
import CompletedProject from "../../CompletedProject/CompletedProject";

const SpecialInputMember = ({ addProjectMember }) => {
  const [newItemNameSurname, setNewItemNameSurname] = useState("");
  const [newItemEmail, setNewItemEmail] = useState("");
  const [newItemPercentage, setNewItemPercentage] = useState("");
  const [member, setMember] = useState({});
  const [otherProjects, setProjects] = useState([]);

  useEffect(() => {
    setMember({
      nameSurname: newItemNameSurname,
      email: newItemEmail,
      thisProjectPercentage: newItemPercentage,
      otherProjects,
    });
  }, [newItemNameSurname, newItemEmail, newItemPercentage, otherProjects]);

  const addNewMember = () => {
    if (newItemNameSurname === "" || newItemEmail === "" || newItemPercentage === "" || otherProjects.length === 0) {
      alert("Niste unijeli sve podatke...");
      return;
    }
    addProjectMember(member);
    setNewItemNameSurname("");
    setNewItemEmail("");
    setNewItemPercentage("");
    setProjects([]);
  };

  const addNewProject = (newProject) => {
    setProjects((previousMembers) => [...previousMembers, newProject]);
  };

  // part that makes sure that not higher number than 100 is entered - percentage
  const handlePercentageChange = (e) => {
    const value = e.target.value;
    if((value === '' || (value >= 0 && value <= 100)) && value.length <= 3) {
      setNewItemPercentage(value)
    }
  }

  return (
      <div className={Style.SpecialInputMemberInfo}>
        <div className={Style.InputTitle}>Ime i prezime</div>
        <input
          className={Style.SpecialInputTextInput}
          placeholder="ime i prezime..."
          value={newItemNameSurname}
          onChange={(e) => setNewItemNameSurname(e.target.value)}
        />
        <div className={Style.InputTitle}>E-mail</div>
        <input
          className={Style.SpecialInputTextInput}
          placeholder="e-mail..."
          value={newItemEmail}
          onChange={(e) => setNewItemEmail(e.target.value)}
        />
        <div>
        <div className={Style.InputTitle}>Postotak u projektu</div>
        <input
          className={Style.SpecialInputNumberInput}
          placeholder="postotak u projektu..."
          type="number"
          min="0"
          max="100"
          value={newItemPercentage}
          onChange={handlePercentageChange}
        />%
        </div>
        
        
        <SpecialInputProjectContainer addNewProjectProp={addNewProject} />

        {/* LISTA OSTALIH PROJEKATA */}
        <p className={Style.SpecialInputMemberProjectsTitle}>
          OSTALI PROJEKTI:
        </p>
        <div className={Style.SpecialInputMemberProjectsList}>
          {otherProjects.length > 0 ? (
            otherProjects.map((component, index) => (
              <CompletedProject
                key={index}
                name={component.otherProjectName}
                percentage={component.otherProjectPercentage}
              />
            ))
          ) : (
            <p style={{margin:"8px 0px 8px 10px"}}>niste dodali niti jedan projekt ovom članu...</p>
          )}
        </div>

        <button className={Style.SpecialInputAddMember} onClick={addNewMember}>
          DODAJ ČLANA
        </button>
      </div>
  );
};

export default SpecialInputMember;
