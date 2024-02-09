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
    let fieldsToCheck

    console.log(req.body)

    if(req.body.firstInputMarker && !req.body.secondInputMarker){
        fieldsToCheck = [
            'userId', 'firstInputMarker', 'secondInputMarker', 'nameSurname', 'vocation', 'department', 'email', 'projectTitle',
            'projectAcronym', 'applicationDeadline', 'projectSummary', 'applicationURL',
            'projectApplicant', 'projectPartners', 'totalValue', 'fesbValuePart',
            'newEmploymentBoolean', 'projectTeam',
        ] 
    }   

    const projectData = {};

    let emptyFields = [];

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
        console.log(projectData)
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
    
    try {
        const projectData = {}
        let fieldsToCheck = []
        let pdfs = []
        let emptyFields = []
        const pdfDocuments = req.files.pdfDocuments
        console.log(req.headers);
        console.log("req.body: ")
        console.log(req.body)

        if(req.body.secondInputMarker){
            fieldsToCheck = [
                'userId', 'secondInputMarker', 'nameSurname', 'vocation', 'department', 'email', 'projectTitle',
                'projectAcronym', 'applicationDeadline', 'projectSummary', 'applicationURL',
                'projectApplicant', 'projectPartners', 'totalValue', 'fesbValuePart',
                'newEmploymentBoolean', 'projectTeam', 'mobilePhoneNumber', 'workTimeThisPercentage',
                'workTimeOtherPercentage', 'teamLeaderDisclaimer', 'sourceOfFunding',
                'projectType', 'expectedProjectBeginning', 'expectedProjectDurationInMonths',
                'economicSubjectInvolvement', 'currentPesonnelExpense', 'newPersonnelExpense',
                'equipmentDescriptionAndExpense', 'equipmentAmortizationExpense', 'otherServicesExpense', 'materialExpense',
                'travelRegistrationEducationExpense', 'expenseDisclaimer', 'partnerExpense',
                'requestedFunding', 'downPayment', 'personalFinancingExpense', 'consultantServices',
                'consultantExpense', 'consultantExpenseSource', 'requiredDocumentationFESB'
            ];
        }

        if (req.files.pdfDocuments && req.files.pdfDocuments.length > 0) { // check if pdfs are in the request body
            console.log("entered function")
            const uploadPath = path.join(__dirname, '..', uploadDirectory);
            for (const file of pdfDocuments) {
                // const filename = `${Date.now()}-${file.name}`;
                const filename = file.name
                const filepath = path.join(uploadPath, filename)

                await fs.writeFile(filepath, file.buffer)
                // Add PDF information to the array
                pdfs.push({
                    filename,
                    filepath,
                });
            }
            projectData.pdfDocuments = pdfs;
        }
        // check for empty fields
        // fieldsToCheck.forEach(field => {
        //     const value = req.body[field];
        //     if (!value) {
        //         emptyFields.push(field);
        //     } else {
        //         projectData[field] = value;
        //     }
        // });

        fieldsToCheck.forEach(field => {
            const value = field === 'pdfDocuments' ? req.files : req.body[field];
            if (!value) {
                emptyFields.push(field);
            } else {
                projectData[field] = value;
            }
        });

        console.log('projectData:', projectData);

        if (emptyFields.length > 0) {
            return res.status(400).json({ error: 'Molimo popunite sva polja', emptyFields });
        }

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No such ProjectInfo set.'});
        }
    
        const projectInfoSet = await ProjectInfoModel.findOneAndUpdate(
            { _id: id },
            projectData,
            { new: true } // To return the updated document
        );

        if(!projectInfoSet){
            return res.status(400).json({error: 'No such ProjectInfo set.'});
        }

        res.status(200).json(projectInfoSet);
    } catch (error) {
        if (pdfs.length > 0) {
            pdfs.forEach(async (pdf) => {
                await fs.unlink(pdf.filepath);
            });
        }
        console.error("Update error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    getProjectInfoSets,
    getProjectInfo,
    createProjectInfoSet,
    deleteProjectInfoSet,
    updateProjectInfoSet
}