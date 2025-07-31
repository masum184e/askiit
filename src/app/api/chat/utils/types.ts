import { Annotation } from "@langchain/langgraph";

// Define intent type
export type Intent = "department" | "faculty" | "student" | "mixed" | "fallback";

export const GraphState = Annotation.Root({
  user_query: Annotation<string>(),
  normalized_query: Annotation<string>(),
  intent: Annotation<Intent>(),
  followup_questions: Annotation<string[]>(),
  retrieved_docs: Annotation<Record<string, unknown>[]>(),
  rag_answer: Annotation<string>(),
  db: Annotation<Record<string, unknown>>(),
  ext: Annotation<Record<string, unknown>>(),
  student_profile: Annotation<Record<string, unknown>>(),
  final_answer: Annotation<string>(),
  errors: Annotation<string[]>(),
  trace: Annotation<Record<string, unknown>[]>(),
});

// Manually define type for static typing support
export interface GraphStateType {
  user_query?: string;
  normalized_query?: string;
  intent?: Intent;
  followup_questions?: string[];
  retrieved_docs?: Record<string, unknown>[];
  rag_answer?: string;
  db?: Record<string, unknown>;
  ext?: Record<string, unknown>;
  student_profile?: Record<string, unknown>;
  final_answer?: string;
  errors?: string[];
  trace?: Record<string, unknown>[];
}
