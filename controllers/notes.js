const {db} = require('../config/database.js')
const admin = require('../config/firebaseAdmin.js')
const {dateParser, timeParser, noteParser} = require('../middlewares/parser.js')
const dayOfTheWeek = require('../middlewares/dayOfTheWeek.js')
const middleware = require('../middlewares/authenticate.js');


const addNote = async (req, res) => {
    const data = req.body
    let newNote = {}
    // validate request data, parse and add to database
    if(data.date && data.note) {
        parsedDate = dateParser(date)
        parsedTime = timeParser(date)
        parsedNote = noteParser(note)
        if(parsedTime) {
            newNote = {
                date: parsedDate,
                time: parsedTime,
                dayOfTheWeek: dayOfTheWeek(parsedDate.getDay()),
                note: parsedNote,
            }

        }
        else {
            newNote = {
                date: parsedDate,
                dayOfTheWeek: dayOfTheWeek(parsedDate.getDay()),
                note: parsedNote
            }
        }
        db.note.create(newNote).then((result) => {
            res.status(200).json({message:'You added note successfully', data: result})
        }).catch(error => {
            res.status(404).json({message: error.message})
        })
    }
}

const getNotesByUser = async (req, res) => {
    const notes = await db.note.findAll({
        where
    })
    res.status(400).json(notes)
}

const getNotesByUserAndDate = async (req, res) => {
    const notes = await db.note.findAll()
    res.status(400).json(notes)
}

const getNotesByUserAndDateRange = async (req, res) => {
    const notes = await db.note.findAll()
    res.status(400).json(notes)
}

module.exports = {addNote, getNotesByUser, getNotesByUserAndDate, getNotesByUserAndDateRange}