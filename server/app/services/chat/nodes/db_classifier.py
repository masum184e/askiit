from app.services.chat.utils.types import GraphState
from app.services.chat.model import model

def db_classifier(state: GraphState) -> GraphState:
    query = state.get("normalized_query", "").strip()

    system_prompt = """
You are a strict classifier.

Your task is to classify the user query into one of the following two categories:

- "cf" — if the query is related to Codeforces:
    - Codeforces user profiles, handles, ratings, ranks
    - Codeforces contests or problems
    - Anything explicitly mentioning Codeforces

- "other" — for everything else:

Respond with only one word: **cf** or **other**

Do not explain. Do not add punctuation or extra text.
"""

    response = model.invoke([
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": query}
    ])

    intent = response.content.strip().lower()
    print(f"Classifier Node (cf/assemble): {intent}")

    return {
        **state,
        "intent": intent,
        "trace": state.get("trace", []) + [{
            "step": "classifier_cf_or_assemble",
            "intent": intent
        }]
    }
