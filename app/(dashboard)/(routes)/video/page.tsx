'use client';

import * as z from 'zod';
import axios from 'axios';
import Heading from '@/components/Heading';
import { zodResolver } from '@hookform/resolvers/zod';
import { Video } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { formSchema } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Empty } from '@/components/Empty';
import { Loader } from '@/components/Loader';
import { cn } from '@/lib/utils';
import { useProModal } from '@/hooks/useProModal';
import toast from 'react-hot-toast';

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
			}
		} finally {
			router.refresh();
		}
	};

	return (
		<div>
			<Heading
				title='Video Generation'
				description='Turn your prompt into video'
				icon={Video}
				iconColor='text-orange-700'
				bgColor='bg-orange-700/10'
			/>

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
												placeholder='clown fish swimming around the sea'
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button className='w-full col-span-12 lg:col-span-2' disabled={isLoading}>
								Generate
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
					{!video && !isLoading && (
						<div>
							<Empty label={'No Video started.'} />
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
