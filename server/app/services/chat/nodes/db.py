from langchain_community.utilities import SQLDatabase
from langchain_community.agent_toolkits import SQLDatabaseToolkit
from langchain_community.agent_toolkits.sql.base import create_sql_agent
from app.services.chat.model import model
from app.services.chat.utils.types import GraphState
from decouple import config

db_uri = config("DB_URI_SYNC")
db = SQLDatabase.from_uri(db_uri)

toolkit = SQLDatabaseToolkit(db=db, llm=model)

agent_executor = create_sql_agent(
    llm=model,
    toolkit=toolkit,
    verbose=True
)

def db_node(state: GraphState) -> GraphState:
    user_input = state.get("normalized_query") or state.get("user_query")[-1].content

    try:
        result = agent_executor.invoke({"input": user_input})
        output = result.get("output", "No result returned.")
    except Exception as e:
        output = f"An error occurred while querying the database: {str(e)}"
        result = None

    print("DB Node Executed:", output)

    return {
        **state,
        "retrieved_db": result,
        "db_answer": output,
        "final_response": output,
        "trace": state.get("trace", []) + [{"step": "db_node", "answer": output}]
    }
