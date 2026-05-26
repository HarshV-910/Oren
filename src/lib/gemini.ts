// ═══════════════════════════════════════════════════════
// OREN — Google Gemini AI Client
// ═══════════════════════════════════════════════════════

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// System prompt for the jewellery chatbot
export const CHATBOT_SYSTEM_PROMPT = `You are Oren's luxury jewellery assistant. You help customers with:
- Finding the perfect jewellery piece
- Understanding gold purity (24K, 22K, 18K, 14K)
- Diamond quality (4 C's: Cut, Clarity, Color, Carat)
- Jewellery care and maintenance
- Order and shipping queries
- Size guides for rings and bracelets
- Gift recommendations

Always be polite, knowledgeable, and luxurious in tone. Use elegant language.
Keep responses concise but helpful. If asked about prices, direct them to browse the collection.
Never make up product information — suggest browsing the catalog for specific items.`;

export async function getChatResponse(
  message: string,
  history: { role: string; content: string }[] = []
) {
  try {
    const chat = geminiModel.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: CHATBOT_SYSTEM_PROMPT }],
        },
        {
          role: "model",
          parts: [{ text: "I understand. I am Oren's luxury jewellery assistant, ready to help customers with elegance and expertise." }],
        },
        ...history.map((msg) => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        })),
      ],
    });

    const result = await chat.sendMessage(message);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    return "I apologize, but I'm experiencing a brief moment. Please try again, or feel free to browse our exquisite collection.";
  }
}

// Generate SEO description for a product
export async function generateProductDescription(productName: string, details: string) {
  try {
    const result = await geminiModel.generateContent(
      `Write a luxurious, SEO-optimized product description for a jewellery piece:
       Name: ${productName}
       Details: ${details}
       Keep it under 200 words. Use elegant, premium language. Include relevant keywords.`
    );
    return result.response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    return null;
  }
}
