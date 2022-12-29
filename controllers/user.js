const admin = require('../config/firebaseAdmin.js')
const {db} = require('../config/database.js')


const signup = async (req, res) => {
  try {
    const {firstName, middleName, lastName, phone, address} = req.body

    if(firstName && middleName && lastName && phone && address) {
      
      // Add user to firebase for authentication
      const authenticatedUser = await admin.auth().createUser({ uid: phone})
      const user = await db.user.create({
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          phone: phone,
          address: address,
        }, { fields: ['firstName','middleName','lastName','phone','address'] })
      const customeToken = await admin.auth().createCustomToken(authenticatedUser.uid)
      res.status(200).json({
        message: 'You are successfull',
        token: customeToken
      })
  } 
}
catch (error) {
    res.status(404).json({message: error.message})
}
}

const login = (req, res) => {
    const phone = req.params.phone
    console.log(req.params)
    admin.auth().createCustomToken(phone).then(customeToken => {
      res.status(200).json({
        message: 'You are successfull',
        token: customeToken
      })
    }).catch(error => {
      res.status(404).json({message: error.message})
    })
}

module.exports = {signup, login}