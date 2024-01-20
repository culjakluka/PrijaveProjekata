const ProjectInfoModel = require('../models/projectInfoModel')
const mongoose = require('mongoose')

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
    /*const { 
        userId,
        nameSurname,
        vocation,
        department,
        email,
        projectTitle,
        projectAcronym,
        applicationDeadline,
        projectSummary,
        applicationURL,
        projectApplicant,
        projectPartners,
        totalValue,
        fesbValuePart,
        newEmploymentBoolean,
        projectTeam,
        mobilePhoneNumber,
        workTimeThisPercetange,
        workTimeOtherPercetange,
        teamLeaderDisclaimer,
        sourceOfFunding,
        projectType,
        expectedProjectBeginning,
        expectedProjectDurationInMonths,
        economicSubjectInvolvement,
        currentPesonnelExpense,
        newPersonnelExpense,
        equipmentDescriptionAndExpense,
        equipmentAmortizationExpense,
        materialExpense,
        travelRegistrationEducationExpense,
        expenseDisclaimer,
        partnerExpense,
        requestedFunding,
        downPayment,
        personalFinancingExpense,
        consultantServices,
        requiredDocumentationFESB
    } = req.body

    let emptyFields = []

    if(!userId) {
        emptyFields.push('userId')
    }
    if(!nameSurname) {
        emptyFields.push('nameSurname')
    }
    if(!vocation) {
        emptyFields.push('vocation')
    }
    if(!department) {
        emptyFields.push('department')
    }
    if(!email) {
        emptyFields.push('email')
    }
    if(!projectTitle) {
        emptyFields.push('projectTitle')
    }
    if(!projectAcronym) {
        emptyFields.push('projectAcronym')
    }
    if(!applicationDeadline) {
        emptyFields.push('applicationDeadline')
    }
    if(!projectSummary) {
        emptyFields.push('projectSummary')
    }
    if(!applicationURL) {
        emptyFields.push('applicationURL')
    }
    if(!projectApplicant) {
        emptyFields.push('projectApplicant')
    }
    if(!projectPartners) {
        emptyFields.push('projectPartners')
    }
    if(!totalValue) {
        emptyFields.push('totalValue')
    }
    if(!fesbValuePart) {
        emptyFields.push('fesbValuePart')
    }
    if(!newEmploymentBoolean) {
        emptyFields.push('newEmploymentBoolean')
    }
    if(!projectTeam) {
        emptyFields.push('projectTeam')
    }
    if(!mobilePhoneNumber){
        emptyFields.push('mobilePhoneNumber')
    }
    if(!workTimeThisPercetange){
        emptyFields.push('workTimeThisPercetange')
    }
    if(!workTimeOtherPercetange){
        emptyFields.push('workTimeOtherPercetange')
    }
    if(!teamLeaderDisclaimer){
        emptyFields.push('teamLeaderDisclaimer')
    }
    if(!sourceOfFunding){
        emptyFields.push('sourceOfFunding')
    }
    if(!projectType){
        emptyFields.push('projectType')
    }
    if(!expectedProjectBeginning){
        emptyFields.push('expectedProjectBeginning')
    }
    if(!expectedProjectDurationInMonths){
        emptyFields.push('expectedProjectDurationInMonths')
    }
    if(!economicSubjectInvolvement){
        emptyFields.push('economicSubjectInvolvement')
    }
    if(!currentPesonnelExpense){
        emptyFields.push('currentPesonnelExpense')
    }
    if(!newPersonnelExpense){
        emptyFields.push('newPersonnelExpense')
    }
    if(!equipmentDescriptionAndExpense){
        emptyFields.push('equipmentDescriptionAndExpense')
    }
    if(!equipmentAmortizationExpense){
        emptyFields.push('equipmentAmortizationExpense')
    }
    if(!materialExpense){
        emptyFields.push('materialExpense')
    }
    if(!travelRegistrationEducationExpense){
        emptyFields.push('travelRegistrationEducationExpense')
    }
    if(!expenseDisclaimer){
        emptyFields.push('expenseDisclaimer')
    }
    if(!partnerExpense){
        emptyFields.push('partnerExpense')
    }
    if(!requestedFunding){
        emptyFields.push('requestedFunding')
    }
    if(!downPayment){
        emptyFields.push('downPayment')
    }
    if(!personalFinancingExpense){
        emptyFields.push('personalFinancingExpense')
    }
    if(!consultantServices){
        emptyFields.push('consultantServices')
    }
    if(!requiredDocumentationFESB){
        emptyFields.push('requiredDocumentationFESB')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Molimo popunite sva polja', emptyFields })
    }

    //add doc to database
    try {
        const projectInfoSet = await ProjectInfoModel.create({
            userId,
            nameSurname,
            vocation,
            department,
            email,
            projectTitle,
            projectAcronym,
            applicationDeadline,
            projectSummary,
            applicationURL,
            projectApplicant,
            projectPartners,
            totalValue,
            fesbValuePart,
            newEmploymentBoolean,
            projectTeam,
            mobilePhoneNumber,
            workTimeThisPercetange,
            workTimeOtherPercetange,
            teamLeaderDisclaimer,
            sourceOfFunding,
            projectType,
            expectedProjectBeginning,
            expectedProjectDurationInMonths,
            economicSubjectInvolvement,
            currentPesonnelExpense,
            newPersonnelExpense,
            equipmentDescriptionAndExpense,
            equipmentAmortizationExpense,
            materialExpense,
            travelRegistrationEducationExpense,
            expenseDisclaimer,
            partnerExpense,
            requestedFunding,
            downPayment,
            personalFinancingExpense,
            consultantServices,
            requiredDocumentationFESB
        })
        res.status(200).json(projectInfoSet)
    } catch (error) {
        res.status(400).json({error: error.message})
    }*/
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
        'consultantExpense', 'consultantExpenseSource', 'requiredDocumentationFESB'
    ];

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