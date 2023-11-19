const express = require('express');
const {
    createFirstData,
    getFirstDataSets,
    getFirstData,
    deleteFirstData,
    updateFirstData
} = require('../controllers/firstDataController')

const router = express.Router();

// GET first submit data
router.get('/', getFirstDataSets);

// GET a single firstData set
router.get('/:id', getFirstData);

// POST first submit data
router.post('/', createFirstData)

// DELETE first submit data
router.delete('/:id', deleteFirstData)

// UPDATE first submit data
router.patch('/:id', updateFirstData)

module.exports = router