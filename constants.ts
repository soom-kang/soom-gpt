import {
	CodeIcon,
	ImageIcon,
	LayoutDashboard,
	MessageSquare,
	MusicIcon,
	Settings,
	VideoIcon,
} from 'lucide-react';

export const MAX_FREE_COUNTS = 5;

export const TOOLS = [
	{
		label: '홈',
		icon: LayoutDashboard,
		color: 'text-sky-500',
		bgColor: 'bg-sky-500/10',
		href: '/dashboard',
		description: '홈',
		title: '',
		placeholder: '',
		empty: '',
	},
	{
		label: 'AI 챗봇',
		icon: MessageSquare,
		color: 'text-violet-500',
		bgColor: 'bg-violet-500/10',
		href: '/conversation',
		description: '자유롭게 대화를 나눠보세요',
		title: 'OPEN AI 기반',
		placeholder: '지구 반지름은 어떻게 계산할 수 있을까?',
		empty: '아직 시작된 대화가 없습니다',
	},
	{
		label: 'AI 이미지 생성',
		icon: ImageIcon,
		color: 'text-pink-700',
		bgColor: 'bg-pink-700/10',
		href: '/image',
		description: '머릿속의 상상을 이미지로 구현해보세요',
		title: 'OPEN AI 기반',
		placeholder: '아기 고양이들이 강아지들하고 장난치고 있는 사진 생성해줘',
		empty: '아직 생성한 이미지가 없습니다',
	},
	{
		label: 'AI 코드 생성기',
		icon: CodeIcon,
		color: 'text-green-700',
		bgColor: 'bg-green-700/10',
		href: '/code',
		description: '원하는 기능을 구현하는 코드를 생성해보세요',
		title: 'OPEN AI 기반',
		placeholder: '간단한 무한 로딩 스크롤 샘플 코드 리액트로 작성해줘',
		empty: '아직 생성된 코드가 없습니다',
	},
	{
		label: 'AI 작곡',
		icon: MusicIcon,
		color: 'text-emerald-500',
		bgColor: 'bg-emerald-500/10',
		href: '/music',
		description: '떠오르는 심상을 음악으로 느껴보세요',
		title: 'Replicator AI 기반',
		placeholder: '펑키한 신디사이저 솔로',
		empty: '아직 생성된 곡이 없습니다.',
	},
	{
		label: 'AI 비디오 생성',
		icon: VideoIcon,
		color: 'text-orange-700',
		bgColor: 'bg-orange-700/10',
		href: '/video',
		description: '아이디어를 영상으로 옮겨보세요',
		title: 'Replicator AI 기반',
		placeholder: '내셔널 지오그라피에서 수상한 산호초에서 수영하는 열대어 8K 영상',
		empty: '아직 생성된 비디오가 없습니다.',
	},
	{
		label: '설정',
		icon: Settings,
		color: 'text-gray-700',
		bgColor: 'bg-gray-700/10',
		href: '/settings',
		description: '계정 설정 관리하기',
		title: '',
		placeholder: '',
		empty: '',
	},
];
