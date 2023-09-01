'use client';

import { useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import TypewriterComponent from 'typewriter-effect';

const LandingHero = () => {
	const { isSignedIn } = useAuth();
	return (
		<div className='font-bold text-center text-white space-y-5 py-36'>
			<div className='text-4xl font-extrabold space-y-5 sm:text-5xl md:text-6xl lg:text-7xl'>
				<h1>완전한 통합 AI 플랫폼</h1>
				<div className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
					<TypewriterComponent
						options={{
							strings: ['AI 챗봇', 'AI 이미지', 'AI 작곡', 'AI 코드 생성', 'AI 비디오'],
							autoStart: true,
							loop: true,
						}}
					/>
				</div>
			</div>
			<div className='text-sm font-light md:text-xl text-zinc-400'>
				통합 AIaaS 플랫폼으로 쉽게 AI를 사용해 보세요
			</div>
			<div>
				<Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
					<Button variant={'premium'} className='p-4 font-semibold rounded-full md:text-lg md:p-6'>
						무료로 AI 체험하기
					</Button>
				</Link>
			</div>

			<div className='text-xs font-normal text-zinc-400 md:text-sm'>무료로 AI를 사용하세요</div>
		</div>
	);
};

export default LandingHero;
