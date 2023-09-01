import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'SOOM-GPT | 인증',
	description: '통합 AI 플랫폼 - 인증',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return <main className='flex items-center justify-center h-full bg-[#111827]'>{children}</main>;
}
