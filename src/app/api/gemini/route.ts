import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps } from 'firebase/app';
import { getAI, getGenerativeModel, GoogleAIBackend } from 'firebase/ai';

const BASE_PROMPT = `
- 너의 역할은 글쓰기 전문가야.
- 사용자가 입력한 주제, 타겟, 스타일을 바탕으로 고품질 Thread 콘텐츠를 생성하는 서비스야.
- Thread는 500자 이하로, 5~7문단, 각 문단은 1~2문장으로 작성해.
- 반드시 반말로 작성하고, 대답 없이 Thread 본문만 출력해.
- 꼭 길게 쓸 필요는 없어 최대한 간결하고 읽기 편하게 써줘.
- 불필요한 인삿말, 설명, 해시태그, 안내문구 없이 Thread 본문만 출력해.
- LLM이 작성한 티가 전혀 안나도록 해줘
- 교과서적인 언어보다는 완전 친한 친구한테 말하는것 처럼 해줘, 하지만 배려심은 조금 줘
`;

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  if (!prompt) {
    return NextResponse.json(
      { error: '프롬프트가 필요합니다.' },
      { status: 400 }
    );
  }

  // 환경변수에서 firebaseConfig 구성
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  // FirebaseApp 싱글턴 패턴
  const firebaseApp = getApps().length
    ? getApps()[0]
    : initializeApp(firebaseConfig);

  // AI 서비스 및 모델 인스턴스 생성
  const ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });
  const model = getGenerativeModel(ai, { model: 'gemini-2.5-flash' });

  try {
    const fullPrompt = `${prompt}\n${BASE_PROMPT}`;
    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const text = response.text();
    return NextResponse.json({ result: text });
  } catch (e) {
    return NextResponse.json(
      { error: 'Gemini 호출 오류: ' + (e instanceof Error ? e.message : e) },
      { status: 500 }
    );
  }
}
