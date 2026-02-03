import { useOverlay } from "@vitaltrip/shared";
import { useState } from "react";
import { useUserList } from "../../api/dashboard/useUserList";
import type { User } from "../../types/user";

export const UserList = () => {
  const {
    data,
    isFetching,
    currentPage,
    pageSize,
    hasNextPage,
    hasPreviousPage,
    handlePageChange,
    handlePageSizeChange,
  } = useUserList();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const userDetailModal = useOverlay({ closeOnEscape: true });

  if (!data) {
    return null;
  }

  const {
    content: users,
    totalPages,
    totalElements,
    first: isFirst,
    last: isLast,
  } = data.data;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("ko-KR");
  };

  const getProviderBadge = (provider: string) => {
    return provider === "GOOGLE" ? (
      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
        Google
      </span>
    ) : (
      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
        Local
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    return role === "ADMIN" ? (
      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-semibold">
        Admin
      </span>
    ) : (
      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
        User
      </span>
    );
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    userDetailModal.open();
  };

  const handleCloseModal = () => {
    userDetailModal.close();
    setSelectedUser(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">사용자 관리</h1>
        <p className="text-gray-600">전체 사용자: {totalElements}명</p>
      </div>

      {/* 페이지 크기 선택 */}
      <div className="mb-4 flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700">
          페이지 크기:
        </label>
        <select
          value={pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          className="border border-gray-300 rounded px-3 py-1 text-sm"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      {/* 사용자 테이블 */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  이메일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  이름
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  생년월일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  국가
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  전화번호
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  제공자
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  역할
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  가입일
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleUserClick(user)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {user.profileImageUrl && (
                        <img
                          className="h-8 w-8 rounded-full mr-3"
                          src={user.profileImageUrl}
                          alt={user.name}
                        />
                      )}
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.birthDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.countryCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.phoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getProviderBadge(user.provider)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(user.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && !isFetching && (
          <div className="text-center py-8 text-gray-500">
            등록된 사용자가 없습니다.
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            페이지 {currentPage + 1} / {totalPages} (총 {totalElements}명)
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(0)}
              disabled={isFirst}
              className="px-3 py-1 bg-white border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              처음
            </button>

            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!hasPreviousPage}
              className="px-3 py-1 bg-white border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              이전
            </button>

            {/* 페이지 번호 표시 */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const startPage = Math.max(
                0,
                Math.min(currentPage - 2, totalPages - 5),
              );
              const pageNum = startPage + i;

              if (pageNum >= totalPages) return null;

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1 border rounded text-sm ${
                    pageNum === currentPage
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {pageNum + 1}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!hasNextPage}
              className="px-3 py-1 bg-white border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              다음
            </button>

            <button
              onClick={() => handlePageChange(totalPages - 1)}
              disabled={isLast}
              className="px-3 py-1 bg-white border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              마지막
            </button>
          </div>
        </div>
      )}

      {isFetching && (
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-600">업데이트 중...</div>
        </div>
      )}

      {/* 사용자 상세 모달 */}
      {userDetailModal.render(
        selectedUser && (
          <div className="w-[600px]">
            <div className="flex justify-between items-center mb-6 pb-4 border-b">
              <h2 className="text-2xl font-bold text-gray-900">
                사용자 상세 정보
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {/* 프로필 이미지 */}
              {selectedUser.profileImageUrl && (
                <div className="flex justify-center mb-6">
                  <img
                    className="h-24 w-24 rounded-full border-4 border-gray-200"
                    src={selectedUser.profileImageUrl}
                    alt={selectedUser.name}
                  />
                </div>
              )}

              {/* 기본 정보 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    사용자 ID
                  </label>
                  <p className="text-base text-gray-900">{selectedUser.id}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    이름
                  </label>
                  <p className="text-base text-gray-900">{selectedUser.name}</p>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    이메일
                  </label>
                  <p className="text-base text-gray-900">
                    {selectedUser.email}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    생년월일
                  </label>
                  <p className="text-base text-gray-900">
                    {selectedUser.birthDate}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    국가 코드
                  </label>
                  <p className="text-base text-gray-900">
                    {selectedUser.countryCode}
                  </p>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    전화번호
                  </label>
                  <p className="text-base text-gray-900">
                    {selectedUser.phoneNumber || "미등록"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    로그인 제공자
                  </label>
                  <div>{getProviderBadge(selectedUser.provider)}</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    역할
                  </label>
                  <div>{getRoleBadge(selectedUser.role)}</div>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    가입일
                  </label>
                  <p className="text-base text-gray-900">
                    {formatDate(selectedUser.createdAt)}
                  </p>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    최종 수정일
                  </label>
                  <p className="text-base text-gray-900">
                    {formatDate(selectedUser.updatedAt)}
                  </p>
                </div>
              </div>

              {/* 닫기 버튼 */}
              <div className="flex justify-end mt-6 pt-4 border-t">
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        ),
      )}
    </div>
  );
};
