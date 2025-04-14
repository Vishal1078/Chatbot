const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    // ✅ Use a supported model (Change the model name here)
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-pro-exp" });

    const result = await model.generateContent(userMessage);
    const response = result.response;
    const text = await response.text();

    console.log("🤖 AI Response:", text);
    res.json({ reply: text });

  } catch (error) {
    console.error("💥 Gemini API error:", error);
    res.status(500).json({ reply: "Sorry, something went wrong." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
