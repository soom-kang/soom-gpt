import { Avatar, AvatarImage } from './ui/avatar';
import LogoImage from '@/assets/logo.png';

const BotAvatar = () => {
	return (
		<Avatar className='w-8 h-8'>
			<AvatarImage className='p-1' src={LogoImage.src} />
		</Avatar>
	);
};

export default BotAvatar;
