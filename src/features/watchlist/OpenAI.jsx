import React, { useState } from 'react';
import axios from 'axios';

const OpenAIButton = () => {
  const [response, setResponse] = useState('');
  const [prompt, setPrompt] = useState('Recommend me a romantic movie!');
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

  console.log('Component rendered');

  return (
    <div>
      <label>
        User Name:
        <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      </label>
      <br />
      <button onClick={handleClick}>send</button>
      <p>Movie-Bot: {response}</p>
    </div>
  );
};

export default OpenAIButton;
