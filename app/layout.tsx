import './globals.css';
import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Noto_Sans_KR } from 'next/font/google';
import ModalProvider from '@/components/modal/ModalProvider';
import ToasterProvider from '@/components/toaster/ToasterProvider';
import CrispProvider from '@/components/chat/CrispProvider';
import { Analytics } from '@vercel/analytics/react';

const noto = Noto_Sans_KR({ weight: ['300', '400', '700', '900'], subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'SOOM-GPT',
	description: '통합 AI 플랫폼',
	icons: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang='ko'>
				<body className={noto.className}>
					<ModalProvider />
					<ToasterProvider />
					<CrispProvider />
					<Analytics />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
