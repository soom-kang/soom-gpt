import prismadb from '@/lib/prismadb';
import { stripe } from '@/lib/stripe';
import { absoluteUrl } from '@/lib/utils';
import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const preferredRegion = 'icn1';

const settingsUrl = absoluteUrl('/settings');

export async function GET() {
	try {
		const { userId } = auth();
		const user = await currentUser();

		if (!userId || !user) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const userSubscription = await prismadb.userSubscription.findUnique({
			where: {
				userId,
			},
		});

		if (userSubscription && userSubscription.stripeCustomerId) {
			const stripeSession = await stripe.billingPortal.sessions.create({
				customer: userSubscription.stripeCustomerId,
				return_url: settingsUrl,
			});

			return new NextResponse(JSON.stringify({ url: stripeSession.url }));
		}

		const stripeSession = await stripe.checkout.sessions.create({
			success_url: settingsUrl,
			cancel_url: settingsUrl,
			payment_method_types: ['card'],
			mode: 'subscription',
			billing_address_collection: 'auto',
			customer_email: user.emailAddresses[0].emailAddress,
			line_items: [
				{
					price_data: {
						currency: 'KRW',
						product_data: {
							name: 'SOOM-GPT Pro',
							description: '무제한 AI 사용 구독',
						},
						unit_amount: 20000,
						recurring: {
							interval: 'month',
						},
					},
					quantity: 1,
				},
			],
			metadata: {
				userId,
			},
		});

		// console.log('결재', stripeSession);

		return new NextResponse(JSON.stringify({ url: stripeSession.url }));
	} catch (error) {
		console.log('[STRIPE_ERROR]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
