import { checkApiLimit, increaseApiLimit } from '@/lib/apiLimit';
import { translate } from '@/lib/papago';
import { replicate } from '@/lib/replicate';
import { checkSubscription } from '@/lib/subscription';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const body = await req.json();
		const { prompt } = body;

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		if (!prompt) {
			return new NextResponse('Prompt are required', { status: 400 });
		}

		const freeTrial = await checkApiLimit();
		const isPro = await checkSubscription();

		if (!freeTrial && !isPro) {
			return new NextResponse('Free trial has expired', { status: 403 });
		}

		const translatedPrompt = await translate(prompt);

		const response = await replicate.run(
			'anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351',
			{
				input: {
					prompt: translatedPrompt,
				},
			}
		);

		if (!isPro) {
			await increaseApiLimit();
		}

		return NextResponse.json(response);
	} catch (error) {
		console.log('[MUSIC_ERROR]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
