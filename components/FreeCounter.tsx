import { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { MAX_FREE_COUNTS } from '@/constants';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Zap } from 'lucide-react';
import { useProModal } from '@/hooks/useProModal';

interface FreeCounterProps {
	apiLimitCount: number;
	isPro: boolean;
}

const FreeCounter = ({ apiLimitCount = 0, isPro = false }: FreeCounterProps) => {
	const proModal = useProModal();
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
							{apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
						</p>
						<Progress className='h-3' value={(apiLimitCount / MAX_FREE_COUNTS) * 100} />
						<Button onClick={proModal.onOpen} className='w-full' variant={'premium'}>
							Upgrade
							<Zap className='w-4 h-4 ml-2 fill-white' />
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default FreeCounter;
