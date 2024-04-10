import express from 'express';
import { askBeyController } from '../controllers/openaiController';

const router = express.Router();

router.post('/ask-bey', askBeyController);

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
