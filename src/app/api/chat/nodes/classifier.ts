import model from "../model";
import { GraphStateType } from "../utils/types";

export async function classifierNode(
  state: Partial<GraphStateType>
): Promise<Partial<GraphStateType>> {
  const input = state.normalized_query!;

  const system_prompt = `
    You are a strict query classifier.

    Your task is to classify the user query into one of the following two categories:

    - "ragNode" — for queries specifically related to:

      - Faculty members or teachers
      - Departments or academic structure
      - Course syllabus or curriculum
      - University clubs (e.g., IT Club)
      - Academic syllabus or course materials
      - Any other information that can be found in the department's knowledge base

    - "llmNode" — for all other queries, including:

      - Programming questions
      - Concept explanations
      - Brainstorming, writing, or creative help

    - Rules:

      - Respond with only one word: either ragNode or llmNode
      - Do not explain, comment, or include punctuation

    Example:

    - Query: "List of CSE department faculty"
    → ragNode

    - Query: "Explain quicksort algorithm"
    → llmNode

    - Query: "What is the syllabus for DBMS?"
    → ragNode

    - Query: "Help me come up with a project idea"
    → llmNode

    - Query: "Who is the advisor of IT Club?"
    → ragNode
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

  console.log(`Classifier Node Executed: ${intent}`);

  return {
    ...state,
    intent,
    trace: [...(state.trace || []), { step: "classifierNode", intent }]
  };
}
