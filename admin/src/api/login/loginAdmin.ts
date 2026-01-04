import { useMutation } from "@tanstack/react-query";
import { httpClient } from "src/utils/httpClient";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  errorCode?: string;
}

const loginAdmin = async (formData: LoginRequest) => {
  return await httpClient.post<LoginResponse>("/auth/admin/login", formData);
};

export const useAdminLoginMutation = () =>
  useMutation({
    mutationFn: (formData: LoginRequest) => loginAdmin(formData),
    onSuccess: () => {
      window.location.href = "/dashboard";
    },
  });
