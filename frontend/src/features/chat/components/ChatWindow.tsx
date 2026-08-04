import { useState } from "react";

import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

import { useChatStream } from "../hooks/useChatStream";

import type { Source } from "../types/chat";

import { useConversationMessages } from "../hooks/useConversationMessages";

import { useEffect, useRef } from "react";

import { useQueryClient } from "@tanstack/react-query";


interface Props {
    conversationId?: number;
    onConversationCreated: (id: number) => void;
    onCreateConversation: () => Promise<number>;
}

interface Message {

    role:
        | "user"
        | "assistant";

    content: string;

    sources?: Source[];

}

export default function ChatWindow({
    conversationId,
    onConversationCreated,
    onCreateConversation,
}: Props) {

    const [messages, setMessages] =
        useState<Message[]>([]);

    const [isStreaming, setIsStreaming] =
        useState(false);

    const bottomRef =
        useRef<HTMLDivElement>(null);

    const chatMutation = useChatStream();

    const queryClient = useQueryClient();

    const { data: history } =
    useConversationMessages(conversationId);

    useEffect(() => {

        if (conversationId === undefined) {
            setMessages([]);
            return;
        }

        if (!history) return;

        setMessages(
            history.map((message) => ({
                role: message.role,
                content: message.content,
            })),
        );
    
    }, [conversationId, history]);

    useEffect(() => {

    bottomRef.current?.scrollIntoView({
        behavior: "smooth",
    });

}, [messages]);

        async function handleSend(
                question: string,
            ) {

                let activeConversationId = conversationId;

                if (activeConversationId === undefined) {

                    activeConversationId =
                        await onCreateConversation();

                    onConversationCreated(activeConversationId);

                }

                setMessages((previous) => [

                    ...previous,

                    {
                        role: "user",
                        content: question,
                    },

                ]);

                setIsStreaming(true);

                try {

                    await chatMutation.mutateAsync(
                        {
                            question,
                            conversation_id: activeConversationId,
                        },

                        (chunk) => {


                    setMessages((previous) => {

                        const last =
                            previous[previous.length - 1];

                        if (!last) {

                            return [
                                {
                                    role: "assistant",
                                    content: chunk,
                                },
                            ];

                        }

                        if (last.role === "user") {

                            setIsStreaming(false);

                            return [

                                ...previous,

                                {
                                    role: "assistant",
                                    content: chunk,
                                },

                            ];

                        }

                        // Continue streaming
                        return previous.map((message, index) =>

                            index === previous.length - 1

                                ? {
                                      ...message,
                                      content: message.content + chunk,
                                  }

                                : message,

                        );

                    });

                },

            );

            await queryClient.invalidateQueries({
                queryKey: ["conversations"],
            });

        } finally {

            setIsStreaming(false);

        }


    }

    return (

        <div className="h-full overflow-hidden bg-white rounded-xl shadow border flex flex-col">

            <div className="border-b px-6 py-5">

                <h2 className="text-xl font-semibold">
                    💬 AI Assistant
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Ask questions about your uploaded documents.
                </p>

            </div>

            <div className="flex-1 min-h-0 overflow-y-auto px-8 py-6 bg-slate-50">

                <div className="space-y-8">

                    {messages.length === 0 && (

                        <div className="flex h-full items-center justify-center">

                            <div className="text-center max-w-md">

                                <div className="text-5xl mb-4">
                                    🤖
                                </div>

                                <h3 className="text-2xl font-semibold">
                                    Welcome to DocuMindAI
                                </h3>

                                <p className="mt-3 text-gray-500">
                                    Upload documents and ask questions to start
                                    an AI-powered conversation.
                                </p>

                            </div>

                        </div>

                    )}

                    {messages.map((message, index) => (

                        <ChatMessage
                            key={index}
                            role={message.role}
                            content={message.content}
                            sources={message.sources}
                        />

                    ))}

                </div>

                {isStreaming && (

                    <div className="flex items-center gap-3 text-gray-500 px-4 py-2">

                        <div className="flex gap-1">

                            <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></span>

                            <span
                                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                style={{ animationDelay: "0.15s" }}
                            ></span>

                            <span
                                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                style={{ animationDelay: "0.3s" }}
                            ></span>

                        </div>

                        <span className="italic">
                            DocuMindAI is thinking...
                        </span>

                    </div>

                )}

                <div ref={bottomRef} />

            </div>

            <div className="border-t bg-white px-6 py-5 flex-shrink-0">

                <ChatInput
                    onSend={handleSend}
                    loading={false}
                />

            </div>

        </div>

    );

}