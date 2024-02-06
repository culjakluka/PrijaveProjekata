const express = require('express')
const multer = require('multer')

// controller functions
const {
    getProjectInfoSets,
    getProjectInfo,
    createProjectInfoSet,
    deleteProjectInfoSet,
    updateProjectInfoSet
} = require('../controllers/projectInfoController')

const router = express.Router();

//  multer storage
const upload = multer({ storage: multer.memoryStorage()  })

// GET ProjectInfo sets
router.get('/', getProjectInfoSets);

// GET a single ProjectInfo set by id
router.get('/:id', getProjectInfo);

// POST ProjectInfo data
//router.post('/', createProjectInfoSet) stara ruta
router.post('/', createProjectInfoSet);

// DELETE ProjectInfo data by id
router.delete('/:id', deleteProjectInfoSet)

// UPDATE ProjectInfo data by id
router.patch('/:id', upload.array('pdfs', 10), updateProjectInfoSet)

module.exports = router