export type TriageJson = {
  summary: string;
  likely_causes: string[];
  next_actions: string[];
  severity: 'P0' | 'P1' | 'P2' | 'P3';
  tags: string[];
};

function extractJson(text: string) {
  const s = text.trim();
  const start = s.indexOf('{');
  const end = s.lastIndexOf('}');
  if (start < 0 || end < 0) throw new Error(`LLM did not return JSON: ${s}`);
  return JSON.parse(s.slice(start, end + 1));
}

export async function triageWithOpenAI(input: {
  issue: {
    id: string;
    title?: string | null;
    level?: string | null;
    project?: string | null;
    environment?: string | null;
    url?: string | null;
    windowCount: number;
    totalCount: number;
  };
  payload: unknown;
}): Promise<TriageJson> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('Missing OPENAI_API_KEY');

  const prompt = `
    너는 시니어 프론트엔드 엔지니어다.
    Sentry 이슈를 보고 팀이 바로 움직일 수 있도록 트리아지 JSON만 출력해라.
    
    규칙:
    - Root Level에 아래 키들이 바로 나와야 함 (wrapping 금지)
    - summary: 한글 요약 (한 문장)
    - likely_causes: 원인 추정 (배열, 최대 3개)
    - next_actions: 조치 사항 (배열, 3~7개)
    - severity: P0(치명적)~P3(사소함)
    - tags: 키워드 배열
    
    입력:
    project=${input.issue.project ?? ''}
    env=${input.issue.environment ?? ''}
    level=${input.issue.level ?? ''}
    title=${input.issue.title ?? ''}
    url=${input.issue.url ?? ''}
    recent_10m_count=${input.issue.windowCount}
    total_count=${input.issue.totalCount}
    
    payload(일부):
    ${JSON.stringify(input.payload).slice(0, 8000)}
    `.trim();

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`OpenAI failed: ${res.status} ${text}`);
  }

  const data: unknown = await res.json();
  const d = data as { choices?: { message?: { content?: string } }[] }; // chat completion shape
  const text = d?.choices?.[0]?.message?.content ?? '';

  return extractJson(String(text));
}
