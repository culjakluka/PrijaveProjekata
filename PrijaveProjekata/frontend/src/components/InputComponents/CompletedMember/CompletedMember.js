import React, { useContext, useEffect, useState } from "react";
import Style from "../SpecialInputFirstInputForm/SpecialInputFirstInputForm.module.css";
import { SpecialInputContext } from "../SpecialInput/SpecialInputContext";
import CompletedProject from "../../InputComponents/CompletedProject/CompletedProject";

const CompletedMember = ({
  memberIndex,
  fullName,
  email,
  percent,
  projectsArray,
  deleteSingleMember,
}) => {
  const [nameSurname, setNameSurname] = useState("");
  const [eMail, setEMail] = useState("");
  const [percentage, setPercentage] = useState("");
  const [projects, setProjects] = useState([]);
  const [memberId, setMemberId] = useState("");

  const { projectMembers, setProjectMembers } = useContext(SpecialInputContext);

  useEffect(() => {
    setNameSurname(fullName);
    setEMail(email);
    setPercentage(percent);
    setProjects(projectsArray);
    setMemberId(memberIndex);
  }, [fullName, email, percent, projects]);

  const handleDeleteMember = () => {
    deleteSingleMember(memberId);
  };

  return (
    <div id={Style.CompletedMemberContainer}>
      <div id={Style.CompletedMemberPersonalDetails}>
        <span className={Style.CompletedMemberData}>{nameSurname}</span>
        <span className={Style.CompletedMemberData}>{eMail}</span>
        <span className={Style.CompletedMemberData}>{percentage}</span>
        <button className={Style.DeleteMember} onClick={handleDeleteMember}>X</button>
      </div>
      <div id={Style.completedMemberProjects}>
        {projects.length > 0 ? (
          projects.map((project, index) => {
            return (
              <CompletedProject
                key={index}
                name={project.otherProjectName}
                percentage={project.otherProjectPercentage}
              />
            );
          })
        ) : (
          <p> Nema projekata za ovog člana </p>
        )}
      </div>

      
    </div>
  );
};

export default CompletedMember;
