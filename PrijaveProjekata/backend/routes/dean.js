const express = require('express')

const {
    getDean,
    createDean,
    updateDean,
    deleteDean
} = require('../controllers/deanController')

const router = express.Router();

// GET dean
router.get('/', getDean);

// POST dean
router.post('/', createDean);

// UPDATE dean
router.patch('/:id', updateDean);

// DELETE dean
router.delete('/:id', deleteDean);

module.exports = router
