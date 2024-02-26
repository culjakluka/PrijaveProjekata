const express = require('express')

const {
    getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment
} = require('../controllers/departmentController')

const router = express.Router();

// GET departments
router.get('/', getDepartments);

// POST department
router.post('/', createDepartment);

// UPDATE department
router.patch('/:id', updateDepartment);

// DELETE department
router.delete('/:id', deleteDepartment);

module.exports = router
