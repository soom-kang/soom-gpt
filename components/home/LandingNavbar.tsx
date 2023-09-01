'use client';

import Image from 'next/image';
import Link from 'next/link';
import LogoImage from '@/assets/logo.png';
import { useAuth } from '@clerk/nextjs';
import { Montserrat } from 'next/font/google';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const font = Montserrat({
	weight: '600',
	subsets: ['latin'],
});

const LandingNavbar = () => {
	const { isSignedIn } = useAuth();

	return (
		<nav className='flex items-center justify-between p-4 bg-transparent'>
			{/* main logo */}
			<Link href={'/'} className='flex items-center'>
				<div className='relative w-8 h-8 mr-4'>
					<Image fill alt='logo' src={LogoImage} />
				</div>
				<h1 className={cn('text-2xl font-bold text-white', font.className)}>SOOM-GPT</h1>
			</Link>

			{/* get started */}
			<div className='flex items-center gap-x-2'>
				<Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
					<Button variant={'outline'} className='rounded-full'>
						시작하기
					</Button>
				</Link>
			</div>
		</nav>
	);
};

export default LandingNavbar;
