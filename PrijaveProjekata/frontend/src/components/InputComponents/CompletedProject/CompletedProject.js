import React, { useState, useEffect } from "react";

const styles = {
  completedProjectContainer: {
    display: "flex",
    flexDirection: "row",
    borderRadius: "3px",
  },
  completedProjectMemberData: {
    marginLeft: "5px",
  }
};

const CompletedProject = ({ name, percentage }) => {
  const [projectName, setProjectName] = useState('');
  const [projectPercentage, setProjectPercentage] = useState('');

  // Load data from props into state after the component mounts
  useEffect(() => {
    setProjectName(name);
    setProjectPercentage(percentage);
  }, [name, percentage]);

  return (
    <div style={styles.completedProjectContainer}>
      <span style={styles.completedProjectMemberData}>{projectName}</span>
      <span style={styles.completedProjectMemberData}>{projectPercentage}%</span>
    </div>
  );
}

export default CompletedProject;
