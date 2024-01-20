const express = require('express')

// controller functions
const {
    getProjectInfoSets,
    getProjectInfo,
    createProjectInfoSet,
    deleteProjectInfoSet,
    updateProjectInfoSet
} = require('../controllers/projectInfoController')

const router = express.Router();

// GET ProjectInfo sets
router.get('/', getProjectInfoSets);

// GET a single ProjectInfo set by id
router.get('/:id', getProjectInfo);

// POST ProjectInfo data
router.post('/', createProjectInfoSet)

// DELETE ProjectInfo data by id
router.delete('/:id', deleteProjectInfoSet)

// UPDATE ProjectInfo data by id
router.patch('/:id', updateProjectInfoSet)

module.exports = router