import json

from app.langgraph_agent.llm import llm
from app.langgraph_agent.prompts import SYSTEM_PROMPT

from app.db.database import SessionLocal

from app.langgraph_agent.tools.search_hcp_tool import search_hcp
from app.langgraph_agent.tools.create_hcp_tool import create_hcp
from app.langgraph_agent.tools.create_interaction_tool import create_interaction


def extract_entities(state):

    prompt = f"""
{SYSTEM_PROMPT}

User Message:

{state["user_message"]}
"""

    response = llm.invoke(prompt)

    content = response.content.strip()

    print("\n========== RAW RESPONSE ==========")
    print(content)
    print("==================================")

    # Remove markdown if present
    if content.startswith("```json"):
        content = content.replace("```json", "").replace("```", "").strip()

    elif content.startswith("```"):
        content = content.replace("```", "").strip()

    try:
        data = json.loads(content)

        print("\n========== PARSED JSON ==========")
        print(data)
        print("=================================\n")

    except json.JSONDecodeError:

        print("\n========== JSON ERROR ==========")
        print(content)
        print("================================\n")

        state["response"] = content
        return state

    state["doctor_name"] = data.get("doctor_name") or state.get("doctor_name", "")
    state["hospital"] = data.get("hospital") or state.get("hospital", "")
    state["product"] = data.get("product") or state.get("product", "")
    state["interaction_type"] = data.get("interaction_type") or state.get("interaction_type", "")

    state["date"] = data.get("date") or state.get("date", "")
    state["time"] = data.get("time") or state.get("time", "")

    state["discussion"] = data.get("discussion") or state.get("discussion", "")
    state["summary"] = data.get("summary") or state.get("summary", "")
    state["sentiment"] = data.get("sentiment") or state.get("sentiment", "")
    state["follow_up"] = data.get("follow_up") or state.get("follow_up", "")

    state["samples_requested"] = (
        data.get("samples_requested")
        if data.get("samples_requested") is not None
        else state.get("samples_requested", 0)
    )

    state["response"] = "Entity Extraction Successful"

    return state
    state["response"] = "Entity Extraction Successful"

    return state

def search_hcp_node(state):
    """
    Search HCP.
    If not found, automatically create one.
    """

    doctor_name = state.get("doctor_name")

    if not doctor_name:
        state["hcp_id"] = None
        state["response"] = "Doctor name not found."
        return state

    db = SessionLocal()

    try:

        # Search existing HCP
        hcp = search_hcp(db, doctor_name)

        # Auto Create HCP
        if not hcp:

            print("\n========== HCP NOT FOUND ==========")
            print("Creating New HCP...")
            print("===================================\n")

            hcp = create_hcp(
                db=db,
                doctor_name=doctor_name,
                hospital=state.get("hospital") or "Unknown Hospital",
            )

            print("\n========== NEW HCP CREATED ==========")
            print(f"HCP ID      : {hcp.id}")
            print(f"Doctor Name : {hcp.doctor_name}")
            print("=====================================\n")

        else:

            print("\n========== HCP FOUND ==========")
            print(f"HCP ID      : {hcp.id}")
            print(f"Doctor Name : {hcp.doctor_name}")
            print("===============================\n")

        state["hcp_id"] = hcp.id
        state["response"] = "HCP Ready"

    except Exception as e:

        state["hcp_id"] = None
        state["response"] = f"Database Error: {str(e)}"

        print("\n========== DATABASE ERROR ==========")
        print(str(e))
        print("====================================\n")

    finally:
        db.close()

    return state


def create_interaction_node(state):
    """
    Save interaction into database.
    """

    if not state.get("hcp_id"):

        state["response"] = "Interaction not saved because HCP was not found."

        return state

    db = SessionLocal()

    try:

        interaction = create_interaction(
            db=db,
            hcp_id=state["hcp_id"],
            interaction_type=state.get("interaction_type") or "Doctor Visit",
            discussion=state.get("discussion") or "",
            summary=state.get("summary") or "",
            sentiment=state.get("sentiment") or "",
            follow_up=state.get("follow_up") or "",
            samples_requested=state.get("samples_requested") or 0,
        )

        state["interaction_id"] = interaction.id
        state["response"] = "Interaction Saved Successfully"

        print("\n========== INTERACTION SAVED ==========")
        print(f"Interaction ID : {interaction.id}")
        print(f"HCP ID         : {interaction.hcp_id}")
        print("=======================================\n")

    except Exception as e:

        state["response"] = f"Database Error: {str(e)}"

        print("\n========== SAVE ERROR ==========")
        print(str(e))
        print("================================\n")

    finally:
        db.close()

    return state