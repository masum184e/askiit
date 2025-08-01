import { StateGraph } from "@langchain/langgraph";
import { GraphState } from "./utils/types";
import { normalizerNode } from "./nodes/normalizer";
import { classifierNode } from "./nodes/classifier";
import { router } from "./nodes/router";
import { llmNode } from "./nodes/basic";
import { assembleNode } from "./nodes/assemble";
import { ragNode } from "./nodes/rag";
import { ragGeneratorNode } from "./nodes/rag-generator";

export function buildGraph() {
  const graph = new StateGraph(GraphState)
    .addNode("normalizer", normalizerNode)
    .addNode("classifier", classifierNode)
    .addNode("llm", llmNode)
    .addNode("rag", ragNode)
    .addNode("ragGenerator", ragGeneratorNode)
    .addNode("assemble", assembleNode)
    .addEdge("__start__", "normalizer")
    .addEdge("normalizer", "classifier")
    .addConditionalEdges("classifier", router, {
      "llmNode": "llm", 
      "ragNode": "rag",
    })
    .addEdge("rag", "ragGenerator")
    .addEdge("llm", "assemble")
    .addEdge("ragGenerator", "assemble")
    .addEdge("assemble", "__end__");
    
  return graph.compile();
}
