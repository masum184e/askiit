from app.services.chat.utils.types import GraphState
from app.services.chat.model import model  # Make sure your model is imported

def classifier_node(state: GraphState) -> GraphState:
    query = state.get("normalized_query", "").strip()

    system_prompt = """
You are a strict query classifier.

Your task is to classify the user query into one of the following three categories:

- "cf" — for queries specifically related to Codeforces, such as:
  - Codeforces user profiles or handles
  - Codeforces problems, contests, or ratings
  - Solving, explaining, or comparing Codeforces problems
  - Participation history or performance on Codeforces

- "rag" — for queries answerable using documents like a university's knowledge base, such as:
  - Faculty members or teachers
  - Departments or academic structure
  - Course syllabus or curriculum
  - University clubs (e.g., IT Club)
  - Academic syllabus or course materials
  - Any other information that can be found in the department's knowledge base
  - Faculty members, departments, or administrative structure
  - Course syllabus, curriculum, or course plans
  - Clubs, labs, or academic facilities
  - Anything found in official departmental documents

- "db" — for queries that can be answered by querying the structured student database, such as
  - Retrieving students, SPLs, achievements, papers, or personal intereset, projects
  - Searching by batch/session, mentor, student ID, etc.
  - Listing SPL projects or students by filters

- "qa" — for all other queries, including:
  - Programming questions (not related to DB)
  - Concept explanations
  - Brainstorming, writing, or creative help
  - Help with writing, ideation, or creative tasks
  - General programming questions (not DB or CF)
  - Career advice, personal help, or AI interaction

Rules:
- Respond with only one word: cf, db, rag, or llm
- Do not explain, justify, or use punctuation
- Be strict and unambiguous

Example:
- Query: "List of IIT department faculty" → rag
- Query: "Explain quicksort algorithm" → qa
- Query: "What is the syllabus for DBMS?" → rag
- Query: "Find me projects done by batch 2020 - 2021?" → db
- Query: "Help me come up with a project idea" → qa
- Query: "Who is the advisor of IT Club?" → rag
- Query: "Help me debug my SQL join" → llm
- Query: "What is indexing in DBMS?" → llm
- Query: "Faculty list of IT Department" → rag
- Query: "Suggest a competitive programming strategy" → llm
- Query: "My Codeforces handle is not showing up" → cf
- Query: "List of students from session 2020-2021" → db
- Query: "Who are the SPL1 mentors?" → db
- Query: "What is the syllabus of CSE1101?" → rag
- Query: "Show me the latest SPL projects" → db
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
