import { NextRequest, NextResponse } from "next/server";
import { getChatResponse } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const response = await getChatResponse(message, history || []);

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { response: "I apologize for the inconvenience. Please try again in a moment." },
      { status: 500 }
    );
  }
}
