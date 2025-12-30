import { useState } from "react";
const name = localStorage.getItem("name") || "Student";

/* ===================== DASHBOARD ===================== */
export default function Dashboard() {
  const name = localStorage.getItem("name") || "Student";

  const [selected, setSelected] = useState(null);
  const [aiRoadmap, setAiRoadmap] = useState([]);
  const [loadingAI, setLoadingAI] = useState(false);

  const categories = [
  {
    title: "DSA / Competitive Programming",
    desc: "Master problem solving & algorithms",
    roadmap: "Arrays → Recursion → Trees → Graphs → DP → Contests",
    skills: ["Arrays", "Trees", "Graphs", "DP"]
  },
  {
    title: "Frontend Developer",
    desc: "Build modern UI applications",
    roadmap: "HTML → CSS → JavaScript → React → Projects",
    skills: ["HTML", "CSS", "JavaScript", "React"]
  },
  {
    title: "Backend Developer",
    desc: "Design scalable APIs",
    roadmap: "JavaScript → Node → Express → MongoDB → Auth",
    skills: ["Node.js", "Express", "MongoDB"]
  },
  {
  title: "Full Stack Developer",
  desc: "Build complete web applications",
  roadmap: "HTML → CSS → JS → React → Node → Database → Deploy",
  skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Database"]
},
  {
    title: "MERN Stack Developer",
    desc: "Frontend + Backend combined",
    roadmap: "React → Node → MongoDB → Deployment",
    skills: ["React", "Node", "MongoDB", "Git"]
  },
  {
    title: "Data Science",
    desc: "Analyze data & build ML models",
    roadmap: "Python → Statistics → Pandas → ML → Projects",
    skills: ["Python", "Statistics", "Pandas", "Machine Learning"]
  },
  {
    title: "Machine Learning Engineer",
    desc: "Build intelligent systems",
    roadmap: "Math → Python → ML → Deep Learning → Deployment",
    skills: ["Python", "ML", "TensorFlow", "PyTorch"]
  },
  {
  title: "Software Developer",
  desc: "Build scalable software applications",
  roadmap: "Programming Basics → OOP → Data Structures → System Design → Projects",
  skills: ["Java", "Python", "C++", "OOP", "DSA", "System Design"]
},
  {
    title: "Cybersecurity",
    desc: "Protect systems and networks",
    roadmap: "Networking → Linux → Security Basics → Pentesting",
    skills: ["Networking", "Linux", "Ethical Hacking"]
  },
  {
    title: "Cloud Engineer",
    desc: "Build & manage cloud infrastructure",
    roadmap: "Linux → Networking → AWS/GCP → DevOps",
    skills: ["AWS", "Docker", "Kubernetes", "Linux"]
  },
  {
    title: "DevOps Engineer",
    desc: "Automate deployment & infrastructure",
    roadmap: "Linux → CI/CD → Docker → Kubernetes",
    skills: ["CI/CD", "Docker", "Kubernetes", "Terraform"]
  },
  {
    title: "UI/UX Designer",
    desc: "Design user-friendly interfaces",
    roadmap: "Design Basics → Figma → UX Research → Portfolio",
    skills: ["Figma", "Wireframing", "User Research"]
  }
];


  const generateAIRoadmap = async () => {
    setLoadingAI(true);
    setAiRoadmap([
      "Learn fundamentals",
      "Practice daily",
      "Build projects",
      "Apply for internships/jobs"
    ]);
    setLoadingAI(false);
  };

  
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1>👋 Welcome, {name}</h1>

        <h2 style={styles.section}>🚀 Career Categories</h2>
        <div style={styles.grid}>
          {categories.map((c, i) => (
            <div
              key={i}
              style={styles.card}
              onClick={() => {
                setSelected(c);
                setAiRoadmap([]);
              }}
            >
              <h3>{c.title}</h3>
              <p style={{ color: "#aaa" }}>{c.desc}</p>
            </div>
          ))}
        </div>

        <button
          style={styles.logout}
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>

      {/* MODAL */}
      {selected && (
        <div style={styles.overlay} onClick={() => setSelected(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>{selected.title}</h2>
            <p>{selected.roadmap}</p>

            <ul>
              {selected.skills.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>

            <button
              style={styles.aiBtn}
              onClick={generateAIRoadmap}
              disabled={loadingAI}
            >
              🤖 {loadingAI ? "Generating..." : "Generate Roadmap"}
            </button>

            {aiRoadmap.length > 0 && (
              <ul>
                {aiRoadmap.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            )}

            <button style={styles.close} onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      <CareerChatbot />
    </div>
  );
}

/* ===================== CHATBOT ===================== */
function CareerChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 Ask me anything — career, life, studies." }
  ]);
  const [input, setInput] = useState("");

  const send = async () => {
    if (!input.trim()) return;

    const text = input;
    setInput("");
    setMessages((m) => [...m, { from: "user", text }]);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      setMessages((m) => [...m, { from: "bot", text: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { from: "bot", text: "⚠️ Chat server offline." }
      ]);
    }
  };

  return (
    <>
      <button style={chat.toggle} onClick={() => setOpen(!open)}>💬</button>

      {open && (
        <div style={chat.box}>
          <h4 style={{ textAlign: "center" }}>🤖 Assistant</h4>

          <div style={chat.msgs}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  ...chat.msg,
                  alignSelf: m.from === "user" ? "flex-end" : "flex-start",
                  background: m.from === "user" ? "#00c6ff" : "#333"
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div style={chat.inputBox}>
            <input
              style={chat.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button style={chat.send} onClick={send}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}

/* ===================== STYLES ===================== */
const styles = {
  page: {
    minHeight: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
    color: "white"
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "40px"
  },
  section: { marginTop: "40px", marginBottom: "20px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
    gap: "20px"
  },
  card: {
    background: "#1e1e1e",
    padding: "20px",
    borderRadius: "14px",
    cursor: "pointer"
  },
  logout: {
  position: "fixed",
  top: "20px",
  right: "20px",
  padding: "10px 22px",
  background: "#ff4d4d",
  border: "none",
  borderRadius: "10px",
  color: "white",
  cursor: "pointer",
  zIndex: 1000
},
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    background: "#1e1e1e",
    padding: "30px",
    borderRadius: "14px",
    maxWidth: "420px",
    width: "100%"
  },
  aiBtn: {
    marginTop: "15px",
    width: "100%",
    padding: "10px",
    background: "#00c6ff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },
  close: {
    marginTop: "20px",
    padding: "10px",
    background: "#22c55e",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

const chat = {
  toggle: {
    position: "fixed",
    right: "25px",
    bottom: "25px",
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    background: "#00c6ff",
    border: "none",
    fontSize: "24px",
    cursor: "pointer"
  },
  box: {
  position: "fixed",
  right: "20px",
  bottom: "80px",
  width: "400px",     // ⬅ increased width
  height: "550px",    // ⬅ increased height
  background: "#1e1e1e",
  borderRadius: "16px",
  padding: "18px",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
  zIndex: 9999
},

  msgs: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  msg: {
    padding: "8px 12px",
    borderRadius: "10px",
    maxWidth: "85%",
    color: "white"
  },
  inputBox: { display: "flex", gap: "6px" },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "8px",
    border: "none"
  },
  send: {
    padding: "8px 12px",
    background: "#00c6ff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};
