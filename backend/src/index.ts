// src/index.ts
import express, { Request, Response } from 'express'
require('dotenv').config()

const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routers/userRoutes')
const taskRoutes = require('./routers/taskRoutes')

// Connection URI for your MongoDB database
const mongoURI = "mongodb://localhost:27017/mydatabase"

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection

// Event handlers for database connection
db.on('connected', () => {
  console.log('Connected to MongoDB')
})

db.on('error', (err: string) => {
  console.error('MongoDB connection error:', err)
})

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB')
})

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}))

app.use('/user', userRoutes)
app.use('/task', taskRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
