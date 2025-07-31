import model from "../model";
import { GraphStateType } from "../utils/types";

export async function llmNode(
  state: Partial<GraphStateType>
): Promise<Partial<GraphStateType>> {
  const system_prompt = `
You are AskIIT, a helpful, accurate, and student-friendly AI assistant.
You assist Software Engineering students at the Institute of Information Technology, 
Noakhali Science and Technology University (NSTU).

Provide clear, context-aware answers about:
- Software Engineering topics (e.g., algorithms, databases, OOP, software architecture)
- University academic policies, course structure, faculty info (if relevant context is provided)
- Project help, internship advice, coding tips

Avoid hallucinations. If you are unsure, say so and suggest where the student can look (e.g., course handbook, website, or academic advisor).
`;

  const response = await model.invoke([
    { role: "system", content: system_prompt },
    { role: "user", content: state.user_query! }
  ]);

  return {
    ...state,
    final_answer: typeof response.content === "string" ? response.content : JSON.stringify(response.content),
    trace: [...(state.trace || []), { step: "llmNode", response: response.content }]
  };
}
