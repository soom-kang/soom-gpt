import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import SubscriptionButton from '@/components/SubscriptionButton';
import { MAX_FREE_COUNTS } from '@/constants';
import { Progress } from '@/components/ui/progress';

interface FreeCounterProps {
	apiLimitCount: number;
	isPro: boolean;
}

const FreeCounter = ({ apiLimitCount = 0, isPro = false }: FreeCounterProps) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	if (isPro) {
		return null;
	}

	return (
		<div className='px-3'>
			<Card className='border-0 bg-white/10'>
				<CardContent className='py-6'>
					<div className='mb-4 space-y-2 text-sm text-center text-white'>
						<p>
							{apiLimitCount} / {MAX_FREE_COUNTS} 무료 생성 횟수
						</p>
						<Progress className='h-3' value={(apiLimitCount / MAX_FREE_COUNTS) * 100} />
						<SubscriptionButton isPro={isPro} />
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default FreeCounter;
