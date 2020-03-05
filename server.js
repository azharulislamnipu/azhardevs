const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRoute = require('./routers/userRoute');
const bannerRoute = require('./routers/bannerRoute');
const counterRoute = require('./routers/counterRoute');
const aboutRoute = require('./routers/aboutRoute');
const socialRoute = require('./routers/socialRoute');
const contactRoute = require('./routers/contactRoute');
const infoRoute = require('./routers/infoRoute');
const portfolioRoute = require('./routers/portfolioRoute');
const serviceRoute = require('./routers/serviceRoute');
const skillsRoute = require('./routers/skillsRoute');
const experienceRoute = require('./routers/experienceRoute');
const educationRoute = require('./routers/educationRoute');
const cvRoute = require('./routers/cvRoute');
const logoRoute = require('./routers/logoRoute');

const passport = require('passport');
const path = require('path');
const app = express();
require('dotenv').config();
mongoose.Promise = global.Promise;

app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(passport.initialize());
require('./utils/passport')(passport);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/api/users', userRoute);
app.use('/api/banners', bannerRoute);
app.use('/api/counters', counterRoute);
app.use('/api/abouts', aboutRoute);
app.use('/api/socials', socialRoute);
app.use('/api/contacts', contactRoute);
app.use('/api/infos', infoRoute);
app.use('/api/portfolios', portfolioRoute);
app.use('/api/services', serviceRoute);
app.use('/api/skills', skillsRoute);
app.use('/api/experience', experienceRoute);
app.use('/api/educations', educationRoute);
app.use('/api/cvs', cvRoute);
app.use('/api/logos', logoRoute);

app.use(express.static('public'));
app.use(express.static(__dirname));

const port = process.env.PORT || 8080;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`server is running on PORT ${port}`);

  mongoose.connect(process.env.MONGODB_URI, () => {
    console.log('Databese Connected ....');
  });
});
