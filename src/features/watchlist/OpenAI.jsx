import React, { useState } from 'react';
import axios from 'axios';

const OpenAIButton = () => {
  const [response, setResponse] = useState('');
  const [prompt, setPrompt] = useState('Im a fan of the movie Titanic. Recommend me a similiar movie.');
  const model = 'text-davinci-002'; // replace with your desired OpenAI model, e.g. 'text-davinci-002'
  const handleClick = async () => {
    try {
      const response = await axios.post(
        `https://api.openai.com/v1/engines/${model}/completions`,
        {
          prompt,
          max_tokens: 50,
          n: 1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );
      console.log('API response:', response.data);
      const text = response.data.choices[0].text;
      console.log('Response text:', text);
      setResponse(text);
    } catch (error) {
      console.log('API error:', error);
    }
  };

  //console.log('Component rendered');

  return (
    <div>
      <label>
        <h1>Ask movie-bot a question: </h1>
        <input 
        type="text" 
        value={prompt} 
        onChange={(e) => setPrompt(e.target.value)} 
        style={{ 
        width: "500px", 
        height: "40px", 
        fontSize: "18px", 
        padding: "10px", 
        borderRadius: "20px", 
        border: "2px solid #ccc", 
        boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.1)", 
        outline: "none" 
      }} 
    />
      </label>
      <br />
      <button onClick={handleClick} style={{backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'}}>Send</button>

      <p>Movie-Bot: {response}</p>
    </div>
  );
};

export default OpenAIButton;
