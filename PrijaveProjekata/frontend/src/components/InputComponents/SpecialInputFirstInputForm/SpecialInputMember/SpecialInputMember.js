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
    addProjectMember(member);
  };

  const addNewProject = (newProject) => {
    setProjects((previousMembers) => [...previousMembers, newProject]);
  };

  return (
      <div className={Style.SpecialInputMemberInfo}>
        <input
          className={Style.SpecialInputTextInput}
          placeholder="ime i prezime..."
          onChange={(e) => setNewItemNameSurname(e.target.value)}
        />
        <input
          className={Style.SpecialInputTextInput}
          placeholder="e-mail..."
          onChange={(e) => setNewItemEmail(e.target.value)}
        />
        <input
          className={Style.SpecialInputNumberInput}
          placeholder="postotak..."
          type="number"
          onChange={(e) => setNewItemPercentage(e.target.value)}
        />
        
        
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
            <p style={{marginLeft:"10px"}}>niste dodali niti jedan projekt ovom članu...</p>
          )}
        </div>

        <button className={Style.SpecialInputAddMember} onClick={addNewMember}>
          DODAJ ČLANA
        </button>
      </div>
  );
};

export default SpecialInputMember;
