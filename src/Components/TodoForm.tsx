'use client';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMyContext } from '@/context/todo';
import { cn } from '@/lib/utils';
import { Button } from '@/Components/ui/button';
import { Calendar } from '@/Components/ui/calendar';
import { ToDoItem } from '@/context/types';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/Components/ui/select';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/Components/ui/form';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/Components/ui/popover';
import { Input } from '@/Components/ui/input';

const FormSchema = z.object({
	date: z.date({
		required_error: 'A date of birth is required.',
	}),
	todo: z.string({
		required_error: 'Todo title cannot be empty!',
	}),
	priority: z.string({
		required_error: 'Priority of todo is required',
	}),
});

const TodoForm = () => {
	const disDate = new Date();
	disDate.setDate(disDate.getDate() - 1);
	const { idCounter, handleSave, handleCancel, activeCollection } =
		useMyContext();
	const [task, setTask] = useState('');

	const [priority, setPriority] = useState<number>(0);

	const [date, setDate] = useState<Date | undefined>(new Date());

	const handleToSave = () => {
		if (date) {
			const todoItem: ToDoItem = {
				id: idCounter,
				task,
				date,
				priority,
				isCompleted: false,
				collection: activeCollection,
			};
			console.log(todoItem);
			handleSave(todoItem);
		}
	};
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		data ? console.log(data) : console.error('error');
		form.reset();
		handleToSave();
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={`space-y-4 text-white`}>
				<FormField
					control={form.control}
					name='todo'
					render={({ field }) => (
						<FormItem className='flex gap-x-4 justify-start items-baseline'>
							<FormLabel htmlFor='input-todo'>Title</FormLabel>
							<FormControl>
								<Input
									className='bg-transparent text-inherit border-none outline-none focus:border-none '
									id='input-todo'
									{...field}
									onChange={e => {
										setTask(e.target.value); // Set the state for 'task'
										field.onChange(e); // Trigger the form field change
										console.log(e.target.value);
									}}
									autocomplete='off'
									placeholder='Enter your todo'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='date'
					render={({ field }) => (
						<FormItem className='flex gap-x-4 justify-start items-baseline'>
							<FormLabel
								htmlFor='date'
								className='text-white '>
								Date
							</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											id='date'
											className={cn(
												'w-min pl-3 text-left font-normal bg-transparent',
												!field.value && 'text-muted-foreground'
											)}>
											{field.value ? (
												format(field.value, 'dd/MM/yyyy')
											) : (
												<span className='opacity-50'>dd/mm/yyyy</span>
											)}
											<CalendarIcon className='ml-2 h-4 w-4 opacity-50' />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent
									className='w-auto p-0'
									align='start'
									onChange={() => {
										console.log(field.value);
										setDate(field.value);
									}}>
									<Calendar
										className='bg-[#131313] text-white rounded-md'
										mode='single'
										selected={field.value}
										onSelect={date => {
											setDate(date); // Set the state for 'date'
											field.onChange(date); // Trigger the form field change
										}}
										disabled={date => date < disDate}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='priority'
					render={({ field }) => (
						<FormItem className='flex gap-x-4 justify-start items-baseline'>
							<FormLabel htmlFor='input-priority'>Priority</FormLabel>
							<FormControl>
								<Select
									onValueChange={(value: string) => {
										setPriority(Number(value)); // Set the state for 'priority'
										field.onChange(value); // Trigger the form field change
									}}
									defaultValue={field.value}>
									<SelectTrigger className='w-[180px]'>
										<SelectValue
											placeholder='Select priority'
											onChange={field.onChange}
										/>
									</SelectTrigger>
									<SelectContent className='text-white '>
										<SelectItem value='-1'>Lower</SelectItem>
										<SelectItem value='0'>Normal</SelectItem>
										<SelectItem value='1'>Higher</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}></FormField>
				<Button
					type='submit'
					className='mr-4'>
					Save
				</Button>
				<Button onClick={() => handleCancel(idCounter)}> Cancel</Button>
			</form>
		</Form>
	);
};

export default TodoForm;
