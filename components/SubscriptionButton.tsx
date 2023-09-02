'use client';

import axios from 'axios';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useProModal } from '@/hooks/useProModal';

interface SubscriptionButtonProps {
	isPro?: boolean;
	directSubscribe?: boolean;
}

const SubscriptionButton = ({
	isPro = false,
	directSubscribe = false,
}: SubscriptionButtonProps) => {
	const proModal = useProModal();
	const [loading, setLoading] = useState(false);

	const onSubscribe = async () => {
		try {
			setLoading(true);
			const response = await axios.get('/api/stripe');

			window.location.href = response.data.url;
		} catch (error: any) {
			toast.error('Something went wrong');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Button
			variant={isPro ? 'default' : 'premium'}
			onClick={isPro ? onSubscribe : directSubscribe ? onSubscribe : proModal.onOpen}
			size={'lg'}
			disabled={loading}
			className='w-full gap-2'
		>
			<span>{isPro ? 'Manage Subscription' : '업그레이드'}</span>
			{!isPro && <Zap className='w-4 h-4 fill-white' />}
		</Button>
	);
};

export default SubscriptionButton;
