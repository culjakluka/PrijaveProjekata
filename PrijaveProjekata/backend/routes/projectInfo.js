const express = require("express");
const multer = require("multer");
require("express-async-errors"); // Add this line

// controller functions
const {
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
} = require("../controllers/projectInfoController");

const router = express.Router();

//  multer storage
const upload = multer({ dest: "uploads/" });

// GET ProjectInfo sets
router.get("/", getProjectInfoSets);

// GET a single ProjectInfo set by id
router.get("/:id", getProjectInfo);

// POST ProjectInfo data
router.post("/", createProjectInfoSet);

// DELETE ProjectInfo data by id
router.delete("/:id", deleteProjectInfoSet);

// APPROVE firstFormSubmit data by id
router.patch("/approveFirstFormSubmit/:id", approveFirstFormSubmit);

// APPROVE secondFormSubmit data by id
router.patch("/approveSecondFormSubmit/:id", approveSecondFormSubmit);

// REJECT ProjectInfo data by id
router.patch("/rejectProject/:id", rejectProjectInfoSet);

// for testing purposes
router.patch("/submitFirstForm/:id", submitFirstForm);

// for testing purposes
router.patch("/submitSecondForm/:id", submitSecondForm);

// ADMIN UPDATE ProjectInfo data by id
router.patch("/adminUpdate/:id", adminUpdateProjectInfoSet);

// UPDATE ProjectInfo data by id
router.patch(
  "/:id",
  upload.fields([{ name: "pdfDocuments", maxCount: 10 }]),
  updateProjectInfoSet
);

module.exports = router;
