import axios from "axios";

export function getErrorMessage(
    error: unknown,
): string {

    if (axios.isAxiosError(error)) {

        return (
            error.response?.data?.detail ??
            error.message
        );

    }

    return "Something went wrong.";
}