import { GraphStateType } from "../utils/types";
import { loadVectorStore } from "../utils/vectorstore";
import model from "../model";

function extractText(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((chunk: unknown) => (typeof chunk === "object" && chunk !== null && "text" in chunk ? (chunk as { text: string }).text : ""))
      .join(" ");
  }
  return "";
}

export async function ragNode(
    state: Partial<GraphStateType>
  ): Promise<Partial<GraphStateType>>  {
  const vectorStore = await loadVectorStore("pdfs");
  const docs = await vectorStore.similaritySearch(state.user_query!, 4);

  const context = docs.map((doc: { pageContent: unknown }) => doc.pageContent).join("\n\n");
  const prompt = `Use the context below to answer the query:\n\n${context}\n\nQuery: ${state.user_query}`;

  const response = await model.invoke(prompt);

  const ragAnswer = extractText(response.content);

  return {
    ...state,
    retrieved_docs: docs.map(doc => ({ pageContent: doc.pageContent })),
    rag_answer: ragAnswer,
    trace: [...(state.trace || []), { step: "ragNode", usedDocs: docs.length }]
  };
}
