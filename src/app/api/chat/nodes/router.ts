import type { GraphStateType } from "../utils/types";

export function router(state: Partial<GraphStateType>): "llmNode" | "ragNode" {
  const intent = state.intent ?? "llmNode";

  switch (intent) {
    case "faculty":
      return "ragNode";
    default:
      return "llmNode";
  }
}
