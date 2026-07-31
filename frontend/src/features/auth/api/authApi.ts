import { api } from "../../../api/api";

import type {
    LoginRequest,
    RegisterRequest,
    TokenResponse,
} from "../types/auth";

export async function login(
    data: LoginRequest,
) {
    const response = await api.post<TokenResponse>(
        "/users/login",
        data,
    );

    return response.data;
}

export async function register(
    data: RegisterRequest,
) {
    const response = await api.post(
        "/users/register",
        data,
    );

    return response.data;
}