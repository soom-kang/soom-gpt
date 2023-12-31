'use client';

import * as z from 'zod';
import axios from 'axios';
import Heading from '@/components/Heading';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Empty } from '@/components/Empty';
import { Loader } from '@/components/Loader';
import { cn } from '@/lib/utils';
import { BotAvatar, UserAvatar } from '@/components/avatar/';
import { useProModal } from '@/hooks/useProModal';
import { toast } from 'react-hot-toast';
import { TOOLS } from '@/constants';
import { ChatCompletionMessage } from '@/lib/openai';

const formSchema = z.object({
	prompt: z.string().min(1, { message: 'Prompt is required' }),
});

export default function ConversationPage() {
	const proModal = useProModal();
	const router = useRouter();
	const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const userMessage: ChatCompletionMessage = {
				role: 'user',
				content: values.prompt,
			};
			const newMessages = [...messages, userMessage];

			const response = await axios.post('/api/conversation', {
				messages: newMessages,
			});

			setMessages((current) => [...current, userMessage, response.data]);

			form.reset();
		} catch (error: any) {
			if (error?.response?.status === 403) {
				proModal.onOpen();
			} else {
				toast.error('시간 제한에 걸려 요청이 취소되었습니다');
			}
		} finally {
			router.refresh();
		}
	};

	return (
		<div>
			{/* header */}
			<Heading
				title={TOOLS[1].label}
				description={TOOLS[1].description}
				icon={TOOLS[1].icon}
				iconColor={TOOLS[1].color}
				bgColor={TOOLS[1].bgColor}
			/>

			{/* form */}
			<div className='px-4 lg:px-8'>
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='grid w-full grid-cols-12 gap-2 p-4 px-3 border rounded-lg md:px-6 focus-within:shadow-sm'
						>
							<FormField
								name='prompt'
								render={({ field }) => (
									<FormItem className='col-span-12 lg:col-span-10'>
										<FormControl className='p-0 m-0'>
											<Input
												className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
												disabled={isLoading}
												placeholder={TOOLS[1].placeholder}
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button className='w-full col-span-12 lg:col-span-2' disabled={isLoading}>
								대화하기
							</Button>
						</form>
					</Form>
				</div>

				{/* result */}
				<div className='mt-4 space-y-4'>
					{/* loading */}
					{isLoading && (
						<div className='flex items-center justify-center w-full p-8 rounded-lg bg-muted'>
							<Loader />
						</div>
					)}

					{/* empty */}
					{messages.length === 0 && !isLoading && (
						<div>
							<Empty label={TOOLS[1].empty!} />
						</div>
					)}

					{/* answer */}
					<div className='flex flex-col-reverse gap-y-4'>
						{messages.map((message) => (
							<div
								key={message.content}
								className={cn(
									'p-8 w-full flex items-start gap-x-8 rounded-lg',
									message.role === 'user' ? 'bg-white border border-black/10' : 'bg-muted'
								)}
							>
								{message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
								<p className='text-sm'>{message.content}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
