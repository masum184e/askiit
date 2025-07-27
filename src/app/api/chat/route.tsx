import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { NextRequest, NextResponse } from "next/server";

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-2.0-flash",
});

interface ChatRequestBody {
  input: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = (await req.json()) as ChatRequestBody;

    if (!body.input || typeof body.input !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing 'input' in request body." },
        { status: 400 }
      );
    }

    const result = await model.invoke(body.input);

    return NextResponse.json({ response: result.content }, { status: 200 });
  } catch (error: unknown) {
    console.error("AI Chat Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}
