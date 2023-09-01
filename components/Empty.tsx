import EmptyImage from '@/assets/empty.svg';
import Image from 'next/image';

interface EmptyProps {
	label: string;
}

export const Empty = ({ label }: EmptyProps) => {
	return (
		<div className='flex flex-col items-center justify-center h-full p-20'>
			<div className='relative h-72 w-72'>
				<Image alt='Empty' src={EmptyImage} fill />
			</div>
			<p className='text-sm text-center text-muted-foreground whitespace-pre-line'>{label}</p>
		</div>
	);
};
