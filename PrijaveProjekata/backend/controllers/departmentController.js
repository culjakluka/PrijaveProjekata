const DepartmentModel = require('../models/departmentModel');
const mongoose = require('mongoose');

const getDepartments = async (req, res) => {
    try{
        const departments = await DepartmentModel.find();
        res.status(200).json(departments);
    }catch(error){
        console.error("getDepartments error:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

const createDepartment = async (req, res) => {
    const departmentData = req.body;
    const newDepartment = new DepartmentModel(departmentData);
    try{
        await newDepartment.save();
        res.status(200).json(newDepartment);
    }catch(error){
        console.error("createDepartment error:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

const updateDepartment = async (req, res) => {
    const { id } = req.params;
    const departmentData = req.body;
    try{
        const department = await DepartmentModel.findOneAndUpdate(
            { _id: id },
            departmentData,
            { new: true },
        );
        if(!department){
            return res.status(400).json({error: 'No such department.'})
        }
        res.status(200).json(department);
    }
    catch(error){
        console.error("updateDepartment error:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

const deleteDepartment = async (req, res) => {
    const { id } = req.params
    try{
        const department = await DepartmentModel.findOneAndDelete({_id: id});
        if(!department){
            return res.status(400).json({error: 'No such department.'})
        }
        res.status(200).json(department);
    }
    catch(error){
        console.error("deleteDepartment error:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

module.exports = {
    getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
}
