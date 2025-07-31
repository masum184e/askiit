import type { GraphStateType } from "../utils/types";

export function router(state: Partial<GraphStateType>): "llmNode" | "ragNode" | "fallbackNode" {
  const intent = state.intent ?? "fallback";

  switch (intent) {
    case "student":
    case "faculty":
      return "ragNode";
    case "department":
      return "llmNode";
    case "mixed":
    case "fallback":
    default:
      return "fallbackNode";
  }
}

export const routerNode = async (state: Partial<GraphStateType>): Promise<Partial<GraphStateType>> => {
  const route = router(state);
  return {
    ...state,
    trace: [...(state.trace ?? []), { step: "router", route }],
  };
};
