// RightSidebar.tsx
import React, { useEffect } from 'react';
import { useMyContext } from '../context/todo';
import { Calendar } from '@/Components/ui/calendar';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/Components/ui/select';
import { Button } from './ui/button';

const RightSidebar = () => {
	const { sortValue, setSortValue, handleSort } = useMyContext();
	const [date, setDate] = React.useState<Date | undefined>(new Date());

	useEffect(() => {
		console.log(sortValue);
	}, [sortValue]);

	return (
		<div className='right-sidebar bg-[#252525] p-4 col-span-1'>
			<Calendar
				mode='single'
				selected={date}
				onSelect={setDate}
				className='w-min mx-auto h-3/5'
			/>
			<section className='sort-todos flex gap-x-4 justify-start items-center mb-8'>
				<h2 className='font-semibold '>Sort</h2>

				<Select
					onValueChange={(value: string) => setSortValue(value)}
					defaultValue='priority'>
					<SelectTrigger className='w-[180px] p-2'>
						<SelectValue
							placeholder='All'
							// onChange={handleSortChange}
						/>
					</SelectTrigger>
					<SelectContent className='text-white'>
						<SelectItem value='all'>All</SelectItem>
						<SelectItem value='date'>Date</SelectItem>
						<SelectItem value='priority'>Priority</SelectItem>
					</SelectContent>
				</Select>
			</section>
			<Button onClick={handleSort}>Sort</Button>
		</div>
	);
};

export default RightSidebar;
