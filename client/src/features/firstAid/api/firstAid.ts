interface FirstAidRequest {
  symptomType: string;
  symptomDetail: string;
}

interface FirstAidResponse {
  result?: string;
  advice?: string;
  emergencyLevel?: 'low' | 'medium' | 'high' | 'critical';
}

export const postFirstAid = async (formData: FirstAidRequest): Promise<FirstAidResponse> => {
  try {
    const response = await fetch('/api/first-aid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'first aid POST 요청에 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('first aid POST 요청에 실패했습니다.');
  }
};
