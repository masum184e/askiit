import { NextRequest, NextResponse } from "next/server";
import { buildGraph } from "./graph";
import { writeFileSync } from "fs";

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

    // const result = await model.invoke(body.input);
    const graph = buildGraph();

    const stream = new ReadableStream({
      async start(controller) {
        const resultStream = await graph.stream({ user_query: body.input });

        for await (const step of resultStream) {
          const node = Object.values(step).find(
            (v: { final_answer?: string; rag_answer?: string }) =>
              v?.final_answer || v?.rag_answer
          );
          const content =
            (node as { final_answer?: string; rag_answer?: string })?.final_answer ||
            (node as { final_answer?: string; rag_answer?: string })?.rag_answer ||
            "";
          if (content) {
            controller.enqueue(new TextEncoder().encode(content));
          }
        }

        controller.close();
      },
    });

    // return NextResponse.json({ response: result.content }, { status: 200 });
    return new NextResponse(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error: unknown) {
    console.error("AI Chat Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}
