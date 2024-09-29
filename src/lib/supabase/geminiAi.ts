"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

export async function askGemini(question: string): Promise<string> {

  if (!question) {
    throw new Error("Question is required");
  }

  try {
    const chatSession = model.startChat({
      generationConfig,
      // safetySettings: Adjust safety settings if needed
      // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [],
    });

    const result = await chatSession.sendMessage(question);
    return result.response.text();
  } catch (error) {
    console.error('Error:', error);
    throw new Error("Failed to get response from Gemini");
  }
}