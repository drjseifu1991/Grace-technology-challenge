const admin = require('../config/firebaseAdmin.js');

const authenticationMiddleWare = async (req, res, next) => {
		const token = req.headers.authorization.split(' ')[1]
		// console.log(token)
		// console.log(req.body)
		if(token) {
			admin.auth().verifyIdToken(token).then((decodedToken) => {
				req.user = decodedToken.uid
				console.log('okkkkkkkkkkkkk')
				next()
			})
			.catch(error => {
				res.status(403).json({ message: 'Unauthorized' });
			})
		}
}

module.exports = authenticationMiddleWare;