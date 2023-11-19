const FirstDataModel = require('../models/firstDataModel')
const mongoose = require('mongoose');

// get all firstDataSets (sorted by create time)
const getFirstDataSets = async (req, res) => {
    const firstData = await FirstDataModel.find({}).sort({createdAt: -1});

    res.status(200).json(firstData);
}

// get a single firstData set
const getFirstData = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such firstData set'});
    }

    const firstData = await FirstDataModel.findById(id);

    if(!firstData){
        return res.status(404).json({error: 'No such firstData set.'})
    }

    res.status(200).json(firstData);
}

// create a firstData set
const createFirstData = async (req, res) => {
    const {name, age} = req.body;

    // add doc to database
    try{
        const firstData = await FirstDataModel.create({name, age});
        res.status(200).json(firstData);
    } catch(error){
        res.status(400).json({error: error.message});
    }
}

// delete a firstData set
const deleteFirstData = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such firstData set.'});
    }

    const firstData = await FirstDataModel.findOneAndDelete({_id: id});

    if(!firstData){
        return res.status(400).json({error: 'No such firstData set.'})
    }

    res.status(200).json(firstData);
}

// update a firstData set
const updateFirstData = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such firstData set.'});
    }

    const firstData = await FirstDataModel.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!firstData){
        return res.status(400).json({error: 'No such firstData set.'})
    }

    res.status(200).json(firstData);
}

module.exports = {
    createFirstData,
    getFirstDataSets,
    getFirstData,
    deleteFirstData,
    updateFirstData
}