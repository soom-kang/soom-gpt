import Image from 'next/image';
import LogoImage from '@/assets/logo.png';

export const Loader = () => {
	return (
		<div className='flex flex-col items-center justify-center h-full gap-y-4'>
			<div className='relative w-10 h-10 animate-spin'>
				<Image alt='logo' fill src={LogoImage} />
			</div>

			<p className='text-sm text-muted-foreground'>SOOM-GPT is Thinking...</p>
		</div>
	);
};
