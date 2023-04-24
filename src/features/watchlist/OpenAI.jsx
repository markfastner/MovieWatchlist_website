import React, { useState } from 'react';
import axios from 'axios';

const OpenAIButton = () => {
  const [response, setResponse] = useState('');
  const [prompt, setPrompt] = useState('Im a fan of the movie Titanic. Recommend me a similar movie.');
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
      <h1>Ask Movie-Bot a Question: </h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label>
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
              outline: "none",
              marginRight: "10px",
            }}
          />
        </label>
        <button
          onClick={handleClick}
          style={{
            backgroundColor: "lightblue",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Send
        </button>
      </div>
      <p style={{ fontFamily: 'Courier New, monospace', wordWrap: 'break-word', maxWidth: '50ch' }}>
      Movie-Bot: {response}
      </p>


    </div>
  );
  
};

export default OpenAIButton;
