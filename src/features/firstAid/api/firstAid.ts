interface FirstAidRequest {
  symptomType: string;
  symptomDetail: string;
}

export const postFirstAid = async (formData: FirstAidRequest) => {
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

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'first aid POST 요청에 실패했습니다.');
  }
};
