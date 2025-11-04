import React, { useEffect, useRef, useState } from "react";

const MODEL = import.meta.env.VITE_GEMINI_MODEL || "gemini-2.0-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const Chatbot = ({ open, onClose }) => {
  const [messages, setMessages] = useState([
    { role: "model", text: "Hi, I’m Iqra. How can I help you today?", ts: Date.now() },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const [hasAvatar, setHasAvatar] = useState(false);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setHasAvatar(true);
    img.onerror = () => setHasAvatar(false);
    img.src = "/girl.png";
  }, []);

  useEffect(() => {
    if (open) document.body.classList.add('ai-cursor-off');
    else document.body.classList.remove('ai-cursor-off');
    return () => document.body.classList.remove('ai-cursor-off');
  }, [open]);

  if (!open) return null;

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    setMessages((m) => [...m, { role: "user", text: trimmed, ts: Date.now() }]);
    setInput("");
    if (!apiKey) {
      setMessages((m) => [
        ...m,
        { role: "model", text: "Gemini API key missing. Set VITE_GEMINI_API_KEY in your env.", ts: Date.now() },
      ]);
      return;
    }

    setLoading(true);
    try {
      const persona = `You are Iqra, an AI Developer & Full Stack Developer based in Pakistan. Speak as Iqra in first person. Be confident, creative, and modern.
Bio: I’m passionate about building intelligent systems, creating seamless web experiences, and developing end-to-end scalable applications using modern technologies.
Contact: Email: aiqra9786@gmail.com, LinkedIn: https://www.linkedin.com/in/iqra-ali-178531254/`;
      const res = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: persona },
                { text: messages.map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.text}`).join("\n") + `\nUser: ${trimmed}` },
              ],
              role: "user",
            },
          ],
        }),
      });

      const data = await res.json();
      const output = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
      setMessages((m) => [...m, { role: "model", text: output, ts: Date.now() }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "model", text: "Network error. Please try again.", ts: Date.now() }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className='ai-chat-overlay' onClick={onClose}>
      <div className='ai-chat' onClick={(e) => e.stopPropagation()}>
        <div className='ai-chat-header'>
          <div className='ai-chat-title flex items-center gap-2'>
            <span className={`ai-avatar${hasAvatar ? " ai-avatar-img" : ""}`}>I</span>
            <span>Iqra Ali</span>
          </div>
          <button className='ai-modal-close' onClick={onClose}>✕</button>
        </div>
        <div className='ai-chat-list' ref={listRef}>
          {messages.map((m, i) => (
            <div key={i} className={`ai-chat-msg ${m.role === "user" ? "ai-chat-user" : "ai-chat-model"}`}>
              <div>{m.text}</div>
              {m.ts && (
                <div className='ai-msg-time'>{new Date(m.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              )}
            </div>
          ))}
          {loading && <div className='ai-chat-typing'>Thinking…</div>}
        </div>
        <div className='ai-chat-input'>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder='Type a message…'
            ref={inputRef}
          />
          <button onClick={sendMessage} className='ai-btn'><span className='dot' />Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;


