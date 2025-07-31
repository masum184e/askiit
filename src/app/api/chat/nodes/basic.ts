import model from "../model";
import { GraphStateType } from "../utils/types";

export async function llmNode(
  state: Partial<GraphStateType>
): Promise<Partial<GraphStateType>> {
  const response = await model.invoke(state.user_query!);
  return {
    ...state,
    final_answer: typeof response.content === "string" ? response.content : JSON.stringify(response.content),
    trace: [...(state.trace || []), { step: "llmNode", response: response.content }]
  };
}