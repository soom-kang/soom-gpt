'use client';

import { useEffect } from 'react';
import { Crisp } from 'crisp-sdk-web';

const CrispChat = () => {
	useEffect(() => {
		Crisp.configure(process.env.NEXT_PUBLIC_CRISP_API_KEY!);
	}, []);

	return null;
};

export default CrispChat;
