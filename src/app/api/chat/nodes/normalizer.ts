import { GraphStateType } from "../utils/types";

export async function normalizerNode(
  state: Partial<GraphStateType>
): Promise<Partial<GraphStateType>> {
  const normalized = state.user_query?.toLowerCase().trim() || "";

  console.log("Normalizer Node Executed");

  return {
    ...state,
    normalized_query: normalized,
    trace: [...(state.trace ?? []), { step: "normalizerNode", normalized }],
  };
}
