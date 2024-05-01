import TodoForm from './TodoForm';

import { Card, CardContent, CardFooter } from '@/Components/ui/card';

import {} from './DatePicker';
const TodoComponent = () => {
	return (
		<>
			<Card className='bg-white/5 px-2 py-4 w-full'>
				<CardContent className='text-black'>
					<TodoForm />
				</CardContent>
				<CardFooter></CardFooter>
			</Card>
		</>
	);
};

export default TodoComponent;
