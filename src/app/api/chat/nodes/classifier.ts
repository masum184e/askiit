import { GraphStateType } from "../utils/types";

export async function classifierNode(
  state: Partial<GraphStateType>
): Promise<Partial<GraphStateType>>  {
  const input = state.normalized_query!;
  let intent: GraphStateType["intent"] = "llmNode" as GraphStateType["intent"];

  if (/student|profile|cgpa/i.test(input)) intent = "student";
  else if (/department|program|faculty/i.test(input)) intent = "department";
  else if (/research|project|paper/i.test(input)) intent = "mixed";

  return {
    ...state,
    intent,
    trace: [...(state.trace || []), { step: "classifierNode", intent }]
  };
}