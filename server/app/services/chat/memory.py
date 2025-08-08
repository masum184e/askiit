from langgraph.checkpoint.memory import InMemorySaver

checkpointer = InMemorySaver()

def get_config(thread_id):
    print(thread_id)
    return {"configurable": {"thread_id": thread_id}}