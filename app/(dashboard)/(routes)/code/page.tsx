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
import { UserAvatar, BotAvatar } from '@/components/avatar';
import ReactMarkDown from 'react-markdown';
import { useProModal } from '@/hooks/useProModal';
import toast from 'react-hot-toast';
import { TOOLS } from '@/constants';
import { ChatCompletionMessage } from '@/lib/openai';

const formSchema = z.object({
	prompt: z.string().min(1, { message: 'Prompt is required' }),
});

export default function CodePage() {
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

			const response = await axios.post('/api/code', {
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
			{/* headers */}
			<Heading
				title={TOOLS[3].label}
				description={TOOLS[3].description}
				icon={TOOLS[3].icon}
				iconColor={TOOLS[3].color}
				bgColor={TOOLS[3].bgColor}
			/>

			{/* form */}
			<div className='px-4 lg:px-8'>
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='w-full p-4 px-3 border rounded-lg grid grid-cols-12 gap-2 md:px-6 focus-within:shadow-sm'
						>
							<FormField
								name='prompt'
								render={({ field }) => (
									<FormItem className='col-span-12 lg:col-span-10'>
										<FormControl className='p-0 m-0'>
											<Input
												className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
												disabled={isLoading}
												placeholder={TOOLS[3].placeholder}
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<Button className='w-full col-span-12 lg:col-span-2' disabled={isLoading}>
								생성하기
							</Button>
						</form>
					</Form>
				</div>

				<div className='mt-4 space-y-4'>
					{isLoading && (
						<div className='flex items-center justify-center w-full p-8 rounded-lg bg-muted'>
							<Loader />
						</div>
					)}

					{messages.length === 0 && !isLoading && (
						<div>
							<Empty label={TOOLS[3].empty!} />
						</div>
					)}

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
								<ReactMarkDown
									components={{
										pre: ({ node, ...props }) => (
											<div className='w-full p-2 my-2 overflow-auto rounded-lg bg-black/10'>
												<pre {...props} />
											</div>
										),
										code: ({ node, ...props }) => (
											<code className='p-1 rounded-lg bg-black/10' {...props} />
										),
									}}
									className='overflow-hidden text-sm leading-7'
								>
									{message.content || ''}
								</ReactMarkDown>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
