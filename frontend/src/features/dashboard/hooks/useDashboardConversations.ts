import { useQuery } from "@tanstack/react-query";

import { getConversations } from "../../chat/api/conversationApi";

export function useDashboardConversations() {
    return useQuery({
        queryKey: ["dashboard-conversations"],
        queryFn: getConversations,
    });
}