import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps } from 'firebase/app';
import { getAI, getGenerativeModel, GoogleAIBackend } from 'firebase/ai';

const SUGGEST_PROMPT = `
- 너의 역할은 글쓰기 전문가야.
- 사용자가 Thread를 만들고 싶은데, 주제를 고민하고 있어.
- 트렌디하거나, 재치있거나, 흥미로운 주제 5개를 한글로 추천해줘.
- 각 주제는 20자 이내로, 너무 뻔하지 않게, 다양한 분야로.
- 반드시 배열(JSON array) 형태로만 응답해. (예: ["주제1", "주제2", ...])
- 불필요한 설명, 인삿말, 안내문구 없이 배열만 출력해.
`;

export async function POST(req: NextRequest) {
  // 환경변수에서 firebaseConfig 구성
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  const firebaseApp = getApps().length
    ? getApps()[0]
    : initializeApp(firebaseConfig);

  const ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });
  const model = getGenerativeModel(ai, { model: 'gemini-2.5-flash' });

  try {
    const result = await model.generateContent(SUGGEST_PROMPT);
    const response = result.response;
    const text = response.text();
    // 배열 파싱 시도
    let topics: string[] = [];
    try {
      topics = JSON.parse(text);
    } catch {
      // 혹시 LLM이 배열 외 형식으로 응답하면, 대괄호 부분만 추출해서 파싱 시도
      const match = text.match(/\[.*\]/s);
      if (match) {
        topics = JSON.parse(match[0]);
      }
    }
    if (!Array.isArray(topics) || topics.length === 0) {
      return NextResponse.json(
        { error: '추천 주제 파싱 실패', raw: text },
        { status: 500 }
      );
    }
    return NextResponse.json({ topics });
  } catch (e) {
    return NextResponse.json(
      { error: 'Gemini 호출 오류: ' + (e instanceof Error ? e.message : e) },
      { status: 500 }
    );
  }
}
