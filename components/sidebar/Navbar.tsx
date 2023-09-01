import { UserButton } from '@clerk/nextjs';
import MobileSidebar from '@/components/sidebar/MobileSidebar';

interface NavbarProps {
	apiLimitCount: number;
	isPro?: boolean;
}

const Navbar = async ({ apiLimitCount = 0, isPro = false }: NavbarProps) => {
	return (
		<div className='flex items-center p-4'>
			<MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro} />

			<div className='flex justify-end w-full'>
				<UserButton afterSignOutUrl='/' />
			</div>
		</div>
	);
};

export default Navbar;
