const { fieldMapping } = require("../config/fieldMapping");

const flattenProjectInfo = (projectInfo) => {
  const flattenedData = {};

  // Remove unnnecessary fields
  let unnecessaryFields = [
    "__v",
    "_id",
    "userId",
    "createdAt",
    "updatedAt",
    "pdfDocuments",
    "state",
    "firstInputMarker",
    "secondInputMarker",
  ];

  Object.keys(projectInfo).forEach((key) => {
    if (
      unnecessaryFields.includes(key) ||
      projectInfo[key] === undefined ||
      projectInfo[key] === null ||
      projectInfo[key] === ""
    ) {
      delete projectInfo[key];
    }
  });

  // Flatten projectInfo using fieldMapping
  for (const key in fieldMapping) {
    if (projectInfo.hasOwnProperty(key)) {
      flattenedData[fieldMapping[key]] = projectInfo[key];
    }
  }
  delete flattenedData[fieldMapping["projectTeam"]];

  // Flatten projectTeam
  if (projectInfo.projectTeam && Array.isArray(projectInfo.projectTeam)) {
    projectInfo.projectTeam.forEach((member, index) => {
      const memberPrefix = `Projektni_član_${index}_`;
      flattenedData[`${memberPrefix}Ime_prezime`] = member.nameSurname;
      flattenedData[`${memberPrefix}Email`] = member.email;
      flattenedData[`${memberPrefix}Postotak_ovog_projekta`] =
        member.thisProjectPercentage;
      if (member.otherProjects && Array.isArray(member.otherProjects)) {
        member.otherProjects.forEach((project, projectIndex) => {
          const projectPrefix = `${memberPrefix}Ostali_projekt_${projectIndex}_`;
          if (project.otherProjectName) {
            flattenedData[`${projectPrefix}Ime_projekta`] =
              project.otherProjectName;
          }
          if (project.otherProjectPercentage) {
            flattenedData[`${projectPrefix}Postotak_projekta`] =
              project.otherProjectPercentage;
          }
        });
      }
    });
  }

  // Flatten newEmploymentPositions
  if (
    projectInfo.newEmploymentPositions &&
    Array.isArray(projectInfo.newEmploymentPositions)
  ) {
    projectInfo.newEmploymentPositions.forEach((position, index) => {
      const positionPrefix = `Novo_radno_mjesto_${index}_`;
      flattenedData[`${positionPrefix}Naziv_radnog_mjesta`] =
        position.positionName;
      flattenedData[`${positionPrefix}Placa_radnog_mjesta`] =
        position.positionSalary;
      flattenedData[`${positionPrefix}Postotak_radnog_vremena`] =
        position.positionPercentage;
    });
  }

  return flattenedData;
};

module.exports = { flattenProjectInfo };
