import model from "../model";
import { GraphStateType } from "../utils/types";

export async function classifierNode(
  state: Partial<GraphStateType>
): Promise<Partial<GraphStateType>> {
  const input = state.normalized_query!;
  
  const system_prompt = `
You are a query classifier for a university assistant.

Classify the following query into one of two categories:
- "ragNode": if the query is related to faculty members, departments, teachers, or academic structure.
- "llmNode": for general or creative questions (e.g., explanations, programming help, brainstorming).

Respond with only one word: either "ragNode" or "llmNode". Do not explain.
`;

  const response = await model.invoke([
    { role: "system", content: system_prompt },
    { role: "user", content: input }
  ]);

  const raw_intent = typeof response.content === "string"
    ? response.content.trim()
    : "llmNode";

  const allowed_intents: GraphStateType["intent"][] = ["llmNode", "ragNode"];

  const intent: GraphStateType["intent"] = allowed_intents.includes(raw_intent as GraphStateType["intent"])
    ? (raw_intent as GraphStateType["intent"])
    : "llmNode";

  console.log(`Classifier Executed: ${intent}`);

  return {
    ...state,
    intent,
    trace: [...(state.trace || []), { step: "classifierNode", intent }]
  };
}
