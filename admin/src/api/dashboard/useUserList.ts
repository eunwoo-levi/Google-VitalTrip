import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { httpClient } from "src/utils/httpClient";
import type { UserListParams, UserListResponse } from "../../types/user";

interface UseUserListReturn {
  data: UserListResponse | undefined;
  currentPage: number;
  pageSize: number;
  handlePageChange: (newPage: number) => void;
  handlePageSizeChange: (newSize: number) => void;
  isFetching: boolean;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  fetchNextPage: () => void;
  fetchPreviousPage: () => void;
}

export const useUserList = (
  initialPage: number = 0,
  initialSize: number = 20
): UseUserListReturn => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialSize);

  const { data, isFetching, fetchNextPage, fetchPreviousPage } =
    useSuspenseInfiniteQuery({
      queryKey: ["users", pageSize, currentPage],
      queryFn: async ({ pageParam }) => {
        return await getUserList({ page: pageParam, size: pageSize });
      },
      initialPageParam: currentPage,
      getNextPageParam: (lastPage) => {
        return lastPage.data.hasNext ? lastPage.data.page + 1 : undefined;
      },
      getPreviousPageParam: (firstPage) => {
        return firstPage.data.hasPrevious ? firstPage.data.page - 1 : undefined;
      },
      select: (data) => {
        // 현재 페이지의 데이터만 반환
        return data.pages[data.pages.length - 1];
      },
    });

  const handlePageChange = (newPage: number) => {
    const totalPages = data?.data.totalPages ?? 0;
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(0);
  };

  const hasPreviousPage = data?.data.hasPrevious ?? false;

  return {
    data,
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    isFetching,
    hasNextPage: data?.data.hasNext ?? false,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  };
};

export const getUserList = async (
  params: UserListParams = {}
): Promise<UserListResponse> => {
  const { page = 0, size = 20 } = params;
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  return await httpClient.get<UserListResponse>(
    `/admin/users?${queryParams.toString()}`
  );
};
