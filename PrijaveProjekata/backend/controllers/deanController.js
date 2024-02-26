const DeanModel = require('../models/deanModel');
const mongoose = require('mongoose');

const getDean = async (req, res) => {
    try{
        const dean = await DeanModel.find();
        res.status(200).json(dean);
    }catch(error){
        console.error("getDean error:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

const createDean = async (req, res) => {
    const deanData = req.body;
    const newDean = new DeanModel(deanData);
    try{
        await newDean.save();
        res.status(200).json(newDean);
    }catch(error){
        console.error("createDean error:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

const updateDean = async (req, res) => {
    const { id } = req.params;
    const deanData = req.body;
    try{
        const dean = await DeanModel.findOneAndUpdate(
            { _id: id },
            deanData,
            { new: true },
        );
        if(!dean){
            return res.status(400).json({error: 'No such dean.'})
        }
        res.status(200).json(dean);
    }
    catch(error){
        console.error("updateDean error:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

const deleteDean = async (req, res) => {
    const { id } = req.params
    try{
        const dean = await DeanModel.findOneAndDelete({_id: id});
        if(!dean){
            return res.status(400).json({error: 'No such dean.'})
        }
        res.status(200).json(dean);
    }
    catch(error){
        console.error("deleteDean error:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

module.exports = {
    getDean,
    createDean,
    updateDean,
    deleteDean
}