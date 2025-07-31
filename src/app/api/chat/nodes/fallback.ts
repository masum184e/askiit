import { GraphStateType } from "../utils/types";

export async function fallbackNode(
    state: Partial<GraphStateType>
  ): Promise<Partial<GraphStateType>>  {
  const answer = "Sorry, I couldn't understand that. Try rephrasing your question.";
  return {
    ...state,
    final_answer: answer,
    trace: [...(state.trace || []), { step: "fallbackNode" }]
  };
}