import React, { useEffect, useState } from 'react';
import Style from '../SpecialInputFirstInputForm.module.css'; // Replace with the correct path

const SpecialInputProject = ({ addNewProjectProp }) => {
  const [otherProjectName, setOtherProjectName] = useState('');
  const [otherProjectPercentage, setOtherProjectPercentage] = useState('');
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
        className={Style.SpecialInputInput}
        placeholder="naziv projekta..."
        onChange={(e) => setOtherProjectName(e.target.value)}
      />
      <input
        value={otherProjectPercentage}
        className={Style.SpecialInputInput}
        placeholder="postotak u projektu..."
        onChange={(e) => setOtherProjectPercentage(e.target.value)}
      />
      <button className={Style.SpecialInputAddProject} onClick={addNewProject}>
        ADD PROJECT
      </button>
    </div>
  );
};

export default SpecialInputProject;