import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'SOOM-GPT | 메인',
	description: '통합 AI 플랫폼 - 홈',
};

export default function LandingLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className='h-full bg-[#111827] overflow-auto'>
			<div className='w-full h-full mx-auto max-w-screen-xl'>{children}</div>
		</main>
	);
}
