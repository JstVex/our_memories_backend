const Date = require('../models/dateModel');
const mongoose = require('mongoose');

const getDates = async (req, res) => {
    const date = await Date.find({});

    res.status(200).json(date)
}

const getDate = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such day:(' })
    }

    const day = await Daty.findById(id);

    if (!day) {
        return res.status(404).json({ error: 'no such day:(' })
    }

    res.status(200).json(day)
}


const createDate = async (req, res) => {
    const { date } = req.body;

    let emptyFields = [];

    if (!date) {
        emptyFields.push('date')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'pwease fill in the fields boo boo ^^', emptyFields })
    }

    try {
        const day = await Date.create({ date })
        res.status(200).json(day)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateDate = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such date:(' })
    }

    const day = await Date.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!day) {
        return res.status(404).json({ error: 'no such date:(' })
    }

    res.status(200).json(day);
}

const deleteDate = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such day:(' })
    }

    const day = await Date.findOneAndDelete({ _id: id });

    if (!day) {
        return res.status(404).json({ error: 'no such day:(' })
    }

    res.status(200).json(day)

}


module.exports = { getDates, createDate, updateDate, deleteDate, getDate }