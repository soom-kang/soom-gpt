'use client';

import * as z from 'zod';
import axios from 'axios';
import Heading from '@/components/Heading';
import { zodResolver } from '@hookform/resolvers/zod';
import { Video } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Empty } from '@/components/Empty';
import { Loader } from '@/components/Loader';
import { useProModal } from '@/hooks/useProModal';
import toast from 'react-hot-toast';
import { TOOLS } from '@/constants';

const formSchema = z.object({
	prompt: z.string().min(1, { message: 'Video Prompt is required' }),
});

export default function VideoPage() {
	const proModal = useProModal();
	const router = useRouter();
	const [video, setVideo] = useState<string>();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setVideo(undefined);

			const response = await axios.post('/api/video', values, { timeout: 600000 });

			setVideo(response.data[0]);

			form.reset();
		} catch (error: any) {
			if (error?.response?.status === 403) {
				proModal.onOpen();
			} else {
				toast.error('Something went wrong');
				console.error(error.message);
			}
		} finally {
			router.refresh();
		}
	};

	return (
		<div>
			{/* header */}
			<Heading
				title={TOOLS[5].label}
				description={TOOLS[5].description}
				icon={TOOLS[5].icon}
				iconColor={TOOLS[5].color}
				bgColor={TOOLS[5].bgColor}
			/>

			<div className='px-4 lg:px-8'>
				<div>
					{/* form */}
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
												placeholder={TOOLS[5].placeholder}
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

				{/* result */}
				<div className='mt-4 space-y-4'>
					{isLoading && (
						<div className='flex items-center justify-center w-full p-8 rounded-lg bg-muted'>
							<Loader />
						</div>
					)}

					{!video && !isLoading && (
						<div>
							<Empty
								label={`${TOOLS[5]
									.empty!}\n비디오 생성에는 최소 3분, 최대 10분 이상 소요될 수도 있습니다.`}
							/>
						</div>
					)}

					{video && (
						<video className='w-full mt-8 bg-black border rounded-lg aspect-video' controls>
							<source src={video} />
						</video>
					)}
				</div>
			</div>
		</div>
	);
}
