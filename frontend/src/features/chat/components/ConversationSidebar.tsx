import { useConversations } from "../hooks/useConversations";

import { Trash2 } from "lucide-react";

import { useDeleteConversation } from "../hooks/useDeleteConversation";

import { Pencil } from "lucide-react";

import { useRenameConversation } from "../hooks/useRenameConversation";

import { useState } from "react";

interface Props {
    selectedConversationId?: number;
    onSelect?: (id: number) => void;
    onNewChat?: () => void;
    onDelete?: (id: number) => void;
}

export default function ConversationSidebar({
    selectedConversationId,
    onSelect,
    onNewChat,
    onDelete,
}: Props) {

    const {
        data,
        isLoading,
    } = useConversations();

    const deleteConversation =
    useDeleteConversation();

    const renameConversation =
        useRenameConversation();

    const [editingId, setEditingId] =
        useState<number | null>(null);

    const [editingTitle, setEditingTitle] =
        useState("");

    return (

        <div className="h-full bg-white rounded-xl shadow border flex flex-col overflow-hidden">

            <div className="p-5 border-b">

                <h2 className="font-semibold text-lg">
                    Conversations
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Your recent chats
                </p>

            </div>

            <div className="p-5">

                <button
                    onClick={onNewChat}
                    className="
                        w-full
                        rounded-lg
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        font-medium
                        py-3
                        transition
                    "
                >
                    + New Chat
                </button>

            </div>

            {isLoading && (
                <p className="px-5 py-3 text-gray-500">
                    Loading...
                </p>
            )}

            <div className="flex-1 overflow-y-auto px-5 pb-5 space-y-2">

                {data?.map((conversation) => (

                    <div
                        key={conversation.id}
                        className="group relative"
                    >

                        <button
                            onClick={() => {

                                if (editingId !== null) {
                                    return;
                                }

                                onSelect?.(
                                    conversation.id,
                                );

                            }}
                            className={`w-full text-left rounded-xl p-3 pr-10 transition
                
                            ${
                                selectedConversationId === conversation.id
                                    ? "bg-blue-50 border border-blue-200 text-blue-700"
                                    : "hover:bg-slate-100"
                            }`}
                        >

                            {editingId === conversation.id ? (

                                <input
                                    autoFocus
                                    onFocus={(e) => e.target.select()}
                                    value={editingTitle}
                                    onChange={(e) =>
                                        setEditingTitle(e.target.value)
                                    }
                                    onBlur={() => {

                                        const title = editingTitle.trim();

                                        if (
                                            title &&
                                            title !== conversation.title
                                        ) {

                                            renameConversation.mutate({

                                                id: conversation.id,

                                                title,

                                            });

                                        }

                                        setEditingId(null);

                                    }}
                                    onKeyDown={(e) => {

                                        e.stopPropagation();

                                        if (e.key === "Enter") {

                                            const title = editingTitle.trim();

                                            if (
                                                title &&
                                                title !== conversation.title
                                            ) {

                                                renameConversation.mutate({

                                                    id: conversation.id,

                                                    title,

                                                });

                                            }

                                            setEditingId(null);

                                        }

                                        if (e.key === "Escape") {

                                            setEditingId(null);

                                        }

                                    }}
                                    className="
                                        w-full
                                        rounded
                                        border
                                        border-blue-300
                                        bg-white
                                        px-2
                                        py-1
                                        outline-none
                                        focus:ring-2
                                        focus:ring-blue-200
                                    "
                                />

                            ) : (

                                <>
                                    💬 {conversation.title}
                                </>

                            )}

                        </button>

                        <div
                            className="
                                absolute
                                right-2
                                top-1/2
                                -translate-y-1/2
                                flex
                                gap-2
                                opacity-0
                                group-hover:opacity-100
                                transition
                            "
                        >

                            <button
                                onClick={(e) => {

                                    e.stopPropagation();

                                    setEditingId(
                                        conversation.id,
                                    );

                                    setEditingTitle(
                                        conversation.title,
                                    );

                                }}
                                className="
                                    text-slate-500
                                    hover:text-blue-600
                                "
                            >

                                <Pencil size={16} />

                            </button>

                            <button
                                onClick={(e) => {

                                    e.stopPropagation();

                                    if (
                                        !window.confirm(
                                            "Delete this conversation?",
                                        )
                                    ) {
                                        return;
                                    }

                                    deleteConversation.mutate(
                                        conversation.id,
                                        {
                                            onSuccess: () => {

                                                onDelete?.(
                                                    conversation.id,
                                                );

                                            },
                                        },
                                    );

                                }}
                                className="
                                    text-slate-500
                                    hover:text-red-600
                                "
                            >

                                <Trash2 size={16} />

                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}