interface FirstAidRequest {
  emergencyType: string;
  userMessage: string;
}

export const postFirstAid = async (formData: FirstAidRequest) => {
  try {
    const response = await fetch('/api/aiChat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errorMessage || 'first aid POST 요청에 실패했습니다.');
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || 'first aid POST 요청에 실패했습니다.');
  }
};
