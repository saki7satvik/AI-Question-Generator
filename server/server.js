// // server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const axios = require('axios');
// const bodyParser = require('body-parser');
// const { spawn } = require('child_process');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());

// const port = 5000;
// const mongoUrl = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase"; // Ensure this is set in your .env

// // MongoDB connection
// mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
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

// const dataSchema = new mongoose.Schema({
//     name: String,
//     value: Number
// });

// const Question = mongoose.model('Question', questionSchema);
// const Data = mongoose.model('Data', dataSchema);

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
//   const { company, no_of_questions, subject, type_of_question, language } = req.body;

//   const pythonProcess = spawn('python', [
//     'D:/ekaushalya/AImcqs/QuestionGenerator.py',
//     JSON.stringify({ company, no_of_questions, subject, type_of_question, language }),
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

// // Request to test MongoDB connection
// app.post('/data', async (req, res) => {
//   const { name, value } = req.body;
//   const newData = new Data({ name, value });

//   try {
//     await newData.save();
//     res.status(201).send('Data saved to MongoDB');
//   } catch (error) {
//     res.status(400).send('Error saving data');
//   }
// });

// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });
