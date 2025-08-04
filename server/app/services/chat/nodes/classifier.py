from app.services.chat.utils.types import GraphState
from app.services.chat.model import model  # Make sure your model is imported

def classifier_node(state: GraphState) -> GraphState:
    query = state.get("normalized_query", "").strip()

    system_prompt = """
You are a strict query classifier.

Your task is to classify the user query into one of the following three categories:

- "rag" — for queries specifically related to:
  - Faculty members or teachers
  - Departments or academic structure
  - Course syllabus or curriculum
  - University clubs (e.g., IT Club)
  - Academic syllabus or course materials
  - Any other information that can be found in the department's knowledge base

- "db" — for queries specifically related to:
  - Database details or structures
  - Database queries, schema, or administration
  - Database troubleshooting or configurations
  - Any question that concerns databases or data management

- "qa" — for all other queries, including:
  - Programming questions (not related to DB)
  - Concept explanations
  - Brainstorming, writing, or creative help

Rules:
- Respond with only one word: either rag, db, or qa
- Do not explain, comment, or include punctuation

Example:
- Query: "List of CSE department faculty" → rag
- Query: "Explain quicksort algorithm" → qa
- Query: "What is the syllabus for DBMS?" → rag
- Query: "Find me projects done by batch 2020 - 2021?" → db
- Query: "Help me come up with a project idea" → qa
- Query: "Who is the advisor of IT Club?" → rag
"""


    # Call the model with system prompt + user query
    response = model.invoke([
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": query}
    ])

    intent = response.content.strip()
    print(f"Classifier Node: {intent}")

    # Add to trace
    trace = state.get("trace", [])
    trace.append({"step": "classifier_node", "intent": intent})

    return {
        **state,
        "intent": intent,
        "trace": trace,
    }
