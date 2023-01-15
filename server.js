// setup express
import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});

//middleware to serve static files, and use json to send data
app.use(express.static("public"));
app.use(express.json());

// add environment variables
import dotenv from "dotenv";
dotenv.config();

// setupt Open AI
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

//handle POST request
app.post("/completion", async (req, res) => {
  if (!req.body.message) {
    return res.status(400).send({ error: "Error: Message is empty" });
  }
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.message,
      max_tokens: 2028,
    });
    const answer = response?.data?.choices[0]?.text;
    if (response.status == 200 && answer) {
      res.status(200).send({ answer });
    } else {
      res.status(500).send({ error: "Error: Could not process your request" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Error: Could not process your request" });
  }
});
