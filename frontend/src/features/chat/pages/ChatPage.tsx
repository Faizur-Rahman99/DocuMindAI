import { useState } from "react";

import ConversationSidebar from "../components/ConversationSidebar";
import ChatWindow from "../components/ChatWindow";

import { useCreateConversation } from "../hooks/useCreateConversation";

export default function ChatPage() {

    const [conversationId, setConversationId] =
        useState<number>();

    const createConversationMutation =
        useCreateConversation();

    async function createNewConversation() {

        const conversation =
            await createConversationMutation.mutateAsync();

        setConversationId(conversation.id);

        return conversation.id;

    }

    return (

        <div className="grid grid-cols-[300px_1fr] gap-6 h-full min-h-0">

            <ConversationSidebar
                selectedConversationId={conversationId}
                onSelect={setConversationId}
                onNewChat={createNewConversation}
                onDelete={(deletedId) => {

                    if (deletedId === conversationId) {

                        setConversationId(undefined);

                    }

                }}
            />

            <ChatWindow
                conversationId={conversationId}
                onConversationCreated={setConversationId}
                onCreateConversation={createNewConversation}
            />

        </div>

    );

}