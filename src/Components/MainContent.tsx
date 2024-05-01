import { useMyContext } from '../context/todo';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/Components/ui/accordion';
import { Checkbox } from '@/Components/ui/checkbox';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
// import { useEffect } from 'react';
import { ToDoItem } from '@/context/types';
import { useEffect } from 'react';

// import { useMyContext } from '../context/todo';

const MainContent = () => {
	// const {greeting,toDoItems,toDoComponents,fetchTodos,handleAddTodo}=useMyContext()

	const {
		toDoItems,
		toDoComponents,
		handleAddTodo,
		handleCheckboxClick,
		handleDeleteTodo,
		handleEditTodo,
		setEditToDoItem,
		editToDoItem,
		fetchTodos,
	} = useMyContext();
	const func = () => {
		console.log(toDoItems);
	};
	func();
	const handle = async (item: ToDoItem) => {
		setEditToDoItem(item);
		console.log(editToDoItem);
		handleEditTodo();
	};

	useEffect(() => {
		fetchTodos();
	}, []);
	return (
		<div className='main-content bg-[#131313] p-12 overflow-y-auto'>
			{/* <h2 className='text-5xl font-bold'>{greeting}</h2> */}
			<h2 className='block leading-[1.25] text-5xl font-bold text-white/85 tracking-normal'>
				Good Afternoon.
				<span className='block text-white/50'>What's your plan for today?</span>
			</h2>

			<section className='todos mt-12'>
				{
					<button
						className={` bg-white/5 border border-dashed border-white/0 px-6 py-4 rounded-md w-full text-left text-white/50 hover:text-white/75 outline-none`}
						onClick={handleAddTodo}>
						Add Todo
					</button>
				}

				<div className='todo-components'>{toDoComponents}</div>
				<div className='todo-list mt-4'>
					{toDoItems?.map(item => (
						<Accordion
							key={item.id}
							type='single'
							collapsible>
							<AccordionItem
								value='item-1'
								className=''>
								<AccordionTrigger>
									<div className='flex items-center gap-x-4'>
										<Checkbox
											checked={item.isCompleted}
											onClick={() => handleCheckboxClick(item)}
										/>
										<div className='flex flex-col justify-between items-start gap-y-2'>
											<h3>{item.task}</h3>
											<small className='text-white/50 text-xs'>
												{item.date
													.toString()
													.substring(0, item.date.toString().indexOf('T'))}
											</small>
										</div>
									</div>
								</AccordionTrigger>
								<AccordionContent className='ml-7 flex justify-between items-center'>
									<Badge variant='default'>
										{item.priority === 1
											? 'High'
											: item.priority === 0
											? 'Normal'
											: 'Low'}
									</Badge>
									<span className='inline-flex gap-x-4 '>
										<Button
											className={`${item.isCompleted}`}
											onClick={() => handle(item)}>
											Edit
										</Button>
										<Button onClick={() => handleDeleteTodo(item.id)}>
											Delete
										</Button>
									</span>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))}
				</div>
			</section>
		</div>
	);
};

export default MainContent;
