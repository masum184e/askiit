import { StateGraph } from "@langchain/langgraph";
import { GraphState } from "./utils/types";
import { normalizerNode } from "./nodes/normalizer";
import { classifierNode } from "./nodes/classifier";
import { routerNode } from "./nodes/router";
import { llmNode } from "./nodes/basic";
import { assembleNode } from "./nodes/assemble";

export function buildGraph() {
  const graph = new StateGraph(GraphState)
    .addNode("normalizer", normalizerNode)
    .addNode("classifier", classifierNode)
    .addNode("router", routerNode)
    .addNode("llmNode", llmNode)
    .addNode("assemble", assembleNode)
    .addEdge("__start__", "normalizer")
    .addEdge("normalizer", "classifier")
    .addEdge("classifier", "router")
    .addEdge("router", "llmNode")
    .addEdge("llmNode", "assemble")
    .addEdge("assemble", "__end__");
    
  return graph.compile();
}
