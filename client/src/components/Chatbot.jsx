import { useState } from "react";
import api from "../services/api";

/* ---------- Typing Effect ---------- */
function typeText(text, setText) {
  let i = 0;
  setText("");

  const interval = setInterval(() => {
    setText(prev => prev + text[i]);
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 15);
}

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { sender: "user", text: input }]);
    const userInput = input;
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/chat/ask", {
        message: userInput
      });

      // Add empty bot message
      setMessages(prev => [...prev, { sender: "bot", text: "" }]);

      // Typing effect
      typeText(res.data.reply, typed => {
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].text = typed;
          return updated;
        });
      });

    } catch {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "AI is unavailable right now." }
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={styles.chatbox}>
      <h3>🤖 AI Assistant</h3>

      <div style={styles.messages}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
              background: m.sender === "user" ? "#00c6ff" : "#2a2a2a"
            }}
          >
            {m.text}
          </div>
        ))}
        {loading && <div style={{ color: "#aaa" }}>Typing...</div>}
      </div>

      <div style={styles.inputBox}>
        <input
          style={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask anything..."
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button style={styles.send} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

/* ---------- Styles ---------- */
const styles = {
  chatbox: {
    position: "fixed",
    right: "20px",
    bottom: "20px",
    width: "320px",
    height: "420px",
    background: "#1e1e1e",
    color: "white",
    borderRadius: "14px",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 10px 30px rgba(0,0,0,0.6)"
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "10px"
  },
  message: {
    padding: "8px 12px",
    borderRadius: "10px",
    maxWidth: "80%",
    fontSize: "14px"
  },
  inputBox: {
    display: "flex",
    gap: "8px"
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "8px",
    border: "none",
    outline: "none"
  },
  send: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    background: "#00c6ff",
    cursor: "pointer"
  }
};
