import requests
from app.services.chat.utils.types import GraphState

def cf_node(state: GraphState) -> GraphState:
    # Get the handle from normalized query or from message content
    query = state.get("normalized_query", "")
    
    # Basic validation: assume the handle is the entire query
    handle = query.strip()

    url = f"https://codeforces.com/api/user.info?handles={handle}"
    print(f"CF Node Executed: {handle}")

    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        data = response.json()

        if data["status"] != "OK":
            raise Exception(data.get("comment", "Unknown error"))

        user_info = data["result"][0]

        return {
            **state,
            "final_response": (
                f"Codeforces user: {user_info['handle']}\n"
                f"Rating: {user_info.get('rating', 'Unrated')}\n"
                f"Max Rating: {user_info.get('maxRating', 'N/A')}\n"
                f"Rank: {user_info.get('rank', 'N/A')}\n"
                f"Contribution: {user_info.get('contribution', 0)}"
            ),
            "trace": state.get("trace", []) + [{
                "step": "cf_node",
                "answer": user_info
            }]
        }

    except Exception as e:
        error_msg = f"Failed to fetch Codeforces user data: {str(e)}"
        return {
            **state,
            "final_response": error_msg,
            "trace": state.get("trace", []) + [{
                "step": "cf_node",
                "answer": {"error": str(e)}
            }]
        }
