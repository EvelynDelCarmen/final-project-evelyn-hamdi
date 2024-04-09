import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const askBeyonceController = async (req, res) => {
    const { question } = req.body;

    try {
        const prompt = `As an expert on Beyoncé, answer this question: ${question}`;
        const completion = await openai.createCompletion({
            model: "gpt-3.5-turbo-1106", // Adjust the model as needed
            prompt: prompt,
            max_tokens: 150,
        });

        const answer = completion.data.choices[0].text.trim();
        res.json({ success: true, question, answer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to get an answer from AI" });
    }
};

