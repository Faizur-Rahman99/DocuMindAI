import { useRef, useState } from "react";

interface Props {
    onSend: (message: string) => void;
    loading: boolean;
}

export default function ChatInput({
    onSend,
    loading,
}: Props) {

    const [message, setMessage] =
        useState("");

    const textareaRef =
    useRef<HTMLTextAreaElement>(null);

    function handleSubmit(
        e: React.FormEvent,
    ) {

        e.preventDefault();

        if (!message.trim()) return;

        onSend(message);

        setMessage("");

    }

    function handleKeyDown(
        e: React.KeyboardEvent<HTMLTextAreaElement>,
    ) {

        if (
            e.key === "Enter" &&
            !e.shiftKey
        ) {

            e.preventDefault();

            if (!message.trim()) return;

            onSend(message);

            setMessage("");

            if (textareaRef.current) {
                textareaRef.current.style.height = "48px";
            }

        }

    }

    function handleChange(
        e: React.ChangeEvent<HTMLTextAreaElement>,
    ) {

        setMessage(e.target.value);

        const textarea = e.target;

        textarea.style.height = "48px";

        textarea.style.height =
            `${Math.min(textarea.scrollHeight, 180)}px`;

    }

    return (

        <form
            onSubmit={handleSubmit}
            className="flex gap-3"
        >

            <textarea
                ref={textareaRef}
                rows={1}
                value={message}
                placeholder="Ask anything about your documents..."
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="
                    flex-1
                    resize-none
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    px-4
                    py-3
                    leading-6
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-200
                    outline-none
                    overflow-y-auto
                    min-h-[48px]
                    max-h-[180px]
                "
            />

            <button
                type="submit"
                disabled={loading || !message.trim()}
                className="
                    self-end
                    h-12
                    rounded-xl
                    bg-blue-600
                    px-6
                    font-medium
                    text-white
                    transition
                    hover:bg-blue-700
                    disabled:bg-slate-300
                    disabled:cursor-not-allowed
                "
            >
                {loading
                    ? "..."
                    : "Send"}
            </button>

        </form>

    );

}