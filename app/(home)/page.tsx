import { LandingNavbar, LandingHero, LandingContent } from '@/components/home';

export default function LandingPage() {
	return (
		<div className='h-full'>
			<LandingNavbar />
			<LandingHero />
			<LandingContent />
		</div>
	);
}
