const { Parser } = require("json2csv");
const { fieldMapping } = require("../config/fieldMapping");
const ProjectInfoFlattener = require("../services/projectInfoFlattener");

const convertToCSV = async (req, res) => {
  try {
    const projectInfo = req.body; // Assuming req.body contains the projectInfo object
    const csv = jsonToCsv(projectInfo);

    const filename = `${encodeURIComponent(projectInfo.projectAcronym)}.csv`; // Encode projectTitle

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${filename}.csv`
    );
    res.send(Buffer.from("\uFEFF" + csv, "utf-8"));
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

function jsonToCsv(projectInfo) {
  // Flatten the projectInfo object
  const flattenedData = ProjectInfoFlattener.flattenProjectInfo(projectInfo);

  // Generate CSV string
  let csv = "";
  for (const key in flattenedData) {
    if (flattenedData.hasOwnProperty(key)) {
      const translatedFieldName = fieldMapping[key] || key;
      csv += `${translatedFieldName},${flattenedData[key]}\n`;
    } else {
      csv += `${key},${flattenedData[key]}\n`;
    }
  }

  return csv;
}

function flattenProjectInfo(projectInfo) {
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
      const memberPrefix = `Projektni_tim_${index}_`;
      flattenedData[`${memberPrefix}Ime_prezime`] = member.nameSurname;
      flattenedData[`${memberPrefix}Email`] = member.email;
      flattenedData[`${memberPrefix}Postotak_ovog_projekta`] =
        member.thisProjectPercentage;
      if (member.otherProjects && Array.isArray(member.otherProjects)) {
        member.otherProjects.forEach((project, projectIndex) => {
          const projectPrefix = `${memberPrefix}Ostali_projekti_${projectIndex}_`;
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
      const positionPrefix = `Nova_radna_mjesta_${index}_`;
      flattenedData[`${positionPrefix}Naziv_radnog_mjesta`] =
        position.positionName;
      flattenedData[`${positionPrefix}Placa_radnog_mjesta`] =
        position.positionSalary;
      flattenedData[`${positionPrefix}Postotak_radnog_vremena`] =
        position.positionPercentage;
    });
  }

  return flattenedData;
}

module.exports = {
  convertToCSV,
  flattenProjectInfo,
};
