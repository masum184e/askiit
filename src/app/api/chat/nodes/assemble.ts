import model from "../model";
import { GraphStateType } from "../utils/types";

export async function assembleNode(
  state: Partial<GraphStateType>
): Promise<Partial<GraphStateType>> {
  console.log("Assemble Node Executed");

  const raw_answer = state.final_answer ?? state.rag_answer ?? "No answer found.";

  const system_prompt = `
    You are a precise and expert Markdown formatter.

    Given a raw, unstructured answer string, your job is to reformat it into clean, readable, and well-organized Markdown. You must not add or invent any content—preserve every word from the input. Just reorganize and format what’s provided.

    Your responsibilities:

    - Use appropriate Markdown elements: headings, bullet points, numbered lists, tables, code blocks, quotes, and links.
    - Remove redundant phrases and irrelevant clutter only if repeated or meaningless, but do not paraphrase or interpret.
    - Do not expand or summarize. Do not include extra explanations or assumptions.
    - Output only Markdown-formatted content, with no extra commentary or notes.

    Forbidden Actions:

    - Do not paraphrase, summarize, or interpret the content
    - Do not introduce transitions like “In summary” or “To begin with”
    - Do not change any meaning or add clarification

    Important rules:

    - Keep all original information intact unless it is repeated or purely noise.
    - Never invent or add new words, transitions, or filler text.
    - Always prioritize structure and clarity using Markdown syntax only.
  `;

  const response = await model.invoke([
    { role: "system", content: system_prompt },
    { role: "user", content: raw_answer }
  ]);

  const formatted_answer =
    typeof response.content === "string"
      ? response.content.trim()
      : raw_answer;

  console.log("Formatted Answer:", formatted_answer);

  return {
    ...state,
    final_answer: formatted_answer,
    trace: [...(state.trace ?? []), { step: "assemble_final_answer" }],
  };
}
