import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Ensure the API key is set in environment variables
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const STORE_KNOWLEDGE = `
You are the Shomzy.pk AI Shopping Assistant. Your goal is to help customers, answer their questions, and help convert visitors into buyers.
Be polite, professional, and use a premium/luxury tone.

STORE POLICIES & INFO:
- Store Name: Shomzy.pk
- Categories: Fashion, Electronics, Beauty, Home & Lifestyle.
- Payment Methods: We accept Cash on Delivery (COD) and secure online payments via Bank of Punjab (BOP).
- COD Process: IMPORTANT! All COD orders require manual confirmation. Once a customer places a COD order, it will be in "Pending Confirmation" status. Our team will call the customer to verify the order. Once verified on call, the status changes to "Confirmed" and the order is shipped.
- Shipping: Flat rate shipping of Rs. 200 nationwide.
- Delivery Timeline: Standard delivery takes 3-5 business days.
- Return Policy: We offer a 7-day return/exchange policy on eligible items. Items must be unused and in original packaging.

If you don't know the answer or the user has a complex complaint/issue, politely ask them to leave their email/phone number so our human support team can contact them, or tell them to email support@shomzy.pk.
`;

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    // Fetch some basic catalog info to ground the AI (top 10 products)
    const products = await prisma.product.findMany({
      take: 10,
      select: { name: true, price: true, stock: true },
    });
    
    const productContext = "CURRENT CATALOG SUMMARY:\n" + products.map(p => `- ${p.name}: Rs. ${p.price} (${p.stock > 0 ? 'In Stock' : 'Out of Stock'})`).join("\n");

    const systemInstruction = STORE_KNOWLEDGE + "\n\n" + productContext;

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction,
        temperature: 0.3,
      }
    });

    // We can simulate history by sending the message. 
    // In a full implementation, we would send the full history to the model or use the history array.
    // For simplicity, we just send the latest message with the context.
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.3,
      }
    });

    return NextResponse.json({ reply: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ reply: "I'm sorry, I am currently experiencing technical difficulties. Please contact support@shomzy.pk." });
  }
}
