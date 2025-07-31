import { GraphStateType } from "../utils/types";

export async function assembleNode(
  state: Partial<GraphStateType>
): Promise<Partial<GraphStateType>> {
  const final = state.final_answer ?? state.rag_answer ?? "No answer found.";

  return {
    ...state,
    final_answer: final,
    trace: [...(state.trace ?? []), { step: "assemble_final_answer" }],
  };
}
