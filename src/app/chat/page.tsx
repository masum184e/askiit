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
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input };
    setChat((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      const aiResponse = data.answer ?? "No answer received";
      console.log("AI Response:", aiResponse);

      setChat((prev) => [...prev, { role: "ai", content: aiResponse }]);

      // if (!res.body) throw new Error("ReadableStream not supported");

      // const reader = res.body.getReader();
      // const decoder = new TextDecoder();
      // let done = false;
      // let aiResponse = "";

      // // Append AI message placeholder
      // setChat((prev) => [...prev, { role: "ai" as const, content: "" }]);

      // while (!done) {
      //   const { value, done: doneReading } = await reader.read();
      //   done = doneReading;
      //   if (value) {
      //     aiResponse += decoder.decode(value);
      //     setChat((prev) => {
      //       // Replace last AI message content with updated text
      //       const newChat = [...prev];
      //       newChat[newChat.length - 1] = { role: "ai", content: aiResponse };
      //       return newChat;
      //     });
      //   }
      // }
    } catch (error: unknown) {
      console.error(error);
      setChat((prev) => [
        ...prev,
        { role: "ai", content: "Error: Something went wrong." },
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
  }, [chat, loading]);

  return (
    <div>
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-4xl w-full  space-y-8 mb-8">
          {chat.length === 0 && (
            <div className="mt-12 mb-16 space-y-8 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">
                  How can I help you today?
                </h1>
                <p className="text-lg text-gray-600">
                  Ask me anything, and I{"'"}ll do my best to help you learn and
                  solve problems.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                <button className="example-prompt p-4 text-left border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
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
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Explain a concept
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Help me understand React hooks with examples
                      </p>
                    </div>
                  </div>
                </button>

                <button className="example-prompt p-4 text-left border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
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
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Write code</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Create a Python function to sort a list
                      </p>
                    </div>
                  </div>
                </button>

                <button className="example-prompt p-4 text-left border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-200">
                      <svg
                        className="w-4 h-4 text-purple-600"
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
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Debug an issue
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Why is my CSS flexbox not working?
                      </p>
                    </div>
                  </div>
                </button>

                <button className="example-prompt p-4 text-left border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-200">
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
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Learn something new
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        What are the latest trends in web development?
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}
          {chat.length !== 0 && (
            <div className="p-4 h-[400px] overflow-y-auto space-y-3 scrollable-hidden">
              {chat.map((msg, i) => (
                <div
                  key={i}
                  className={`text-justify rounded-xl max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-blue-100 self-end ml-auto"
                      : "bg-gray-200 self-start mr-auto"
                  }`}
                >
                  <article className={styles.markdown}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </article>
                </div>
              ))}
              {/* {loading && (
                <div className="text-sm text-gray-400 italic">
                  AI is typing…
                </div>
              )} */}
              <div ref={endOfMessagesRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 backdrop-blur-sm">
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
              onClick={handleSend}
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
    </div>
  );
};

export default Page;
