const express = require('express');
const {
    createMemory,
    getMemories,
    getMemory,
    deleteMemory,
    updateMemory
} = require('../controllers/memoryController')


const router = express();

//get all memories
router.get('/', getMemories)


//get a single memory
router.get('/:id', getMemory)


//post a new memory
router.post('/', createMemory)


// delete a memory
router.delete('/:id', deleteMemory)


//update a memory
router.patch('/:id', updateMemory)


module.exports = router;