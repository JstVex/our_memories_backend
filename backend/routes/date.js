const express = require('express');
const { getDates, getDate, createDate, updateDate, deleteDate } = require('../controllers/dateController');

const router = express();

router.get('/', getDates);
router.get('/:id', getDate)
router.post('/', createDate);
router.delete('/:id', deleteDate);
router.patch('/:id', updateDate);

module.exports = router;