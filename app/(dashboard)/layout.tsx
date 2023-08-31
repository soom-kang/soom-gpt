import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { getApiLimitCount } from '@/lib/apiLimit';
import { checkSubscription } from '@/lib/subscription';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'SOOM-GPT:Dashboard',
	description: 'AI Platform',
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	const apiLimitCount = await getApiLimitCount();
	const isPro = await checkSubscription();

	return (
		<div className='relative h-full'>
			<div className='hidden h-full bg-gray-900 md:flex md:w-72 md:flex-col md:fixed md:inset-y-0'>
				<Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
			</div>

			<main className='md:pl-72'>
				<Navbar /> {children}
			</main>
		</div>
	);
}
