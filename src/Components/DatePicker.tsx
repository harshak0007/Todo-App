'use client';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/Components/ui/button';
import { Calendar } from '@/Components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/Components/ui/popover';

interface MyDatePicker {
	setDueDate: Dispatch<SetStateAction<string>>;
}
export const DatePicker: React.FC<MyDatePicker> = ({ setDueDate }) => {
	const [date, setDate] = useState<Date | undefined>(new Date());
	const handleSetDate = () => {
		if (date) setDueDate(date.toString());
	};
	useEffect(() => {
		handleSetDate();
	}, [date]);
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'w-[280px] justify-start text-left font-normal',
						!date && 'text-muted-foreground'
					)}>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{date ? format(date, 'PPP') : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0'>
				<Calendar
					mode='single'
					selected={date}
					onSelect={setDate}
					initialFocus
					className='bg-[#fff]'
				/>
			</PopoverContent>
		</Popover>
	);
};
