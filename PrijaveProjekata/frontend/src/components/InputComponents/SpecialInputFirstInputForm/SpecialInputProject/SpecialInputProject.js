import React, { useEffect, useState } from "react";
import Style from "../SpecialInputFirstInputForm.module.css"; // Replace with the correct path

const SpecialInputProject = ({ addNewProjectProp }) => {
  const [otherProjectName, setOtherProjectName] = useState("");
  const [otherProjectPercentage, setOtherProjectPercentage] = useState("");
  const [project, setProject] = useState({});

  useEffect(() => {
    setProject({
      otherProjectName,
      otherProjectPercentage,
    });
  }, [otherProjectName, otherProjectPercentage]);

  const addNewProject = () => {
    addNewProjectProp(project);
  };

  return (
    <div className={Style.SpecialInputMemberProjectsProject}>
      <input
        value={otherProjectName}
        className={Style.SpecialInputTextInput}
        placeholder="naziv projekta..."
        onChange={(e) => setOtherProjectName(e.target.value)}
      />
      <input
        value={otherProjectPercentage}
        className={Style.SpecialInputNumberInput}
        placeholder="postotak u projektu..."
        type="number"
        onChange={(e) => setOtherProjectPercentage(e.target.value)}
      />
      <button className={Style.SpecialInputAddProject} onClick={addNewProject}>
        DODAJ PROJEKT
      </button>
    </div>
  );
};

export default SpecialInputProject;
