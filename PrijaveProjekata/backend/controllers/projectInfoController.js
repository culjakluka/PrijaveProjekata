require("dotenv").config();

const ProjectInfoModel = require("../models/projectInfoModel");
const Dean = require("../models/deanModel");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs/promises");
const EmailService = require("../services/emailService");
const ProjectInfoToPDFService = require("../services/projectInfoToPDFService");

const defaultEmail = process.env.DEFAULT_EMAIL;

const uploadDirectory = "uploads"; // ruta za upload samog pdf-a

//get all ProjectInfo sets (sorted by time of creation)
const getProjectInfoSets = async (req, res) => {
  const projectInfoSets = await ProjectInfoModel.find({}).sort({
    createdAt: -1,
  });

  res.status(200).json(projectInfoSets);
};

//get a single ProjectInfo set by id
const getProjectInfo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No such ProjectInfo set." });

  const projectInfoSet = await ProjectInfoModel.findById(id);

  if (!projectInfoSet)
    return res.status(404).json({ error: "No such ProjectInfo set." });

  res.status(200).json(projectInfoSet);
};

//create a ProjectInfo set (submit prve forme)
const createProjectInfoSet = async (req, res) => {
  let fieldsToCheck;

  if (req.body.firstInputMarker && !req.body.secondInputMarker) {
    fieldsToCheck = [
      "userId",
      "firstInputMarker",
      "nameSurname",
      "vocation",
      "department",
      "email",
      "projectTitle",
      "projectAcronym",
      "applicationDeadline",
      "projectSummary",
      "applicationURL",
      "projectApplicant",
      "projectPartners",
      "totalValue",
      "fesbValuePart",
      "newEmploymentBoolean",
      "projectTeam",
    ];
  }

  const projectData = {};

  let emptyFields = [];

  fieldsToCheck.forEach((field) => {
    const value =
      field === "newEmploymentBoolean" ? req.files : req.body[field];
    if (field === "newEmploymentBoolean") {
      const newEmploymentBoolean = JSON.parse(req.body.newEmploymentBoolean);
      if (newEmploymentBoolean === null) {
        emptyFields.push(field);
      } else {
        projectData[field] = newEmploymentBoolean;
      }
    } else if (!value) {
      emptyFields.push(field);
    } else {
      projectData[field] = value;
      console.log("Field okay: [", field, "]");
    }
  });

  if (emptyFields.length > 0) {
    return res.status(400).json({
      emptyFields,
    });
  }

  // Add doc to the database
  try {
    let infoPDF = ProjectInfoToPDFService.generateProjectInfoPDF(projectData);
    projectData.state = "firstFormSubmitted";
    const projectInfoSet = await ProjectInfoModel.create(projectData);
    console.log(projectData);

    EmailService.sendEmail(
      [defaultEmail],
      "Project form submitted",
      "A new project form has been submitted.",
      infoPDF
    );
    res.status(200).json(projectInfoSet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a ProjectInfo set
const deleteProjectInfoSet = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such ProjectInfo set." });
  }

  const projectInfoSet = await ProjectInfoModel.findOneAndDelete({ _id: id });

  if (!projectInfoSet) {
    return res.status(400).json({ error: "No such ProjectInfo set." });
  }

  res.status(200).json(projectInfoSet);
};

// submit first form by id
const submitFirstForm = async (req, res) => {
  const { id } = req.params;
  const projectData = {};
  projectData["state"] = "firstFormSubmitted";
  projectData["firstInputMarker"] = true;
  projectData["secondInputMarker"] = false;

  try {
    const projectInfoSet = await ProjectInfoModel.findOneAndUpdate(
      { _id: id },
      projectData,
      { new: true }
    );
    if (!projectInfoSet) {
      return res.status(400).json({ error: "No such ProjectInfo set." });
    }

    res.status(200).json(projectInfoSet);
  } catch (error) {
    console.error("findOneAndUpdate error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// submit second form by id
const submitSecondForm = async (req, res) => {
  const { id } = req.params;
  const projectData = {};
  projectData["state"] = "secondFormSubmitted";
  projectData["firstInputMarker"] = true;
  projectData["secondInputMarker"] = true;

  try {
    const projectInfoSet = await ProjectInfoModel.findOneAndUpdate(
      { _id: id },
      projectData,
      { new: true }
    );
    if (!projectInfoSet) {
      return res.status(400).json({ error: "No such ProjectInfo set." });
    }

    res.status(200).json(projectInfoSet);
  } catch (error) {
    console.error("findOneAndUpdate error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// approve firstFormSubmit data by id
const approveFirstFormSubmit = async (req, res) => {
  const { id } = req.params;
  const projectData = {};
  projectData["state"] = "firstFormApproved";
  projectData["firstInputMarker"] = true;
  projectData["secondInputMarker"] = false;

  try {
    const projectInfoSet = await ProjectInfoModel.findOneAndUpdate(
      { _id: id },
      projectData,
      { new: true }
    );
    if (!projectInfoSet) {
      return res.status(400).json({ error: "No such ProjectInfo set." });
    }
    EmailService.sendEmail(
      [defaultEmail, projectInfoSet.email],
      "Project application approved",
      "Your project application has been approved."
    );
    res.status(200).json(projectInfoSet);
  } catch (error) {
    console.error("findOneAndUpdate error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// approve secondFormSubmit data by id
const approveSecondFormSubmit = async (req, res) => {
  const { id } = req.params;
  const projectData = {};
  projectData["state"] = "secondFormApproved";
  projectData["firstInputMarker"] = true;
  projectData["secondInputMarker"] = true;

  try {
    const dean = await Dean.findOne();
    const projectInfoSet = await ProjectInfoModel.findOneAndUpdate(
      { _id: id },
      projectData,
      { new: true }
    );
    if (!projectInfoSet) {
      return res.status(400).json({ error: "No such ProjectInfo set." });
    }
    EmailService.sendEmail(
      [defaultEmail, dean.email, projectInfoSet.email],
      "Project application approved",
      "Your project application has been approved."
    );
    res.status(200).json(projectInfoSet);
  } catch (error) {
    console.error("findOneAndUpdate error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const rejectProjectInfoSet = async (req, res) => {
  const { id } = req.params;
  const projectData = {};
  projectData["state"] = "projectRejected";

  try {
    const projectInfoSet = await ProjectInfoModel.findOneAndUpdate(
      { _id: id },
      projectData,
      { new: true }
    );
    if (!projectInfoSet) {
      return res.status(400).json({ error: "No such ProjectInfo set." });
    }
    EmailService.sendEmail(
      [defaultEmail, projectInfoSet.email],
      "Project application rejected",
      "Your project application has been rejected."
    );
    res.status(200).json(projectInfoSet);
  } catch (error) {
    console.error("findOneAndUpdate error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const adminUpdateProjectInfoSet = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedData = {};
    let updatedFields = [];
    Object.keys(req.body).forEach((key) => {
      updatedFields.push(key);
      updatedData[key] = req.body[key];
    });
    if (updatedFields.length === 0) {
      return res.status(400).json({ error: "No fields to update." });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such ProjectInfo set." });
    }
    const projectInfoSet = await ProjectInfoModel.findOneAndUpdate(
      { _id: id },
      updatedData,
      { new: true } // za vratit updateani dokument
    );
    if (!projectInfoSet) {
      return res.status(400).json({ error: "No such ProjectInfo set." });
    }
    EmailService.sendEmail(
      [defaultEmail, projectInfoSet.email],
      "Project form updated",
      "A project form has been updated."
    );
    res.status(200).json(projectInfoSet + updatedFields);
  } catch (error) {
    console.error("adminUpdateProjectInfoSet error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// update a ProjectInfo set (submit druge forme)
const updateProjectInfoSet = async (req, res) => {
  const { id } = req.params;

  try {
    const projectData = {};
    let fieldsToCheck = [];
    let pdfs = [];
    let emptyFields = [];
    const pdfDocuments = req.files.pdfDocuments;

    projectData["state"] = "secondFormSubmitted";

    if (req.body.secondInputMarker) {
      fieldsToCheck = [
        "userId",
        "secondInputMarker",
        "nameSurname",
        "vocation",
        "department",
        "email",
        "projectTitle",
        "projectAcronym",
        "applicationDeadline",
        "projectSummary",
        "applicationURL",
        "projectApplicant",
        "projectPartners",
        "totalValue",
        "fesbValuePart",
        "newEmploymentBoolean",
        "newEmploymentPositions",
        "mobilePhoneNumber",
        "workTimeThisPercentage",
        "workTimeOtherPercentage",
        "projectTeam",
        "teamLeaderNote",
        "sourceOfFunding",
        "projectType",
        "expectedProjectBeginning",
        "expectedProjectDurationInMonths",
        "economicSubjectInvolvement",
        "currentPersonnelExpense",
        "newPersonnelExpense",
        "equipmentDescriptionAndExpense",
        "equipmentAmortizationExpense",
        "otherServicesExpense",
        "materialExpense",
        "travelRegistrationEducationExpense",
        "expenseNote",
        "partnerExpense",
        "requestedFunding",
        "downPayment",
        "personalFinancingExpense",
        "consultantServices",
        "requiredDocumentationFESB",
      ];
    }

    if (req.body.consultantServices === "true") {
      fieldsToCheck.push("consultantExpense");
      fieldsToCheck.push("consultantExpenseSource");
    }

    // neizravni troskovi
    if (req.body.indirectExpensesManualInput === "true") {
      fieldsToCheck.push("indirectExpenses");
    } else {
      projectData["indirectExpenses"] = 0.15 * req.body.fesbValuePart;
    }

    if (req.files.pdfDocuments && req.files.pdfDocuments.length > 0) {
      const uploadPath = path.join(__dirname, "..", uploadDirectory);
      for (const file of pdfDocuments) {
        const filename = file.originalname;
        const filepath = path.join(uploadPath, file.filename);

        pdfs.push({
          filename,
          filepath,
        });
      }
      projectData.pdfDocuments = pdfs;
    }

    fieldsToCheck.forEach((field) => {
      const value = field === "pdfDocuments" ? req.files : req.body[field];
      if (field === "projectTeam") {
        const projectTeam = JSON.parse(req.body.projectTeam);
        projectData[field] = projectTeam;
      } else if (!value) {
        emptyFields.push(field);
      } else {
        projectData[field] = value;
      }
    });

    if (emptyFields.length > 0) {
      return res.status(400).json({ emptyFields });
    }

    console.log(req.params.id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such ProjectInfo set." });
    }

    const projectInfoSet = await ProjectInfoModel.findOneAndUpdate(
      { _id: id },
      projectData,
      { new: true } // za vratit updateani dokument
    );

    if (!projectInfoSet) {
      return res.status(400).json({ error: "No such ProjectInfo set." });
    }
    let infoPDF = ProjectInfoToPDFService.generateProjectInfoPDF(projectData);
    EmailService.sendEmail(
      [defaultEmail],
      "Project form submitted",
      "A new project form has been submitted.",
      infoPDF
    );
    res.status(200).json(projectInfoSet);
  } catch (error) {
    console.error("findOneAndUpdate error:", error);
    if (req.files.pdfDocuments.length > 0) {
      req.files.pdfDocuments.forEach(async (pdf) => {
        await fs.unlink(path.join(__dirname, "..", pdf.path));
      });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getProjectInfoSets,
  getProjectInfo,
  createProjectInfoSet,
  deleteProjectInfoSet,
  approveFirstFormSubmit,
  approveSecondFormSubmit,
  rejectProjectInfoSet,
  adminUpdateProjectInfoSet,
  updateProjectInfoSet,
  submitFirstForm,
  submitSecondForm,
};
