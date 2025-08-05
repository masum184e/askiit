"use client";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./markdown.module.css";

const Page = () => {
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<{ role: "user" | "ai"; content: string }[]>(
    []
  );
  const handleSuggestionClick = async (text: string) => {
    setInput(text);
    await handleSend(text);
  };

  const handleSend = async (message?: string) => {
    const contentToSend = message ?? input;
    if (!contentToSend.trim()) return;

    console.log(`Sending: "${contentToSend}"`);
    const userMessage = { role: "user" as const, content: contentToSend };
    setChat((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: contentToSend }),
      });

      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      const data = await res.json();
      const aiResponse = data.answer ?? "No answer received";

      setChat((prev) => [...prev, { role: "ai", content: aiResponse }]);
    } catch (error) {
      console.error(error);
      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          content: "I'm currently unavailable. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const suggestions = [
    {
      title: "Find Question Papers",
      subtitle: "Show me Data Structures papers from 2022-2023",
      color: "blue",
      icon: (
        <svg
          className="w-4 h-4 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          ></path>
        </svg>
      ),
    },
    {
      title: "Browse Student Projects",
      subtitle: "Find web development projects by Batch 2022",
      color: "green",
      icon: (
        <svg
          className="w-4 h-4 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          ></path>
        </svg>
      ),
    },
    {
      title: "Connect with Students",
      subtitle: "Help me find alumni working in software companies",
      color: "purple",
      icon: (
        <svg
          className="w-5 h-5 text-purple-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 7a4 4 0 11-8 0 4 4 0 018 0zm6 13v-2a4 4 0 00-3-3.87M4 20v-2a4 4 0 013-3.87"
          />
        </svg>
      ),
    },
    {
      title: "Get Academic Help",
      subtitle: "Explain database normalization with examples",
      color: "orange",
      icon: (
        <svg
          className="w-4 h-4 text-orange-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          ></path>
        </svg>
      ),
    },
  ];

  return (
    <>
      <div
        className={`min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 ${
          chat.length === 0 ? "flex flex-col items-center justify-center" : ""
        } `}
      >
        <div className="max-w-4xl w-full mx-auto">
          {chat.length === 0 && (
            <div className="-mt-20 space-y-8 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-gray-700">
                  How can I help you today?
                </h1>
                <p className="text-lg text-gray-600">
                  Ask me anything, and I{"'"}ll do my best to help you learn and
                  solve problems.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {suggestions.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    className="example-prompt p-4 text-left border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group"
                    onClick={() => handleSuggestionClick(item.subtitle)}
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-8 h-8 bg-${item.color}-100 rounded-lg flex items-center justify-center group-hover:bg-${item.color}-200 transition-colors duration-200`}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-700">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          {chat.length !== 0 && (
            <div className="pt-[95px] p-4 h-[calc(100vh-100px)] overflow-y-auto space-y-3 scrollable-hidden">
              {chat.map((msg, i) => (
                <article
                  key={i}
                  className={`${
                    styles.markdown
                  } text-justify px-4 rounded-2xl shadow max-w-[75%] text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-indigo-100  self-end ml-auto"
                      : "bg-gray-100 self-start mr-auto"
                  }`}
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                </article>
              ))}

              {loading && (
                <div className="flex items-center space-x-2 mt-2 ml-2">
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce delay-300"></div>
                </div>
              )}

              <div ref={endOfMessagesRef} />
            </div>
          )}
        </div>
      </div>
      {/* Input Area */}
      <div className="border-t border-gray-300 backdrop-blur-sm fixed bottom-0 left-64 right-0">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="relative">
            <textarea
              placeholder="Message AI Assistant..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full resize-none border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 max-h-32"
              rows={1}
            />
            <button
              onClick={async() => await handleSend(input)}
              disabled={loading || !input.trim()}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-600 rounded-lg transition-all duration-200"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-2 text-center">
            AI can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </>
  );
};

export default Page;
