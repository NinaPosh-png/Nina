import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON
  app.use(express.json());

  // API endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  app.post("/api/submit", async (req, res) => {
    try {
      const { type, data } = req.body;
      if (!type || !data) {
        res.status(400).json({ error: "Type and data parameters are required." });
        return;
      }

      // Retrieve configured webhook URL or fallback to user default
      const webhookUrl = process.env.WEBHOOK_URL || "https://www.classwithspeed.pro/webhook-test/a0e47b8d-42c9-41e1-b823-836a10d4c4c2";

      console.log(`Forwarding submitted ${type} parameters to secured webhook: ${webhookUrl}`);

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          source: "Nina Events App",
          type,
          timestamp: new Date().toISOString(),
          ...data,
          payload: data,
        }),
      });

      // Handle raw txt or json response formats resiliently
      let responseBody = "";
      try {
        responseBody = await response.text();
      } catch (e) {
        // Safe fallback if response cannot be parsed as text
      }

      console.log(`Webhook responded with status ${response.status}: ${responseBody}`);

      if (!response.ok) {
        throw new Error(`Webhook responded with status ${response.status}`);
      }

      res.json({ success: true, status: response.status, payload: responseBody });
    } catch (error: any) {
      console.error("Discretionary webhook delivery failed:", error);
      // Fallback: Return 200/success to the client to keep UI elegant while logging error
      res.json({ success: false, error: error?.message || "Delivery failure." });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        res.status(400).json({ error: "Message is required." });
        return;
      }

      // Check if API key is present
      if (!process.env.GEMINI_API_KEY) {
        // Return a mock sophisticated response if no key is present, ensuring high usability
        res.json({
          text: `**Hello from Nina Events!** ✨\n\nI’d love to help you plan your exquisite celebration. (Note: The server is currently operating in simulation mode). To design a gorgeous event, I highly recommend standard luxury accents including champagne silk table scapes, delicate blush and cream hydrangea centerpieces, and warm gold ambient up-lighting.\n\nWhat kind of exclusive theme, guest list size, or venue vibes are you dreaming of for your special day?`
        });
        return;
      }

      const client = getGeminiClient();
      
      // Let's create a Chat session or simple model generation with history
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: message,
        config: {
          systemInstruction: "You are Nina Events’ Senior AI Event Coordinator—an exceptionally charming, sophisticated, and polished expert planner who crafts custom luxury events in stunning blush pink, champagne, gold, rose, and mauve refined themes. Speak with elevated warmth, elegance, and extreme attention to gorgeous design details. Your job is to collaborate with users to design bespoke layouts, theme concepts, flower styles, menus, music choices, and detailed checklists for any celebration (weddings, galas, milestone birthdays, high-society socials). Always structure your response elegantly with clear markdown headers, bold terms, bullet points, and inspiring, helpful luxury ideas. Mention specifically how blush pinks, gold, rose, champagne, and lovely feminine aesthetics can be woven into their specific event, making it absolutely unforgettable. Keep your message highly personalized, encouraging, and complete.",
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error in Nina Events Chat:", error);
      res.status(500).json({ error: error?.message || "An unexpected error occurred during your consultation." });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Nina Events server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start Nina Events server:", err);
});
