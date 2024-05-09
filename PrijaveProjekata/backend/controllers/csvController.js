const { Parser } = require("json2csv");

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
      csv += `${key},${flattenedData[key]}\n`; // Append field name and value separated by comma
    }
  }

  return csv;
}

function flattenProjectInfo(projectInfo) {
  const flattenedData = {
    userId: projectInfo.userId,
    firstInputMarker: projectInfo.firstInputMarker,
    secondInputMarker: projectInfo.secondInputMarker,
    nameSurname: projectInfo.nameSurname,
    vocation: projectInfo.vocation,
    department: projectInfo.department,
    email: projectInfo.email,
    projectTitle: projectInfo.projectTitle,
    projectAcronym: projectInfo.projectAcronym,
    applicationDeadline: projectInfo.applicationDeadline,
    projectSummary: projectInfo.projectSummary,
    applicationURL: projectInfo.applicationURL,
    projectApplicant: projectInfo.projectApplicant,
    projectPartners: projectInfo.projectPartners,
    totalValue: projectInfo.totalValue,
    fesbValuePart: projectInfo.fesbValuePart,
    newEmploymentBoolean: projectInfo.newEmploymentBoolean,
    mobilePhoneNumber: projectInfo.mobilePhoneNumber,
    workTimeThisPercentage: projectInfo.workTimeThisPercentage,
    workTimeOtherPercentage: projectInfo.workTimeOtherPercentage,
    teamLeaderNote: projectInfo.teamLeaderNote,
    sourceOfFunding: projectInfo.sourceOfFunding,
    projectType: projectInfo.projectType,
    expectedProjectBeginning: projectInfo.expectedProjectBeginning,
    expectedProjectDurationInMonths:
      projectInfo.expectedProjectDurationInMonths,
    economicSubjectInvolvement: projectInfo.economicSubjectInvolvement,
    currentPesonnelExpense: projectInfo.currentPesonnelExpense,
    newPersonnelExpense: projectInfo.newPersonnelExpense,
    equipmentDescriptionAndExpense: projectInfo.equipmentDescriptionAndExpense,
    equipmentAmortizationExpense: projectInfo.equipmentAmortizationExpense,
    otherServicesExpense: projectInfo.otherServicesExpense,
    materialExpense: projectInfo.materialExpense,
    travelRegistrationEducationExpense:
      projectInfo.travelRegistrationEducationExpense,
    expenseNote: projectInfo.expenseNote,
    partnerExpense: projectInfo.partnerExpense,
    requestedFunding: projectInfo.requestedFunding,
    downPayment: projectInfo.downPayment,
    personalFinancingExpense: projectInfo.personalFinancingExpense,
    consultantServices: projectInfo.consultantServices,
    consultantExpense: projectInfo.consultantExpense,
    consultantExpenseSource: projectInfo.consultantExpenseSource,
    requiredDocumentationFESB: projectInfo.requiredDocumentationFESB,
    state: projectInfo.state,
  };

  // Flatten projectTeam if present
  if (projectInfo.projectTeam && Array.isArray(projectInfo.projectTeam)) {
    projectInfo.projectTeam.forEach((member, index) => {
      const memberPrefix = `projectTeam_${index}_`;
      flattenedData[`${memberPrefix}nameSurname`] = member.nameSurname;
      flattenedData[`${memberPrefix}email`] = member.email;
      flattenedData[`${memberPrefix}thisProjectPercentage`] =
        member.thisProjectPercentage;
      if (member.otherProjects && Array.isArray(member.otherProjects)) {
        member.otherProjects.forEach((project, projectIndex) => {
          const projectPrefix = `${memberPrefix}otherProjects_${projectIndex}_`;
          if (project.otherProjectName) {
            flattenedData[`${projectPrefix}otherProjectName`] =
              project.otherProjectName;
          }
          if (project.otherProjectPercentage) {
            flattenedData[`${projectPrefix}otherProjectPercentage`] =
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

  // Remove empty fields
  Object.keys(flattenedData).forEach((key) => {
    if (
      flattenedData[key] === undefined ||
      flattenedData[key] === null ||
      flattenedData[key] === ""
    ) {
      delete flattenedData[key];
    }
  });

  return flattenedData;
}

module.exports = {
  convertToCSV,
};
