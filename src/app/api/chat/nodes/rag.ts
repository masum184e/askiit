import { GraphStateType } from "../utils/types";
import { loadVectorStore } from "../utils/vectorstore";

export async function ragNode(
  state: Partial<GraphStateType>
): Promise<Partial<GraphStateType>> {

  console.log("RAG Node Executed");

  const pdfDirPath = process.env.PDF_FILE_PATH;
  if (!pdfDirPath) {
    throw new Error("PDF_FILE_PATH environment variable is not set");
  }

  const vectorStore = await loadVectorStore(pdfDirPath);
  const docs = await vectorStore.similaritySearch(state.user_query!);

  const ragAnswer = docs.map((doc: { pageContent: unknown }) => doc.pageContent).join("\n\n");

  return {
    ...state,
    retrieved_docs: docs.map(doc => ({ pageContent: doc.pageContent })),
    rag_answer: ragAnswer,
    trace: [...(state.trace || []), { step: "ragNode", usedDocs: docs.length }]
  };
}
