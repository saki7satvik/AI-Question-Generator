// // server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const axios = require('axios');
// const { spawn } = require('child_process');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const port = 5000;
// const mongoUri = "mongodb://localhost:27017/"; // Using environment variable for MongoDB URI

// // MongoDB connection
// mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Check MongoDB connection status
// mongoose.connection.on('connected', () => {
//   console.log('Mongoose connected to ' + mongoUri);
// });

// mongoose.connection.on('error', (err) => {
//   console.error('Mongoose connection error: ' + err);
// });

// mongoose.connection.on('disconnected', () => {
//   console.log('Mongoose disconnected');
// });

// // Define the Question schema directly in the server file
// const questionSchema = new mongoose.Schema({
//   question: String,
//   option1: String,
//   option2: String,
//   option3: String,
//   option4: String,
//   answer: String,
// });

// const Question = mongoose.model('Question', questionSchema);

// app.post('/api/get_prompt', (req, res) => {
//   const prompt = req.body.prompt;
//   res.send("message received");
// });

// app.post('/api/openai', async (req, res) => {
//   const prompt = req.body.prompt;

//   try {
//     const response = await axios.post(
//       'https://api.openai.com/v1/chat/completions',
//       {
//         model: 'gpt-3.5-turbo',
//         messages: [{ role: 'user', content: prompt }],
//         max_tokens: 50,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//         },
//       }
//     );

//     res.json(response.data.choices[0].message.content);
//   } catch (error) {
//     console.error('Error connecting to OpenAI API:', error.response ? error.response.data : error.message);
//     res.status(500).send('Error connecting to OpenAI API');
//   }
// });

// app.post('/api/langchain', (req, res) => {
//   const { company, no_of_questions } = req.body;

//   const pythonProcess = spawn('python', [
//     'D:/ekaushalya/AImcqs/QuestionGenerator.py',
//     JSON.stringify({ company, no_of_questions }),
//   ]);

//   pythonProcess.stdout.on('data', (data) => {
//     try {
//       const parsedData = JSON.parse(data.toString());
//       res.json(parsedData);
//     } catch (error) {
//       console.error('Error parsing Python script output:', error);
//       res.status(500).send('Error parsing Python script output');
//     }
//   });

//   pythonProcess.stderr.on('data', (data) => {
//     console.error(`Python script error: ${data}`);
//     res.status(500).send('Error processing the request');
//   });
// });

// app.post('/api/save_questions', async (req, res) => {
//   const questions = req.body.questions;

//   try {
//     await Question.insertMany(questions);
//     res.status(200).send('Questions saved successfully');
//   } catch (error) {
//     console.error('Error saving questions to MongoDB:', error);
//     res.status(500).send('Error saving questions to MongoDB');
//   }
// });

// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });
