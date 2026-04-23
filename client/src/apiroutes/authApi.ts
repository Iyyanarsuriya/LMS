import axiosInstance from "./axiosInstance";

export const login = (data: any) => {
    return axiosInstance.post("/auth/login", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}; //working fine.

export const signup = (data: any) => {
    return axiosInstance.post("/auth/signup", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}; //working fine.

export const forgotPassword = (email: string) => {
    return axiosInstance.post("/auth/forgot-password", { email }, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};