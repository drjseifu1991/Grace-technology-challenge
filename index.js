const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const notesRoutes = require('./routes/notes.js')
const { db } = require('./config/database.js')
const userRoutes = require('./routes/user.js')


/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


/* ROUTES */
app.use('/user', userRoutes)
app.use('/notes', notesRoutes)

// Sequlize CONFIGURATION
db.sequelize.sync({ force:true }).then(() => {
    console.log('Database has been synced successfully.')
}).catch(error => {
    console.log('Unable to sync database:', error)
})



// Listen for Request

app.listen(3000, () => {
    console.log('Listening on 3000')
})