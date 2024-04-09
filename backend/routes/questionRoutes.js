import express from "express";
import axios from "axios"; // Axios is used for making HTTP requests
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// This route handles user questions and fetches responses from the AI
router.post("/ask-beyonce", async (req, res) => {
  const { question } = req.body;

  try {
    // Prepare the prompt for the OpenAI API
    const prompt = `As an expert on Beyoncé, answer this question: ${question}`;

    // Make the API request to OpenAI
    const response = await axios.post(
      "https://api.openai.com/v4/completions",
      {
        model: "text-davinci-003", // You might choose a different model based on your preference
        prompt: prompt,
        max_tokens: 150,
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` // Your OpenAI API Key
        }
      }
    );

    // Extract the AI's answer from the response
    const answer = response.data.choices[0].text.trim();

    // Return the question and answer to the user
    res.json({ success: true, question, answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to get an answer from AI" });
  }
});

export default router;



//FRONTEND SUGGESTION FROM CHAT

{/* <form id="questionForm">
  <input type="text" id="userQuestion" placeholder="Ask a question about Beyoncé...">
  <button type="submit">Ask</button>
</form>
<div id="answer"></div>

<script>
document.getElementById("questionForm").onsubmit = async function(event) {
  event.preventDefault();
  const question = document.getElementById("userQuestion").value;
  const response = await fetch('/ask-beyonce', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  });
  const data = await response.json();
  document.getElementById("answer").textContent = data.answer;
};
</script> */}
