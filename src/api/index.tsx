import { API_URL } from "../constants";
import { LoginFetch, SignupFetch } from "../types";

export const postFetch = async (url: string, body: object) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    return response.json();
}

export const getFetch = async (url: string, accessToken: string) => {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
    });
    return response.json();
}

export const loginFetch = async (body: LoginFetch): Promise<Response> => {
    const response = await fetch(`${API_URL}accounts/login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
    return response
}
export const signupFetch = async (body: SignupFetch): Promise<Response> => {
    const response = await fetch(`${API_URL}accounts/signup/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
    return response
}

export const accessTokenFetch = async (refreshToken: string): Promise<Response> => {
    const response = await fetch(`${API_URL}accounts/token/refresh/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
    });
    return response;
}

export const profileFetch = async (accessToken: string): Promise<Response> => {
    const response = await fetch(`${API_URL}accounts/profile/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
    });
    return response;
}

export const logoutFetch = async (accessToken: string, refreshToken: string): Promise<Response> => {
    const response = await fetch(`${API_URL}accounts/logout/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
    });
    return response;
}
