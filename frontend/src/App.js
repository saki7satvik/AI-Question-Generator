import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [company, setCompany] = useState("");
  const [no_of_questions, setNoOfQuestions] = useState('');
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const prompt = { company, no_of_questions };
      const res = await axios.post('http://localhost:5000/api/langchain', prompt);
      setResponse(res.data);
    } catch (error) {
      console.error("Error sending the prompt to backend: ", error);
      setError("Error sending the prompt to backend");
    }
  };

  const handleDelete = (index) => {
    const after_delete = response.filter((_, i) => i !== index);
    setResponse(after_delete);
  };

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:5000/api/save_questions', { questions: response });
      alert('Questions saved successfully!');
    } catch (error) {
      console.error("Error saving questions to backend: ", error);
      setError("Error saving questions to backend");
    }
  };

  return (
    <div className='App'>
      <h1>OpenAI Prompt</h1>
      <form onSubmit={handleSubmit}>
        <input 
          value={company} 
          onChange={(e) => setCompany(e.target.value)} 
          placeholder='Enter the company' 
        />
        <input 
          value={no_of_questions} 
          onChange={(e) => setNoOfQuestions(e.target.value)} 
          placeholder='Enter number of questions' 
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
      {response.length > 0 && (
        <div>
          {response.map((question, index) => (
            <div key={index}>
              <h2>{index + 1}. {question.question}</h2>
              <ul>
                <li>Option 1: {question.option1}</li>
                <li>Option 2: {question.option2}</li>
                <li>Option 3: {question.option3}</li>
                <li>Option 4: {question.option4}</li>
                <li>Answer: {question.answer}</li>
              </ul>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))}
          <button onClick={handleSave}>Save to Database</button>
        </div>
      )}
    </div>
  );
}

export default App;
