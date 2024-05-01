// MyContext.tsx
import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	Dispatch,
	SetStateAction,
	useEffect,
} from 'react';
import { ToDoItem } from './types';
import axios from 'axios';
import ToDoComponent from '../Components/TodoComponent';
import EditTodoForm from '../Components/EditTodoForm';

interface MyContextValue {
	// greeting:string,
	editToDoItem: ToDoItem | undefined;
	setEditToDoItem: Dispatch<SetStateAction<ToDoItem | undefined>>;
	sortValue: string;
	setSortValue: Dispatch<SetStateAction<string>>;
	activeCollection: string;
	setActiveCollection: Dispatch<SetStateAction<string>>;
	toDoItems: ToDoItem[];
	setToDoItems: Dispatch<SetStateAction<ToDoItem[]>>;
	toDoComponents: JSX.Element | undefined;
	collections: string[];
	setCollections: Dispatch<SetStateAction<string[]>>;
	idCounter: number;
	setIdCounter: Dispatch<SetStateAction<number>>;
	fetchTodos: () => Promise<void>;
	handleAddTodo: () => void;
	handleEditCancel: () => void;
	handleSave: (todoItem: ToDoItem) => void;
	saveEditTodo: (todoItem: ToDoItem) => void;
	handleCancel: (id: number) => void;
	handleSelectCollection: (collection: string) => void;
	addCollection: (newCollection: string) => void;
	deleteCollection: () => Promise<void>;
	handleEditTodo: () => Promise<void>;
	handleDeleteTodo: (id: number) => Promise<void>;
	handleSort: () => Promise<void>;
	handleShowAll: () => Promise<void>;
	handleCheckboxClick: (todo: ToDoItem) => void;
}

const MyContext = createContext<MyContextValue | undefined>(undefined);

export const useMyContext = () => {
	const context = useContext(MyContext);
	if (!context) {
		throw new Error('useMyContext must be used within a MyContextProvider');
	}
	return context;
};

interface MyContextProviderProps {
	children: ReactNode;
}

export const MyContextProvider: React.FC<MyContextProviderProps> = ({
	children,
}) => {
	// const greeting='Good Afternoon. What is your plan today?'

	const [sortValue, setSortValue] = useState<string>('');
	const [toDoItems, setToDoItems] = useState<ToDoItem[]>([]);
	const [editToDoItem, setEditToDoItem] = useState<ToDoItem>();
	const [toDoComponents, setToDoComponents] = useState<JSX.Element>();
	// const [isCompleted, setIsCompleted] = useState<boolean>(false);

	const [collections, setCollections] = useState<string[]>(['List1']);
	const [idCounter, setIdCounter] = useState(1);
	const [activeCollection, setActiveCollection] = useState<string>('List1');

	const fetchTodos = async () => {
		try {
			const response = await axios.get('http://localhost:3000/api/todos'); // Adjust URL as per your API
			const res = response.data;
			console.log(res);
			console.log(activeCollection);
			const collectionData = res
				.filter(r => r.collection === activeCollection)
				.map(item => ({
					id: item.id,
					task: item.task,
					date: item.date,
					priority: item.priority,
					isCompleted: item.isCompleted,
					collection: item.collection,
				}));

			console.log(collectionData);
			setToDoItems(collectionData);
			console.log(toDoItems);
		} catch (error) {
			console.error('Error fetching todos:', error);
		}
	};

	const handleAddTodo = () => {
		const newToDoComponent = <ToDoComponent />;
		setToDoComponents(newToDoComponent);
		setIdCounter(prevCounter => prevCounter + 1);
		console.log(idCounter);
	};
	const handleEditTodo = async () => {
		try {
			editToDoItem && setToDoComponents(<EditTodoForm></EditTodoForm>);
			console.log(toDoItems);
			console.log(editToDoItem);
			const data = toDoItems.filter(item => item.id !== editToDoItem?.id);
			console.log(data);
			setToDoItems(data);
		} catch (error) {
			console.error('Error sorting todos:', error);
		}
	};
	const handleDeleteTodo = async (id: number) => {
		try {
			console.log('hello');
			const response = await axios.delete(
				`http://localhost:3000/api/todos/delete/${id}`
			); // Adjust URL as per your API
			console.log(response.data);
			fetchTodos();
			// setToDoItems(response.data); // Update todo items based on sorting
		} catch (error) {
			console.error('Error sorting todos:', error);
		}
	};
	const saveTodo = async (todoItem: ToDoItem) => {
		try {
			const response = await axios.post(
				'http://localhost:3000/api/todos',
				todoItem
			); // Adjust URL as per your API
			console.log(response.data); // Set todo items from API response
		} catch (error) {
			console.error('Error fetching todos:', error);
		}
	};
	const saveEditTodo = async (todoItem: ToDoItem) => {
		try {
			const response = await axios.put(
				`http://localhost:3000/api/todos/${todoItem.id}`,
				todoItem
			); // Adjust URL as per your API
			console.log(response.data); // Set todo items from API response
			fetchTodos();
			setToDoComponents(<></>);
		} catch (error) {
			console.error('Error fetching todos:', error);
		}
	};

	const handleSave = async (todoItem: ToDoItem) => {
		await saveTodo(todoItem);
		fetchTodos();
		setToDoComponents(<></>);
	};

	const handleCancel = (id: number) => {
		console.log(id);
		setToDoComponents(<></>);
	};

	const handleSelectCollection = (collection: string) => {
		// Filter ToDo items based on selected collection
		const filteredItems = toDoItems.filter(
			item => item.collection === collection
		);
		// Create ToDo components for filtered items
		const todoComponents = filteredItems.map(item => (
			<div key={item.id}>
				<h3>{item.task}</h3>
				<p>Due Date: {item.date.toString()}</p>
				<p>Priority: {item.priority}</p>
			</div>
		));
		console.log(todoComponents);
	};

	// Function to add a new collection
	const addCollection = (newCollection: string) => {
		setCollections(prevCollections => [...prevCollections, newCollection]);
	};

	const handleSort = async () => {
		try {
			console.log('hello');
			console.log(sortValue);
			const response = await axios.get(
				`http://localhost:3000/api/todos/sort/${sortValue}`
			); // Adjust URL as per your API
			setToDoItems(response.data); // Update todo items based on sorting
		} catch (error) {
			console.error('Error sorting todos:', error);
		}
	};
	const deleteCollection = async () => {
		try {
			console.log('hello');
			await axios.delete(`http://localhost:3000/api/todos/${activeCollection}`); // Adjust URL as per your API
			fetchTodos();
			const data = collections.filter(coll => coll !== activeCollection);
			setCollections(data);
		} catch (error) {
			console.error('Error sorting todos:', error);
		}
	};

	const handleShowAll = async () => {
		try {
			const response = await axios.get('/api/todos'); // Adjust URL as per your API
			setToDoItems(response.data); // Update todo items to show all
		} catch (error) {
			console.error('Error fetching all todos:', error);
		}
	};

	const handleCheckboxClick = async (todo: ToDoItem) => {
		try {
			// console.log(true);
			todo.isCompleted = !todo.isCompleted;
			await axios.patch(`http://localhost:3000/api/todos/${todo.id}`, todo);
			fetchTodos();
		} catch (error) {
			console.error('Error updating todo: ', error);
		}
	};
	const handleEditCancel = () => {
		editToDoItem && setToDoItems([...toDoItems, editToDoItem]);
		setToDoComponents(<></>);
		setEditToDoItem(undefined);
	};

	useEffect(() => {
		handleEditTodo();
	}, [editToDoItem]);

	const contextValue: MyContextValue = {
		// greeting,
		editToDoItem,
		setEditToDoItem,
		sortValue,
		setSortValue,
		activeCollection,
		setActiveCollection,
		handleEditCancel,
		toDoItems,
		setToDoItems,
		toDoComponents,
		collections,
		setCollections,
		saveEditTodo,
		idCounter,
		setIdCounter,
		fetchTodos,
		handleAddTodo,
		handleSave,
		handleCancel,
		handleSelectCollection,
		addCollection,
		handleSort,
		deleteCollection,
		handleEditTodo,
		handleDeleteTodo,
		handleShowAll,
		handleCheckboxClick,
	};

	return (
		<MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
	);
};
