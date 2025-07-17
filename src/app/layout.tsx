import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/features/auth/useAuth';
import Header from '@/widgets/Header';
import Head from 'next/head';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ThreadMagnet - AI 기반 Thread 생성기',
  description:
    'ThreadMagnet은 주제, 타겟, 스타일만 입력하면 AI가 고품질 Thread 콘텐츠를 자동 생성해주는 웹 서비스입니다. 반말, 500자 이하, 복사 최적화, 히스토리/크레딧 관리 지원.',
  openGraph: {
    title: 'ThreadMagnet - AI 기반 Thread 생성기',
    description:
      'ThreadMagnet은 주제, 타겟, 스타일만 입력하면 AI가 고품질 Thread 콘텐츠를 자동 생성해주는 웹 서비스입니다.',
    url: 'https://thread-magnet.vercel.app/',
    siteName: 'ThreadMagnet',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'ThreadMagnet OG Image',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ThreadMagnet - AI 기반 Thread 생성기',
    description:
      'ThreadMagnet은 주제, 타겟, 스타일만 입력하면 AI가 고품질 Thread 콘텐츠를 자동 생성해주는 웹 서비스입니다.',
    images: ['/og.png'],
    creator: '@your_twitter_id',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <Head>
        <link rel='icon' href='/icons/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/icons/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/icons/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/icons/favicon-16x16.png'
        />
        <link rel='manifest' href='/icons/site.webmanifest' />
        <link
          rel='mask-icon'
          href='/icons/safari-pinned-tab.svg'
          color='#5bbad5'
        />
        <meta name='msapplication-TileColor' content='#2b5797' />
        <meta name='theme-color' content='#ffffff' />
        <meta property='og:image' content='/icons/og.png' />
        <meta name='twitter:image' content='/icons/og.png' />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
