import { checkApiLimit, increaseApiLimit } from '@/lib/apiLimit';
import { openai } from '@/lib/openai';
import { translate } from '@/lib/papago';
import { checkSubscription } from '@/lib/subscription';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const preferredRegion = 'icn1';

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const body = await req.json();
		const { prompt, amount = 1, resolution = '512x512' } = body;

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		if (!openai.apiKey) {
			return new NextResponse('OpenAI API Key not configured', { status: 500 });
		}

		if (!prompt) {
			return new NextResponse('Prompt are required', { status: 400 });
		}
		if (!amount) {
			return new NextResponse('Amount are required', { status: 400 });
		}
		if (!resolution) {
			return new NextResponse('Resolution are required', { status: 400 });
		}

		const freeTrial = await checkApiLimit();
		const isPro = await checkSubscription();

		if (!freeTrial && !isPro) {
			return new NextResponse('Free trial has expired', { status: 403 });
		}

		const translatedPrompt = await translate(prompt);

		// console.log(translatedPrompt);

		const response = await openai.images.generate({
			prompt: translatedPrompt,
			n: parseInt(amount, 10),
			size: resolution,
		});

		if (!isPro) {
			await increaseApiLimit();
		}

		return NextResponse.json(response.data);
	} catch (error) {
		console.log('[IMAGE_ERROR]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
