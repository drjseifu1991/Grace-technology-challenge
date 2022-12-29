const express = require('express')
const { addNote, getNotesByUser, getNotesByUserAndDate, getNotesByUserAndDateRange } = require('../controllers/notes')
const authenticationMiddleware = require('../middlewares/authenticate');

const router = express.Router()

router.post('/add', authenticationMiddleware, addNote)
router.get('/notes/:user', authenticationMiddleware, getNotesByUser)
router.get('/notes/:user&date:', authenticationMiddleware, getNotesByUserAndDate)
router.get('/notes/user:&date-rang:', authenticationMiddleware, getNotesByUserAndDateRange)

module.exports = router