import { NextRequest } from "next/server";
import { buildGraph } from "./graph";
import { writeFileSync } from "fs";

interface ChatRequestBody {
  input: string;
}

interface ImageLike {
  arrayBuffer(): Promise<ArrayBuffer>;
}

interface DrawableGraph {
  drawMermaidPng(): Promise<ImageLike>;
}

async function saveGraphImage(drawableGraph: DrawableGraph) {
  const graphStateImage = await drawableGraph.drawMermaidPng();
  const graphStateArrayBuffer = await graphStateImage.arrayBuffer();

  writeFileSync("./graphState.png", new Uint8Array(graphStateArrayBuffer));
  console.log("Graph image saved.");
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body = (await req.json()) as ChatRequestBody;

    if (!body.input || typeof body.input !== "string") {
      return new Response(JSON.stringify({ error: "Invalid input" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const graph = buildGraph();

    // const rawGraph = await graph.getGraphAsync({ xray: false });
    // await saveGraphImage(rawGraph);

    const stream = new ReadableStream({
      async start(controller) {
        const resultStream = await graph.stream({ user_query: body.input });

        for await (const step of resultStream) {
          const node = Object.values(step).find(
            (v: { final_answer?: string; rag_answer?: string }) =>
              v?.final_answer || v?.rag_answer
          );

          const content =
            node?.final_answer || node?.rag_answer || "";

          if (content) {
            controller.enqueue(new TextEncoder().encode(content));
          }
        }

        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("AI Chat Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
