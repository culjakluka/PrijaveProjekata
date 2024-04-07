import React from "react";
import { useState, useEffect } from "react";
import ProjectInfoButton from "../ProjectInfoButton/ProjectInfoButton";


// styles
import Style from "./ProjectInfoButtonContainer.module.css";

const ProjectInfoButtonContainer = ({ projectInfoSets, selectProject }) => {
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
      <div className={Style.ProjectInfoContainer}>
        <input
          className={Style.SearchInput}
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Pretraga..."
        />
        {filteredProjectInfoSets?.map((projectInfo) => (
            <ProjectInfoButton
              key={projectInfo._id}
              projectInfo={projectInfo}
              selectProject={selectProject}
            />
        ))}
      </div>
  );
};

export default ProjectInfoButtonContainer;
