import React from "react";
import "./ProjectInfoButtonContainer.css";
import { useState, useEffect } from "react";
import ProjectInfoButton from "../ProjectInfoButton/ProjectInfoButton";

//
const ProjectInfoContainer = ({ projectInfoSets, selectProject }) => {
  const [projectInfos, setProjectInfos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjectInfoSets = projectInfoSets?.filter(
    (component) =>
      component.nameSurname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.projectTitle
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      component.projectAcronym.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    setProjectInfos(projectInfoSets);
  }, [projectInfoSets]);

  return (
    <>
      <input
        className="search"
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Pretraga..."
      />
      {filteredProjectInfoSets?.map((projectInfo) => (
        <div className="project-info-button-container">
          <ProjectInfoButton
            key={projectInfo._id}
            projectInfo={projectInfo}
            selectProject={selectProject}
          />
        </div>
      ))}
    </>
  );
};

export default ProjectInfoContainer;
