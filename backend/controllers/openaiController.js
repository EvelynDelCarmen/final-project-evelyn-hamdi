import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// Placeholder for the function that fetches the latest news about Beyoncé
// You will need to implement this function based on your choice of news API or data source
async function getLatestBeyonceNews() {
    // Logic to fetch and summarize the latest news about Beyoncé
    // For example, this could involve calling a news API and processing the response
    return "Beyoncé has recently released a new album titled 'Cowboy Carter'.";
}

export const askBeyController = async (req, res) => {
    const { question } = req.body; // Destructures the question from the request body

    // Checks if the question does not include "beyonce" or "beyoncé". If true, returns a message limiting the scope to Beyoncé-related questions.
    if (!question.toLowerCase().includes("beyonce") && !question.toLowerCase().includes("beyoncé")) {
        return res.json({ success: true, question, answer: "I can only answer questions about Beyoncé." });
    }

    console.log("Received question:", question); // Logs the received question to the console

    try {

        // Fetch the latest news about Beyoncé
        const latestNews = await getLatestBeyonceNews();

        // Construct the prompt with the latest news information
        const prompt = `Considering the latest updates: ${latestNews}. Now, as an AI knowledgeable about Beyoncé's life, career, and music, answer the following question: ${question}`;


        // Prepares the prompt for the AI, specifically asking to answer questions about Beyoncé
        // const prompt = `You are an AI knowledgeable about Beyoncé's life, career, and music, including her latest releases and activities up to April 2023. Answer the following question with the most recent data and insights available: ${question}`;


        console.log("Sending prompt to OpenAI:", prompt); // Logs the prepared prompt to the console
        // Makes a POST request to the OpenAI API with the question and settings for the AI response
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4-turbo-preview", // Specifies the AI model
                messages: [ // Defines the context and the user question for the AI
                    { role: "system", content: "You are a knowledgeable assistant about Beyoncé, focusing on providing the most current information." },
                    { role: "user", content: question },
                ],
                max_tokens: 150, // Limits the length of the AI's response
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` // Includes the API key for authentication
                }
            }
        );

        const lastMessage = response.data.choices[0].message.content; // Extracts the AI's response from the data received
        const answer = lastMessage ? lastMessage.trim() : "No answer received."; // Trims the response and handles the case of an undefined response
        res.json({ success: true, question, answer }); // Sends the response back to the client
    } catch (error) {
        console.error(error); // Logs any error that occurs during the request to the console
        res.status(500).json({ success: false, message: "Failed to get an answer from AI" }); // Sends an error message if the request fails
    }
};



