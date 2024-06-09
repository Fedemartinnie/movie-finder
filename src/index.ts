import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import authRoutes from './routes/Auth';
import userRoutes from './routes/User';
import movieRoutes from './routes/Movie';
import passport from './Passport'; // Ajusta la ruta según la ubicación real de tu archivo passport

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.disable('x-powered-by');

// Configure session
app.use(session({
  secret: 'tu_secreto', // Cambiar por otro string
  resave: false,
  saveUninitialized: true
}));

// Configure CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Configure MongoDB connection
const dbURL = process.env.DATABASE;
mongoose.Promise = require('bluebird');
const opts = {
  useNewUrlParser: true,
  connectTimeoutMS: 20000,
  useUnifiedTopology: true
};

if (dbURL) {
  mongoose.connect(dbURL, opts)
    .then(() => {
      console.log('Connected to MongoDB.');
    })
    .catch((e) => {
      console.error('Error connecting to MongoDB:', e);
    });
}

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Authentication routes
app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/movies', movieRoutes);


// Logout route
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('/');
  });
});

// Home route
app.get('/home', (_req, res) => {
  console.log("Home movie finder");
  res.send('Movie-Finder Home');
});

//* CLOUDINARY
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'ddy10tgci', 
  api_key: '187851378689789', 
  api_secret: 'y4TsRDQJeWiYxY1Sxd5cJx-iz40' 
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
  console.log('DATABASE URL:', process.env.DATABASE);
  console.log('DATABASE NAME:', process.env.DATABASE_NAME);
});