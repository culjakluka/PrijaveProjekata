const ProjectInfoModel = require('../models/projectInfoModel')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs/promises')

const uploadDirectory = 'uploads'; // ruta za upload samog pdf-a

const uploadPdf = async (req, res) => {
    // ... (unchanged)
};

//get all ProjectInfo sets (sorted by time of creation)
const getProjectInfoSets = async (req, res) => {
    const projectInfoSets = await ProjectInfoModel.find({}).sort({createdAt: -1})

    res.status(200).json(projectInfoSets)
}

//get a single ProjectInfo set by id 
const getProjectInfo = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: 'No such ProjectInfo set.'})

    const projectInfoSet = await ProjectInfoModel.findById(id)

    if(!projectInfoSet) return res.status(404).json({error: 'No such ProjectInfo set.'})

    res.status(200).json(projectInfoSet)
}

//create a ProjectInfo set
const createProjectInfoSet = async (req, res) => {
    const fieldsToCheck = [
        'userId', 'nameSurname', 'vocation', 'department', 'email', 'projectTitle',
        'projectAcronym', 'applicationDeadline', 'projectSummary', 'applicationURL',
        'projectApplicant', 'projectPartners', 'totalValue', 'fesbValuePart',
        'newEmploymentBoolean', 'projectTeam', 'mobilePhoneNumber', 'workTimeThisPercetange',
        'workTimeOtherPercetange', 'teamLeaderDisclaimer', 'sourceOfFunding',
        'projectType', 'expectedProjectBeginning', 'expectedProjectDurationInMonths',
        'economicSubjectInvolvement', 'currentPesonnelExpense', 'newPersonnelExpense',
        'equipmentDescriptionAndExpense', 'equipmentAmortizationExpense', 'materialExpense',
        'travelRegistrationEducationExpense', 'expenseDisclaimer', 'partnerExpense',
        'requestedFunding', 'downPayment', 'personalFinancingExpense', 'consultantServices',
        'consultantExpense', 'consultantExpenseSource', 'requiredDocumentationFESB', 'pdfDocuments'
    ];

    const projectData = {};

    let emptyFields = [];

    let pdfs = []

    if (req.files && req.files.length > 0) { // check if pdfs are in the request body
        const uploadPath = path.join(__dirname, '..', uploadDirectory);

        for (const file of req.files) {
            const filename = `${Date.now()}-${file.originalname}`;
            const filepath = path.join(uploadPath, filename);

            await fs.writeFile(filepath, file.buffer)
            // Add PDF information to the array
            pdfs.push({
                filename,
                filepath,
            });
        }
    }

    fieldsToCheck.forEach(field => {
        const value = req.body[field];
        if (!value) {
            emptyFields.push(field);
        } else {
            projectData[field] = value;
        }
    });

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Molimo popunite sva polja', emptyFields });
    }

    // Add doc to the database
    try {
        const projectInfoSet = await ProjectInfoModel.create(projectData);
        res.status(200).json(projectInfoSet);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// delete a ProjectInfo set
const deleteProjectInfoSet = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such ProjectInfo set.'});
    }

    const projectInfoSet = await ProjectInfo.findOneAndDelete({_id: id});

    if(!projectInfoSet){
        return res.status(400).json({error: 'No such ProjectInfo set.'})
    }

    res.status(200).json(projectInfoSet);
}

// update a ProjectInfo set
const updateProjectInfoSet = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such ProjectInfo set.'});
    }

    const projectInfoSet = await ProjectInfoModel.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!projectInfoSet){
        return res.status(400).json({error: 'No such ProjectInfo set.'})
    }

    res.status(200).json(projectInfoSet);
}

module.exports = {
    getProjectInfoSets,
    getProjectInfo,
    createProjectInfoSet,
    deleteProjectInfoSet,
    updateProjectInfoSet
}