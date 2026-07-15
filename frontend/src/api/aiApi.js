import api from "./axios";

export const sendMessageToAI = async (message) => {
  try {
    const response = await api.post("/ai/chat", {
      message,
    });

    return response.data;
  } catch (error) {
    console.error("AI Error:", error);

    throw (
      error.response?.data || {
        detail: "Something went wrong.",
      }
    );
  }
};