const admin = require('../config/firebaseAdmin.js');

const middleWare = async (req, res, next) => {
		const token = req.headers.authorization;
		if(token) {
			admin.auth().verifyIdToken(token).then((decodedToken) => {
				req.user = decodedToken.uid
			})
			.catch(error => {
				return res.status(403).json({ message: 'Unauthorized' });
			})
		}
	}

module.exports = middleWare;