import { checkApiLimit, increaseApiLimit } from '@/lib/apiLimit';
import { openai } from '@/lib/openai';
import { translate } from '@/lib/papago';
import { checkSubscription } from '@/lib/subscription';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const body = await req.json();
		const { messages } = body;

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		if (!openai.apiKey) {
			return new NextResponse('OpenAI API Key not configured', { status: 500 });
		}

		if (!messages) {
			return new NextResponse('Messages are required', { status: 400 });
		}

		const freeTrial = await checkApiLimit();
		const isPro = await checkSubscription();

		if (!freeTrial && !isPro) {
			return new NextResponse('Free trial has expired', { status: 403 });
		}

		const translatedMessages = await translate(messages);

		const response = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			temperature: 0.8,
			n: 1,
			stream: false,
			messages: [
				{
					role: 'system',
					content: 'Always answering in Korean.',
				},
				...translatedMessages,
			],
		});

		if (!isPro) {
			await increaseApiLimit();
		}

		return NextResponse.json(response.choices[0].message);
	} catch (error) {
		console.log('[CONVERSATION_ERROR]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
