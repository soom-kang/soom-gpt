import Heading from '@/components/Heading';
import SubscriptionButton from '@/components/SubscriptionButton';
import { TOOLS } from '@/constants';
import { checkSubscription } from '@/lib/subscription';
import { Settings } from 'lucide-react';
import React from 'react';

export default async function SettingsPage() {
	const isPro = await checkSubscription();
	return (
		<div>
			<Heading
				title={TOOLS[6].label}
				description={TOOLS[6].description}
				icon={TOOLS[6].icon}
				iconColor={TOOLS[6].color}
				bgColor={TOOLS[6].bgColor}
			/>

			<div className='px-4 lg:px-8 space-y-4'>
				<div className='text-sm text-muted-foreground'>
					{isPro ? '현재 프로 플랜을 사용 중입니다.' : '현재 무료 플랜을 사용중입니다.'}
				</div>

				<SubscriptionButton isPro={isPro} />
			</div>
		</div>
	);
}
