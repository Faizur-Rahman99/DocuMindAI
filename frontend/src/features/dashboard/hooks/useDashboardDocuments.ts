import { useQuery } from "@tanstack/react-query";

import { getDocuments } from "../../documents/api/documentApi";

export function useDashboardDocuments() {
    return useQuery({
        queryKey: ["dashboard-documents"],
        queryFn: getDocuments,
    });
}