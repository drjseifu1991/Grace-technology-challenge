const { Op } = require('sequelize');
const {db} = require('../config/database.js')
const admin = require('../config/firebaseAdmin.js')
const {dateParser, timeParser, noteParser} = require('../middlewares/parser.js')
const dayOfTheWeek = require('../middlewares/dayOfTheWeek.js')


const addNote = async (req, res) => {
    try {
        const data = req.body
        let newNote = {}

        // validate request data, parse, add to database and send Notification
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
                    userPhone: req.user
                }
    
            }
            else {
                newNote = {
                    date: parsedDate,
                    dayOfTheWeek: dayOfTheWeek(parsedDate.getDay()),
                    note: parsedNote,
                    userPhone: req.user
    
                }
            }
            await db.note.create(newNote)
            const message = {
                notification: {
                  title: 'Note Success',
                  body: 'You are added note successfully',
                }
            }
            await admin.messaging().send(message)
            res.status(200).json({message:'You added note successfully', data: result})
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getNotesByUser = async (req, res) => {
    const notes = await db.note.findAll({
        where: {
            userPhone: req.user
        }
    })
    res.status(400).json(notes)
}

const getNotesByUserAndDate = async (req, res) => {
    date = req.body.date
    const notes = await db.note.findAll({
        where: {
            userPhone: req.user,
            date: date
        }
    })
    res.status(400).json(notes)
}

const getNotesByUserAndDateRange = async (req, res) => {
    const toDate = req.body.toDate
    const fromDate = req.body.fromDate
    const notes = await db.note.findAll( {
        where: {
            date: {[Op.between]: [toDate, fromDate]},
            userPhone: req.user
        }
    })
    res.status(400).json(notes)
}

module.exports = {addNote, getNotesByUser, getNotesByUserAndDate, getNotesByUserAndDateRange}