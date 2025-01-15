import React, { useState, useEffect } from 'react';

function App() {
  const [stories, setStories] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');

  useEffect(() => {
    fetch('/api/stories') //  Replace if your backend is running on another domain or port.
      .then(response => response.json())
      .then(data => setStories(data));
  }, []);

  const handleGenerateStory = async () => {
    try {
      const response = await fetch('/api/stories/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({prompt})
      });
      if(!response.ok) throw new Error("API request failed.")
      const data = await response.json();
      setGeneratedStory(data.story);
    } catch (error) {
      console.error("There was an error calling the API: ", error);
    }
  };

  return (
    <div>
      <h1>Toddler Stories</h1>
      <ul>
        {stories.map(story => (
          <li key={story.id}>{story.title}</li>
        ))}
      </ul>
      <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      <button onClick={handleGenerateStory}>Generate Story</button>
      <p>{generatedStory}</p>
    </div>
  );
}

export default App;