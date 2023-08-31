'use client';

import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/assets/logo.png';
import { usePathname } from 'next/navigation';
import { Montserrat } from 'next/font/google';
import { cn } from '@/lib/utils';
import {
	CodeIcon,
	ImageIcon,
	LayoutDashboard,
	MessageSquare,
	MusicIcon,
	Settings,
	VideoIcon,
} from 'lucide-react';
import FreeCounter from './FreeCounter';

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });

const routes = [
	{ label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', color: 'text-sky-500' },
	{ label: 'Conversation', icon: MessageSquare, href: '/conversation', color: 'text-violet-500' },
	{ label: 'Image Generation', icon: ImageIcon, href: '/image', color: 'text-pink-700' },
	{ label: 'Video Generation', icon: VideoIcon, href: '/video', color: 'text-orange-700' },
	{ label: 'Music Generation', icon: MusicIcon, href: '/music', color: 'text-emerald-500' },
	{ label: 'Code Generation', icon: CodeIcon, href: '/code', color: 'text-green-700' },
	{ label: 'Settings', icon: Settings, href: '/settings' },
];

interface SidebarProps {
	apiLimitCount: number;
	isPro: boolean;
}

const Sidebar = ({ apiLimitCount = 0, isPro = false }: SidebarProps) => {
	const pathname = usePathname();
	return (
		<div className='space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white'>
			<div className='flex-1 px-3 py-2'>
				<Link href={'/dashboard'} className='flex items-center pl-3 mb-14'>
					<div className='relative w-8 h-8 mr-4'>
						<Image alt='Logo' src={Logo} fill />
					</div>
					<h1 className={cn('text-2xl font-bold', montserrat.className)}>SOOM-GPT</h1>
				</Link>

				<div className='space-y-1'>
					{routes.map((route) => (
						<Link
							href={route.href}
							key={route.href}
							className={cn(
								'flex justify-start w-full p-3 text-sm font-medium transition rounded-lg cursor-pointer group hover:text-white hover:bg-white/10',
								pathname === route.href ? 'text-white bg-white/10' : 'text-zinc-400'
							)}
						>
							<div className='flex items-center flex-1'>
								<route.icon className={cn('h-5 w-5 mr-3', route.color)} />
								{route.label}
							</div>
						</Link>
					))}
				</div>
			</div>
			<FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
		</div>
	);
};

export default Sidebar;
