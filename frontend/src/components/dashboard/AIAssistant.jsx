import { useState } from "react";
import { Bot, SendHorizonal, Sparkles, Mic } from "lucide-react";
import api from "../../api/axios";


function AIAssistant({ setInteractionData }) {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "👋 Hi! I'm your AI CRM Assistant. Tell me about your doctor interaction.",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMessage },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const res = await api.post("/ai/chat", { message: userMessage });

      if (res.data?.data) {

        const rawDate = res.data.data.date || "";
        const rawTime = res.data.data.time || "";

        let formattedDate = "";
        let formattedTime = "";

        // 23/04/2026 -> 2026-04-23
        if (rawDate.includes("/")) {
          const [day, month, year] = rawDate.split("/");
          formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        }

        // 4:55pm -> 16:55
        if (rawTime) {
          const dateObj = new Date(`2000-01-01 ${rawTime}`);
          if (!isNaN(dateObj)) {
            formattedTime = dateObj.toTimeString().slice(0, 5);
          }
        }

        console.log("DATE =>", formattedDate);
        console.log("TIME =>", formattedTime);

        setInteractionData((prev) => ({

          ...prev,

          ...(res.data.data.doctor_name && {
            doctorName: res.data.data.doctor_name,
          }),

          ...(res.data.data.hospital && {
            hospital: res.data.data.hospital,
          }),

          ...(res.data.data.product && {
            product: res.data.data.product,
          }),

          ...(formattedDate && {
            date: formattedDate,
          }),

          ...(formattedTime && {
            time: formattedTime,
          }),

          ...(res.data.data.summary && {
            notes: res.data.data.summary,
          }),

          ...(res.data.data.discussion && {
            notes: res.data.data.discussion,
          }),

        }));
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: res.data.message || "No response received" },
      ]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "❌ Failed to connect with AI." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[630px] w-full flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-3 sm:px-6 py-3 sm:py-5">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
            <Bot size={18} className="sm:hidden" />
            <Bot size={22} className="hidden sm:block" />
          </div>

          <div className="min-w-0">
            <h2 className="truncate font-bold text-slate-800 text-sm sm:text-base">
              AI Assistant
            </h2>
            <p className="truncate text-xs sm:text-sm text-slate-500">
              Groq + LangGraph
            </p>
          </div>
        </div>

        <Sparkles size={18} className="shrink-0 text-blue-600 sm:h-5 sm:w-5" />
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-3 sm:p-5"
        style={{
          scrollbarWidth: "thin",
        }}
      >
        <div className="space-y-3 sm:space-y-4 min-h-full">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] lg:max-w-[65%] break-words rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm ${msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="max-w-[85%] sm:max-w-[75%] rounded-xl bg-slate-100 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-slate-500">
              🤖 AI is thinking...
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-slate-200 p-3 sm:p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder="Describe your interaction..."
            className="w-full flex-1 rounded-xl border border-slate-300 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={startListening}
            type="button"
            className={`flex h-11 sm:h-12 w-full sm:w-12 items-center justify-center rounded-xl text-white ${isListening ? "bg-red-500" : "bg-green-600"
              }`}
          >
            <Mic size={20} />
          </button>

          <button
            onClick={handleSend}
            disabled={loading}
            className="flex h-11 sm:h-12 w-full sm:w-12 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            <SendHorizonal size={18} className="sm:hidden" />
            <SendHorizonal size={20} className="hidden sm:block" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIAssistant;