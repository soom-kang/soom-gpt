'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TOOLS } from '@/constants';

const LandingContent = () => {
	return (
		<div className='px-10 pb-20'>
			<h2 className='mb-10 text-4xl font-extrabold text-center text-white'>지원 AI 모델</h2>
			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
				{TOOLS.map(
					(tool) =>
						tool.label !== '홈' &&
						tool.label !== '설정' && (
							<Card key={tool.description} className='bg-[#192339] border-none text-white'>
								<CardHeader>
									<CardTitle className='flex items-center gap-x-2'>
										<div>
											<p className='text-lg'>{tool.label}</p>
											<p className='text-sm text-zinc-400'>{tool.title}</p>
										</div>
									</CardTitle>
									<CardContent className='px-0 pt-4'>{tool.description}</CardContent>
								</CardHeader>
							</Card>
						)
				)}
			</div>
		</div>
	);
};

export default LandingContent;
