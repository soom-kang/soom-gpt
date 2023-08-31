import './globals.css';
import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import ModalProvider from '@/components/ModalProvider';
import ToasterProvider from '@/components/ToasterProvider';
import CrispProvider from '@/components/CrispProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'SOOM-GPT',
	description: 'AI Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={inter.className}>
					<ModalProvider />
					<ToasterProvider />
					<CrispProvider />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
