import { GraphStateType } from "../utils/types";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { pull } from "langchain/hub";
import model from "../model";

const promptTemplate = await pull<ChatPromptTemplate>("rlm/rag-prompt");

export async function ragGeneratorNode(
  state: Partial<GraphStateType>
): Promise<Partial<GraphStateType>> {
  console.log("RAG Generator Node Executed");

  if (!state.retrieved_docs || !state.user_query) {
    throw new Error("Missing required fields: 'retrieved_docs' or 'user_query'");
  }

  const docsContent = state.retrieved_docs
    .map(doc => doc.pageContent)
    .join("\n");

  const messages = await promptTemplate.invoke({
    question: state.user_query,
    context: docsContent,
  });

  const response = await model.invoke(messages);

  let finalAnswer = "";

  if (typeof response.content === "string") {
    finalAnswer = response.content;
  } else if (Array.isArray(response.content)) {
    finalAnswer = response.content
      .filter(part => part.type === "text")
      .map(part => (part as { text: string }).text)
      .join("\n");
  }

  return {
    ...state,
    final_answer: finalAnswer,
    trace: [
      ...(state.trace || []),
      { step: "ragGeneratorNode", inputLength: docsContent.length }
    ]
  };
}
