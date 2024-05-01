// server.js

import express from 'express';
import connectDB from './connection/db.js';
import router from './routes/todoRoutes.js';
import bodyParser from 'body-parser';
import process from 'process';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// MongoDB connection
connectDB(process.env.MONGO_URI);

// Middleware
app.use(bodyParser.json());

// Router
app.use(router);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
