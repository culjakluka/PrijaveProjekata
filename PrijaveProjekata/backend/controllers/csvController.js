const { Parser } = require("json2csv");
const { fieldMapping } = require("../config/fieldMapping");

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
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

function jsonToCsv(projectInfo) {
  // Flatten the projectInfo object
  const flattenedData = flattenProjectInfo(projectInfo);

  // Generate CSV string
  let csv = "";
  for (const key in flattenedData) {
    if (flattenedData.hasOwnProperty(key)) {
      const translatedFieldName = fieldMapping[key] || key;
      csv += `${translatedFieldName},${flattenedData[key]}\n`;
    }
    else {
      csv += `${key},${flattenedData[key]}\n`;
    }
  }

  return csv;
}

function flattenProjectInfo(projectInfo) {
  const flattenedData = {};
  
  // Remove unnnecessary fields
  let unnecessaryFields = ["__v", "_id", "userId", "createdAt", "updatedAt", "pdfDocuments", "state", "firstInputMarker", "secondInputMarker"];

  Object.keys(projectInfo).forEach((key) => {
    if (
      unnecessaryFields.includes(key) ||
      projectInfo[key] === undefined ||
      projectInfo[key] === null ||
      projectInfo[key] === ""
    ) {
      delete projectInfo[key]; // Delete the key from projectInfo, not flattenedData
    }
  });

  // Flatten projectInfo using fieldMapping
  for (const key in fieldMapping) {
    if (projectInfo.hasOwnProperty(key)) {
      flattenedData[fieldMapping[key]] = projectInfo[key];
    }
  }

  // Flatten projectTeam if present
  if (projectInfo.projectTeam && Array.isArray(projectInfo.projectTeam)) {
    projectInfo.projectTeam.forEach((member, index) => {
      const memberPrefix = `projektni_tim_${index}_`;
      flattenedData[`${memberPrefix}ime_prezime`] = member.nameSurname;
      flattenedData[`${memberPrefix}email`] = member.email;
      flattenedData[`${memberPrefix}postotak_ovog_projekta`] =
        member.thisProjectPercentage;
      if (member.otherProjects && Array.isArray(member.otherProjects)) {
        member.otherProjects.forEach((project, projectIndex) => {
          const projectPrefix = `${memberPrefix}ostali_projekti_${projectIndex}_`;
          if (project.otherProjectName) {
            flattenedData[`${projectPrefix}ime_projekta`] =
              project.otherProjectName;
          }
          if (project.otherProjectPercentage) {
            flattenedData[`${projectPrefix}postotak_projekta`] =
              project.otherProjectPercentage;
          }
        });
      }
    });
  }

  // Flatten pdfDocuments if present
  if (
    projectInfo.pdfDocuments &&
    projectInfo.pdfDocuments.pdfs &&
    Array.isArray(projectInfo.pdfDocuments.pdfs)
  ) {
    projectInfo.pdfDocuments.pdfs.forEach((pdf, index) => {
      const pdfPrefix = `pdfDocuments_${index}_`;
      if (pdf.filename) {
        flattenedData[`${pdfPrefix}filename`] = pdf.filename;
      }
      if (pdf.filepath) {
        flattenedData[`${pdfPrefix}filepath`] = pdf.filepath;
      }
    });
  }


  return flattenedData;
}


module.exports = {
  convertToCSV,
};
