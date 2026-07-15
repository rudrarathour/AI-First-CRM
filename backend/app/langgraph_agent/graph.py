from langgraph.graph import END
from langgraph.graph import StateGraph

from app.langgraph_agent.nodes import (
    extract_entities,
    search_hcp_node,
    create_interaction_node,
)

from app.langgraph_agent.state import CRMState

workflow = StateGraph(CRMState)

# Step 1 - Extract entities
workflow.add_node(
    "extract_entities",
    extract_entities
)

# Step 2 - Search HCP
workflow.add_node(
    "search_hcp",
    search_hcp_node
)

# Step 3 - Create Interaction
workflow.add_node(
    "create_interaction",
    create_interaction_node
)

# Entry Point
workflow.set_entry_point(
    "extract_entities"
)

# Workflow
workflow.add_edge(
    "extract_entities",
    "search_hcp"
)

workflow.add_edge(
    "search_hcp",
    "create_interaction"
)

workflow.add_edge(
    "create_interaction",
    END
)

graph = workflow.compile()