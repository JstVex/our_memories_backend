const Memory = require('../models/memoryModel');
const mongoose = require('mongoose');


//get all memories
const getMemories = async (req, res) => {
    const memories = await Memory.find({});

    res.status(200).json(memories)
}

//get a single memory
const getMemory = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such memory:(' })
    }

    const memory = await Memory.findById(id);

    if (!memory) {
        return res.status(404).json({ error: 'no such memory:(' })
    }

    res.status(200).json(memory)
}

//create new memory
const createMemory = async (req, res) => {
    const { text, note, date, image } = req.body;

    let emptyFields = [];

    if (!text) {
        emptyFields.push('text')
    }
    if (!note) {
        emptyFields.push('note')
    }
    if (!date) {
        emptyFields.push('date')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'pwease fill in the fields boo boo ^^', emptyFields })
    }

    try {
        const memory = await Memory.create({ text, note, date, image })
        res.status(200).json(memory)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete a memory
const deleteMemory = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such memory:(' })
    }

    const memory = await Memory.findOneAndDelete({ _id: id });

    if (!memory) {
        return res.status(404).json({ error: 'no such memory:(' })
    }

    res.status(200).json(memory)

}

//update a memory
const updateMemory = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such memory:(' })
    }

    const memory = await Memory.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!memory) {
        return res.status(404).json({ error: 'no such memory:(' })
    }

    res.status(200).json(memory);
}


module.exports = {
    getMemories,
    getMemory,
    createMemory,
    deleteMemory,
    updateMemory
}