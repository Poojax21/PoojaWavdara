'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, Minimize2 } from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  "What are your strongest skills?",
  "Tell me about your projects",
  "Are you available for hire?",
  "What's your tech stack?",
  "Tell me about yourself",
];

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.2)' }}
      >
        <Bot size={14} style={{ color: 'var(--emerald)' }} />
      </div>
      <div
        className="px-4 py-3 rounded-2xl rounded-bl-sm"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="flex gap-1 items-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: 'var(--emerald)',
                animation: `typingPulse 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
        <style>{`
          @keyframes typingPulse {
            0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
            40% { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
}

function Message({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
        style={
          isUser
            ? { background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }
            : { background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.2)' }
        }
      >
        {isUser ? (
          <User size={12} style={{ color: 'rgba(255,255,255,0.7)' }} />
        ) : (
          <Bot size={14} style={{ color: 'var(--emerald)' }} />
        )}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
          isUser ? 'rounded-2xl rounded-br-sm' : 'rounded-2xl rounded-bl-sm'
        }`}
        style={
          isUser
            ? {
                background: 'rgba(52,211,153,0.15)',
                border: '1px solid rgba(52,211,153,0.2)',
                color: 'white',
              }
            : {
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.85)',
              }
        }
      >
        {msg.content}
      </div>
    </div>
  );
}

export default function ChatWidget({ config }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: config.chat.greeting },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const hasOpenedRef = useRef(false);

  // Show unread indicator after 8s
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasOpenedRef.current) setHasUnread(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      hasOpenedRef.current = true;
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || isTyping) return;

    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.filter((m) => m.role !== 'system'),
          systemPrompt: config.chat.persona,
        }),
      });

      const data = await res.json();
      const reply = data.content || data.error || "I'm having trouble right now. Please try again!";

      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: "Connection issue — please try again in a moment!" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-widget">
      {/* Chat Panel */}
      {isOpen && (
        <div
          className="chat-container mb-4"
          style={{
            animation: 'chatOpen 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            display: minimized ? 'none' : 'flex',
          }}
        >
          <style>{`
            @keyframes chatOpen {
              from { opacity: 0; transform: translateY(20px) scale(0.95); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>

          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.25)' }}
              >
                <Sparkles size={16} style={{ color: 'var(--emerald)' }} />
              </div>
              <div>
                <div className="text-white text-sm font-semibold" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                  {config.firstName}'s AI Assistant
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="status-pulse" style={{ width: 5, height: 5 }} />
                  <span className="label-caps text-emerald-400" style={{ fontSize: 8 }}>Online · Powered by AI</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMinimized(true)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-600 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Minimize"
              >
                <Minimize2 size={14} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-600 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages flex-1">
            {messages.map((msg, i) => (
              <Message key={i} msg={msg} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested questions (only at start) */}
          {messages.length === 1 && (
            <div
              className="px-3 pb-2 flex-shrink-0 border-t"
              style={{ borderColor: 'rgba(255,255,255,0.05)' }}
            >
              <p className="label-caps text-zinc-700 mt-2 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_QUESTIONS.slice(0, 3).map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    disabled={isTyping}
                    className="px-3 py-1.5 rounded-full text-xs text-zinc-400 hover:text-white transition-all duration-200 hover:border-white/20 disabled:opacity-50"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      fontFamily: 'var(--font-dm-sans)',
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div
            className="flex items-center gap-2 p-3 border-t flex-shrink-0"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              disabled={isTyping}
              className="flex-1 px-4 py-2.5 rounded-xl text-white text-sm outline-none disabled:opacity-50 transition-all"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontFamily: 'var(--font-dm-sans)',
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-40 hover:scale-105"
              style={{ background: 'var(--emerald)' }}
              aria-label="Send"
            >
              <Send size={15} style={{ color: '#18181B' }} />
            </button>
          </div>
        </div>
      )}

      {/* Minimized bar */}
      {isOpen && minimized && (
        <div
          className="mb-4 flex items-center justify-between px-4 py-3 rounded-2xl cursor-pointer hover:border-white/15 transition-all"
          style={{
            background: 'rgba(9,9,11,0.95)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
            minWidth: 220,
          }}
          onClick={() => setMinimized(false)}
        >
          <div className="flex items-center gap-2">
            <Sparkles size={14} style={{ color: 'var(--emerald)' }} />
            <span className="text-white text-sm font-medium" style={{ fontFamily: 'var(--font-dm-sans)' }}>
              AI Assistant
            </span>
            <span className="label-caps text-zinc-600">· {messages.length - 1} messages</span>
          </div>
          <X
            size={14}
            className="text-zinc-600 hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); setMinimized(false); }}
          />
        </div>
      )}

      {/* FAB Toggle Button */}
      <button
        onClick={() => { setIsOpen(!isOpen); setMinimized(false); }}
        className="relative flex items-center gap-3 px-5 py-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
        style={{
          background: isOpen ? '#18181B' : 'var(--emerald)',
          boxShadow: isOpen ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(52,211,153,0.3)',
          fontFamily: 'var(--font-dm-sans)',
        }}
        aria-label="Toggle AI Chat"
      >
        {isOpen ? (
          <>
            <X size={18} style={{ color: 'white' }} />
            <span className="text-white text-sm font-semibold">Close</span>
          </>
        ) : (
          <>
            <MessageCircle size={18} style={{ color: '#18181B' }} />
            <span className="text-zinc-900 text-sm font-semibold">Chat with AI</span>
          </>
        )}

        {/* Unread badge */}
        {hasUnread && !isOpen && (
          <span
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ background: '#EF4444', fontSize: 10 }}
          >
            1
          </span>
        )}
      </button>
    </div>
  );
}
