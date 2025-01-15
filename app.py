from flask import Flask, jsonify, request
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/api/stories', methods=['GET'])
def get_stories():
    # Logic to fetch stories from a database or elsewhere
    stories = [
        {"id": 1, "title": "The Little Bear", "text": "Once upon a time..."},
        {"id": 2, "title": "The Brave Mouse", "text": "A mouse was very brave..."}
        ]
    return jsonify(stories)

@app.route('/api/stories/generate', methods=['POST'])
def generate_story():
  prompt = request.get_json()['prompt']
  # Logic to generate a story based on the prompt, could use an AI model here.
  story = "Generated story based on prompt: " + prompt # Placeholder
  return jsonify({"story": story})

