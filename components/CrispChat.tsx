'use client';

import { useEffect } from 'react';
import { Crisp } from 'crisp-sdk-web';

const CrispChat = () => {
	useEffect(() => {
		Crisp.configure('b366902d-009e-48b1-995e-1c7dc94dfa3b');
	}, []);

	return null;
};

export default CrispChat;
