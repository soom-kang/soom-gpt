'use client';

import { Card } from '@/components/ui/card';
import { TOOLS } from '@/constants';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
	const router = useRouter();

	return (
		<div>
			<div className='mb-8 space-y-4'>
				<h2 className='text-2xl font-bold text-center md:text-4xl'>
					원하는 AI 서비스를 사용해보세요
				</h2>
				<p className='text-sm font-light text-center text-muted-foreground md:text-lg whitespace-pre-line'>
					{'AI가 당신의 일상을 더욱 간편하게 만듭니다.\n지금 바로 체험해보세요!'}
				</p>
			</div>
			<div className='px-4 space-y-4 md:px-20 lg:px-32'>
				{TOOLS.map(
					(tool) =>
						tool.href !== '/dashboard' && (
							<Card
								onClick={() => router.push(tool.href)}
								key={tool.href}
								className='flex items-center justify-between p-4 transition cursor-pointer border-black/5 hover:shadow-md'
							>
								<div className='flex items-center gap-x-4'>
									<div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
										<tool.icon className={cn('w-8 h-8', tool.color)} />
									</div>
									<div className='font-semibold'>{tool.label}</div>
									<ArrowRight className='w-5 h-5' />
								</div>
							</Card>
						)
				)}
			</div>
		</div>
	);
}
