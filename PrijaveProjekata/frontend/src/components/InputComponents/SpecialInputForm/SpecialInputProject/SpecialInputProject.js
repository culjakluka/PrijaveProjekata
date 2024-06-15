import React, { useEffect, useState } from "react";
import Style from "../SpecialInputFirstInputForm.module.css"; // Replace with the correct path
import { set } from "date-fns";

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
    if (otherProjectName === "" || otherProjectPercentage === "") {
      alert("Niste unijeli sve podatke...");
      return;
    }
    addNewProjectProp(project);
    setOtherProjectName("");
    setOtherProjectPercentage("");
  };

  // part that makes sure that not higher number than 100 is entered - percentage
  const handlePercentageChange = (e) => {
    const value = e.target.value;
    if((value === '' || (value >= 0 && value <= 100)) && value.length <= 3) {
      setOtherProjectPercentage(value)
    }
  }

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
        max="100"
        onChange={handlePercentageChange}
      />%
      <button className={Style.SpecialInputAddProject} onClick={addNewProject}>
        DODAJ
      </button>
    </div>
  );
};

export default SpecialInputProject;
