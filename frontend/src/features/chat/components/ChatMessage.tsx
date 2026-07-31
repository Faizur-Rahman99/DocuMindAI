import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import type { Source } from "../types/chat";

import "../../../styles/chat-markdown.css";

import remarkGfm from "remark-gfm";

interface Props {
    role: "user" | "assistant";
    content: string;
    sources?: Source[];
}

const markdownComponents: Components = {
    code({ className, children, ...props }) {

        const match = /language-(\w+)/.exec(
            className || "",
        );

        if (!match) {
            return (
                <code
                    className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded"
                    {...props}
                >
                    {children}
                </code>
            );
        }

        return (
            <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
            >
                {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
        );
    },
};

export default function ChatMessage({
    role,
    content,
    sources,
}: Props) {

    const isUser = role === "user";

    return (

        <div
            className={`flex ${
                isUser
                    ? "justify-end"
                    : "justify-start"
            }`}
        >

            <div
                className={`${
                    isUser
                        ? "max-w-[70%] order-2"
                        : "w-full max-w-none"
                }`}
                            >

                <div
                    className={`mb-2 text-xs uppercase tracking-wide font-semibold text-slate-400 ${
                        isUser 
                            ? "text-right" 
                            : ""
                    }`}
                >
                    {isUser
                        ? "You"
                        : "DocuMindAI"}
                </div>

                <div
                    className={`rounded-2xl px-6 py-5 shadow-sm ${
                        isUser
                            ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white"
                            : "bg-white border border-slate-200 shadow-sm text-slate-700"
                    }`}
                >

                    <div
                        className={
                            isUser
                                ? ""
                                : "chat-markdown"
                        }
                    >

                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={markdownComponents}
                        >
                            {content}
                        </ReactMarkdown>

                    </div>

                </div>

                {role === "assistant" &&
                    sources &&
                    sources.length > 0 && (

                    <div className="mt-5 rounded-xl border bg-white p-5">

                        <h4 className="font-semibold mb-4">
                            📚 Sources
                        </h4>

                        <div className="space-y-4">

                            {sources.map((source) => (

                                <div
                                    key={source.chunk_id}
                                    className="rounded-xl bg-slate-50 border border-slate-200 p-4 hover:bg-slate-100 transition-colors"
                                >

                                    <div className="flex justify-between">

                                        <span className="font-medium">

                                            📄 {source.filename}

                                        </span>

                                        <span className="text-xs text-slate-500">

                                            {(source.score * 100).toFixed(1)}%

                                        </span>

                                    </div>

                                    <p className="mt-3 text-slate-600 italic">

                                        {source.text.length > 200
                                            ? source.text.slice(0, 200) + "..."
                                            : source.text}

                                    </p>

                                </div>

                            ))}

                        </div>

                    </div>

                )}

            </div>

        </div>

    );

}