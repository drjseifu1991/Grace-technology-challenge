const express = require('express')
const { addNote, getNotesByUser, getNotesByUserAndDate, getNotesByUserAndDateRange } = require('../controllers/notes')
const authenticationMiddleware = require('../middlewares/authenticate');

const router = express.Router()

router.post('/add', authenticationMiddleware, addNote)
router.get('/notes', authenticationMiddleware, getNotesByUser)
router.get('/notes/:date',authenticationMiddleware, getNotesByUserAndDate)
router.get('/notesByRange/', authenticationMiddleware, getNotesByUserAndDateRange)

module.exports = router