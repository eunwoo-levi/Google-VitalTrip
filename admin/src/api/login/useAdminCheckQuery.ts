import { useQuery } from "@tanstack/react-query";

import { httpClient } from "../../utils/httpClient";

interface AdminMeResponse {
  message: string;
  data: {
    isAdmin: boolean;
  };
}

export const useAdminCheckQuery = () => {
  return useQuery({
    queryKey: ["adminAuth"],
    queryFn: async () => {
      const response = await checkIfAdmin();
      return response.data.isAdmin;
    },
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    retry: false, // 인증 실패 시 재시도 안함
  });
};

const checkIfAdmin = async (): Promise<AdminMeResponse> => {
  return await httpClient.get<AdminMeResponse>("/admin/me");
};
