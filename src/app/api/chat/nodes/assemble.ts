import model from "../model";
import { GraphStateType } from "../utils/types";

export async function assembleNode(
  state: Partial<GraphStateType>
): Promise<Partial<GraphStateType>> {
  console.log("Assemble Node Executed");

  const raw_answer = state.final_answer ?? state.rag_answer ?? "No answer found.";

  const system_prompt = `
You are a helpful AI assistant that formats answers for a university assistant.

Given a raw answer string, restructure and rewrite it into clean, readable, well-organized **Markdown**. Use appropriate headings, bullet points, table, anchor link and sections. Keep the original meaning and make it easy to read.

You are given a noisy, sometimes redundant or cluttered answer. Your job is to:
- Extract only the **relevant information**
- Clean up and remove repeated or irrelevant info

Always output **only Markdown-formatted content** with no extra commentary.
`;

  const response = await model.invoke([
    { role: "system", content: system_prompt },
    { role: "user", content: raw_answer }
  ]);

  const formatted_answer =
    typeof response.content === "string"
      ? response.content.trim()
      : raw_answer;

  return {
    ...state,
    final_answer: formatted_answer,
    trace: [...(state.trace ?? []), { step: "assemble_final_answer" }],
  };
}
