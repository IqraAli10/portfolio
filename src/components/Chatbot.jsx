import React, { useEffect, useRef, useState } from "react";

const Chatbot = ({ open, onClose }) => {
  const [messages, setMessages] = useState([
    { role: "model", text: "Hi, I’m Iqra. How can I help you today?", ts: Date.now() },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const [hasAvatar, setHasAvatar] = useState(false);
  const [kbOffset, setKbOffset] = useState(0);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
        setTimeout(() => {
          inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }, 200);
    }
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

  // Track mobile keyboard height using VisualViewport and pad chat bottom so input stays visible
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const onVV = () => {
      const offset = Math.max(0, window.innerHeight - vv.height);
      setKbOffset(offset);
    };
    onVV();
    vv.addEventListener('resize', onVV);
    vv.addEventListener('scroll', onVV);
    return () => {
      vv.removeEventListener('resize', onVV);
      vv.removeEventListener('scroll', onVV);
    };
  }, []);

  if (!open) return null;

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    const conversation = [...messages, { role: "user", text: trimmed }]
      .filter((message) => message.role === "user" || message.role === "model")
      .map(({ role, text }) => ({ role, text }));
    setMessages((current) => [...current, { role: "user", text: trimmed, ts: Date.now() }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversation }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "The AI service is temporarily unavailable. Please try again.");
      setMessages((current) => [...current, { role: "model", text: data.reply || "Sorry, I couldn't generate a response.", ts: Date.now() }]);
    } catch (error) {
      setMessages((current) => [...current, { role: "model", text: error.message || "Network error. Please try again.", ts: Date.now() }]);
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
      <div className='ai-chat' onClick={(e) => e.stopPropagation()} style={{ paddingBottom: `calc(max(env(safe-area-inset-bottom), 0px) + ${kbOffset}px)` }}>
        <div className='ai-chat-header'>
          <div className='ai-chat-title flex items-center gap-2'>
            <span className={`ai-avatar${hasAvatar ? " ai-avatar-img" : ""}`}>I</span>
            <span>Iqra Ali</span>
          </div>
          <button className='ai-modal-close' onClick={onClose}>✕</button>
        </div>
        <div className='ai-chat-list' ref={listRef}>
          {messages.map((m, i) => (
            <div key={i} className={`ai-chat-row ${m.role === "user" ? "user" : "model"}`}>
              {m.role !== "user" && <span className='ai-avatar ai-avatar-img' />}
              <div className={`ai-chat-msg ${m.role === "user" ? "ai-chat-user" : "ai-chat-model"}`}>
                <div>{m.text}</div>
                {m.ts && (
                  <div className='ai-msg-time'>{new Date(m.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                )}
              </div>
            </div>
          ))}
          {loading && <div className='ai-chat-typing'>Thinking…</div>}
        </div>
        <div className='ai-chat-input'>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            onFocus={() => {
              setTimeout(() => {
                inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              }, 100);
            }}
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


