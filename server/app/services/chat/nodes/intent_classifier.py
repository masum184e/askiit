import re
from textwrap import dedent

from langchain_core.messages import HumanMessage, SystemMessage

from app.logger import get_logger, StepTimer
from app.services.chat.llm_model import model
from app.services.chat.utils.query import content_to_text, extract_query
from app.services.chat.utils.types import GraphState

log = get_logger(__name__)

NODE_NAME = "intent_classifier"
DEFAULT_INTENT = "qa"

_THINK_RE = re.compile(r"<think>.*?</think>", re.DOTALL)
_INTENT_RE = re.compile(r"\b(cf|rag|db|qa)\b")

SYSTEM_PROMPT = dedent("""\
You are a strict query classifier.
Your task is to classify the user query into exactly one of these four categories:

- "cf": Codeforces related queries (profiles, handles, problems, contests, ratings)
  - Codeforces user profiles or handles
  - Codeforces problems, contests, or ratings
  - Solving, explaining, or comparing Codeforces problems
  - Participation history or performance on Codeforces

- "rag": queries answerable from the university/department knowledge base:
  - Faculty members, teachers, departments, administrative structure
  - Course syllabus, curriculum, course plans, course materials
  - Academic syllabus or course materials
  - Any other information that can be found in the department's knowledge base
  - Faculty members, departments, or administrative structure
  - Course syllabus, curriculum, or course plans
  - Clubs (e.g., IT Club), labs, academic facilities
  - Anything found in official departmental documents

- "db": queries answered by the structured student database:
  - Retrieving students, SPL projects, achievements, papers, personal interests
  - Filtering or searching by batch/session, student ID, mentor
  - Listing SPL projects or students by filters

- "qa": everything else:
  - General programming questions and concept explanations (including SQL help
    that is not about the student database)
  - Brainstorming, writing, ideation, creative help
  - Career advice, personal help, general AI interaction

Rules:
- Respond with only one word: cf, db, rag, or qa
- Do not explain, justify, or use punctuation
- Be strict and unambiguous

Examples:
- Query: "List of IIT department faculty" → rag
- Query: "Who is the advisor of IT Club?" → rag
- Query: "What is the syllabus of CSE1101?" → rag
- Query: "Find me projects done by batch 2020 - 2021" → db
- Query: "List of students from session 2020-2021" → db
- Query: "Who are the SPL1 mentors?" → db
- Query: "Show me the latest SPL projects" → db
- Query: "My Codeforces handle is not showing up" → cf
- Query: "What is the rating of tourist?" → cf
- Query: "Upcoming Codeforces contests" → cf
- Query: "Explain quicksort algorithm" → qa
- Query: "Help me debug my SQL join" → qa
- Query: "What is indexing in DBMS?" → qa
- Query: "Help me come up with a project idea" → qa
- Query: "Suggest a competitive programming strategy" → qa
""")


def parse_intent(text: str) -> str:
    text = _THINK_RE.sub("", text).lower()
    match = _INTENT_RE.search(text)
    return match.group(1) if match else DEFAULT_INTENT


async def intent_classifier_node(state: GraphState) -> GraphState:
    query = extract_query(state, prefer_normalized=True)
    intent = DEFAULT_INTENT

    if not query:
        log.warning("%s | empty query, defaulting to %s", NODE_NAME, DEFAULT_INTENT)
    else:
        log.debug("%s | query=%r", NODE_NAME, query)
        try:
            with StepTimer(log, f"{NODE_NAME}.ainvoke"):
                response = await model.ainvoke([
                    SystemMessage(content=SYSTEM_PROMPT),
                    HumanMessage(content=query),
                ])
            raw = content_to_text(response.content).strip()
            intent = parse_intent(raw)
            log.debug("%s | query=%r raw=%r -> %s", NODE_NAME, query, raw, intent)
        except Exception:
            log.exception("%s | classification failed, defaulting to %s", NODE_NAME, DEFAULT_INTENT)

    log.info("%s | intent=%s", NODE_NAME, intent)

    trace = [
        *state.get("trace", []),
            {
                "step": NODE_NAME,
                "intent": intent
            }
        ]
        
    return {
        **state,
        "intent": intent,
        "trace": trace,
    }
