'use client';

import { Check } from 'lucide-react';
import { useProModal } from '@/hooks/useProModal';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TOOLS } from '@/constants';
import SubscriptionButton from '@/components/SubscriptionButton';

const ProModal = () => {
	const proModal = useProModal();

	return (
		<Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
			<DialogContent>
				<DialogHeader>
					{/* title */}
					<DialogTitle className='flex flex-col items-center justify-center pb-2 gap-y-4'>
						<div className='flex items-center py-1 font-bold gap-x-2'>
							SOOM-GPT
							<Badge className='py-1 text-sm uppercase' variant={'premium'}>
								pro
							</Badge>
							로 업그레이드
						</div>
					</DialogTitle>

					{/* description */}
					<DialogDescription className='pt-2 space-y-2 font-medium text-center text-zinc-900'>
						{TOOLS.map(
							(tool) =>
								tool.href !== '/dashboard' &&
								tool.href !== '/settings' && (
									<Card
										key={tool.label}
										className='flex items-center justify-between p-3 border-black/5'
									>
										<div className='flex items-center gap-x-4'>
											<div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
												<tool.icon className={cn('w-6 h-6', tool.color)} />
											</div>
											<div className='text-sm font-semibold'>{tool.label}</div>
										</div>
										<Check className='w-5 h-5 text-primary' />
									</Card>
								)
						)}
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<SubscriptionButton directSubscribe />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ProModal;
