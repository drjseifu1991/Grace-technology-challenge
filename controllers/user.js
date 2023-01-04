const admin = require('../config/firebaseAdmin.js')
const {db} = require('../config/database.js')


const signup = async (req, res) => {

    try {
        const {firstName, middleName, lastName, phoneNumber, address, registrationToken} = req.body

        if(firstName && middleName && lastName && phoneNumber && address, registrationToken) {
          
          // Add user to mysql database
          const user = await db.user.create({
              firstName: firstName,
              middleName: middleName,
              lastName: lastName,
              phone: phoneNumber,
              address: address,
              uid: req.user
            }, { fields: ['firstName','middleName','lastName','phone','address','uid'] })
          const todayNote = await db.note.findAll({
            where: {
                userUid: req.user,
                date: new Date()
            }
          })
          let FirebaseCloudMessaging = 'You do not have note with today date'
          if(todayNote.length!==0) {
            const payload = {
              notification: {
                title: "Note added",
                body: "You added note successfully"
              },
              data: {
                todayNote: JSON.stringify(todayNote)
              }
            };
            const options = {
              priority: "high",
              timeToLive: 60 * 60
            };
            FirebaseCloudMessaging = await admin.messaging().sendToDevice(registrationToken, payload, options)
          }
          res.status(200).json({
            message: 'You are successfull', user, FirebaseCloudMessaging
          })
      } 
    }
    catch (error) {
        res.status(404).json({message: error.message})
    }
}

const login = async (req, res) => {
  const registrationToken = req.body.registrationToken
  const todayNote = await db.note.findAll({
    where: {
        userUid: req.user,
        date: new Date()
    }
  })
  let FirebaseCloudMessaging = 'You do not have note with today date'
  if(todayNote.length!==0) {
    const payload = {
      notification: {
        title: "Note added",
        body: "You added note successfully"
      },
      data: {
        todayNote: JSON.stringify(todayNote)
      }
    };
    const options = {
      priority: "high",
      timeToLive: 60 * 60
    };
    FirebaseCloudMessaging = await admin.messaging().sendToDevice(registrationToken, payload, options)
  }
  res.status(200).json({
    message: 'You are successfull LoggedIn', userId: req.user, FirebaseCloudMessaging
  })      
}

module.exports = {signup, login}