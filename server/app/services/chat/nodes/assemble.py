from app.services.chat.utils.types import GraphState
from app.services.chat.model import model

def assemble_node(state: GraphState) -> GraphState:
    system_prompt = """
        You are a precise and expert Markdown formatter.
        
        Given a raw, unstructured answer string, your job is to reformat it into clean, readable, and well-organized Markdown. You must not add or invent any content—preserve every word from the input. Just reorganize and format what’s provided.
        
        Your responsibilities:
        
        - Use appropriate Markdown elements: headings, bullet points, numbered lists, tables, code blocks, quotes, and links.
        - Remove redundant phrases and irrelevant clutter only if repeated or meaningless, but do not paraphrase or interpret.
        - Do not expand or summarize. Do not include extra explanations or assumptions.
        - Output only Markdown-formatted content, with no extra commentary or notes.
        
        Forbidden Actions:
        
        - Do not paraphrase, summarize, or interpret the content
        - Do not introduce transitions like “In summary” or “To begin with”
        - Do not change any meaning or add clarification
        
        Important rules:
        
        - Keep all original information intact unless it is repeated or purely noise.
        - Never invent or add new words, transitions, or filler text.
        - Always prioritize structure and clarity using Markdown syntax only.
    """

    raw_answer = state.get("final_response") or state.get("rag_answer") or "No answer found."
    print(f"Assemble Node Input: {raw_answer}")

    response = model.invoke([
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": f"Format the following raw answer:\n\n{raw_answer}"}
    ])

    trace = state.get("trace", [])
    trace.append({"step": "assemble", "formatted_answer": response.content})
    print(f"Assemble Node Output: {response.content}")

    return {
        **state,
        "final_response": response.content,
        "trace": trace,
    }
