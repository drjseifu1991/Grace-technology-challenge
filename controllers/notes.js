const { Op } = require('sequelize');
const {db} = require('../config/database.js')
const admin = require('../config/firebaseAdmin.js')
const {parser} = require('../middlewares/parser.js')
const dayOfTheWeek = require('../middlewares/dayOfTheWeek.js')

const addNote = async (req, res) => {
    try {
        const data = req.body.data
        const registrationToken = req.body.registrationToken
        let newNote = {}
        const parsedData = parser(data)
        // validate request data, parse, add to database and send Notification
        if(parsedData.date && parsedData.note) {
            if(parsedData.time) {
                newNote = {
                    date: parsedData.date,
                    time: parsedData.time,
                    dayOfTheWeek: dayOfTheWeek(parsedData.date.getDay()),
                    note: parsedData.note,
                    userUid: req.user
                }
    
            }
            else {
                newNote = {
                    date: parsedData.date,
                    dayOfTheWeek: dayOfTheWeek(parsedData.date.getDay()),
                    note: parsedData.note,
                    userUid: req.user
    
                }
            }
            const note = await db.note.create(newNote)
            const payload = {
                notification: {
                  title: "Note added",
                  body: "You added note successfully"
                }
              };
              const options = {
                priority: "high",
                timeToLive: 60 * 60
              };
            const FirebaseCloudMessaging = await admin.messaging().sendToDevice(registrationToken, payload, options)
            res.status(200).json({message:'You added note successfully', note, FirebaseCloudMessaging })
        }
    } catch (error) {
        res.status(400).json({message: error})
    }
}

const getNotesByUser = async (req, res) => {
    const notes = await db.note.findAll({
        where: {
            userUid: req.user
        }
    })
    res.status(200).json(notes)
}

const getNotesByUserAndDate = async (req, res) => {
    date = new Date(req.params.date)
    console.log(date)
    const notes = await db.note.findAll({
        where: {
            userUid: req.user,
            date: date
        }
    })
    res.status(200).json(notes)
}

const getNotesByUserAndDateRange = async (req, res) => {
    
    const fromDate = new Date(req.query.fromDate)
    const toDate = new Date(req.query.toDate)
    console.log('ggg',req.query)
    
    const notes = await db.note.findAll( {
        where: {
            userUid: req.user,
            date: {[Op.between] : [fromDate , toDate]}
            
        }
    })
    res.status(200).json(notes)
}

module.exports = {addNote, getNotesByUser, getNotesByUserAndDate, getNotesByUserAndDateRange}