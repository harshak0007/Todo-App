import express from 'express';
import TodoItem from '../models/TodoItem.js';

const router = express.Router();

// API routes
// Get all todo items
router.get('/api/todos', async (req, res) => {
	try {
		const todos = await TodoItem.find();
		res.json(todos);
	} catch (err) {
		console.error('Error fetching todos:', err);
		res.status(500).json({ error: 'Error fetching todos' });
	}
});
router.get('/api/todos/sort/:criteria', async (req, res) => {
	try {
		const { criteria } = req.params;
		console.log(criteria);

		let sortBy;
		// Determine how to sort based on the provided criteria
		switch (criteria) {
			case 'priority':
				sortBy = { priority: -1 }; // Sort by priority ascending
				break;
			case 'date':
				sortBy = { date: 1 }; // Sort by due date ascending
				break;
			default:
		}

		// Fetch and sort todos based on the criteria
		const sortedTodos = await TodoItem.find().sort(sortBy);
		res.json(sortedTodos);
	} catch (error) {
		console.error('Error sorting todos:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});
router.delete('/api/todos/:collection', async (req, res) => {
	const { collection } = req.params;

	try {
		// Delete records based on the provided collection name
		await TodoItem.deleteMany({ collection });

		res.json({ message: 'Records deleted successfully' });
	} catch (error) {
		console.error('Error deleting records:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.delete('/api/todos/delete/:id', async (req, res) => {
	const { id } = req.params;

	try {
		// Delete records based on the provided collection name
		await TodoItem.findOneAndDelete({ id });

		res.json({ message: 'Records deleted successfully' });
	} catch (error) {
		console.error('Error deleting records:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.put('/api/todos/:id', async (req, res) => {
	const { id } = req.params;
	const updatedTodoData = req.body;

	try {
		// Find the todo item by ID and update it with the new data
		const updatedTodo = await TodoItem.findOneAndUpdate(
			{ id: Number(id) },
			updatedTodoData,
			{
				new: true,
			}
		);

		if (!updatedTodo) {
			return res.status(404).json({ error: 'Todo item not found' });
		}

		res.json(updatedTodo); // Send the updated todo item as the response
	} catch (error) {
		console.error('Error updating todo:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});
// Add a new todo item
router.post('/api/todos', async (req, res) => {
	try {
		const todo = await TodoItem.create(req.body);
		res.json(todo);
	} catch (err) {
		console.error('Error creating todo:', err);
		res.status(500).json({ error: 'Error creating todo' });
	}
});

// Update todo
router.put('/api/todos/:id', async (req, res) => {
	const {
		params: { id },
	} = req;
	const todo = req.body;
	try {
		const result = await TodoItem.findByIdAndUpdate(id, todo, { new: true });
		if (!todo)
			return res
				.status(404)
				.json({ ok: false, data: { error: 'Todo not found' } });
		return res.status(200).json({ ok: true, data: { result } });
	} catch (error) {
		console.error('Error updating todo', error);
		return res
			.status(500)
			.json({ ok: false, data: { error: 'Error while updating todo' } });
	}
});
router.patch('/api/todos/:id', async (req, res) => {
	const { id } = req.params;
	const updatedTodoData = req.body;

	try {
		// Find the todo item by ID and update it with the new data
		const updatedTodo = await TodoItem.findOneAndUpdate(
			{ id: Number(id) },
			updatedTodoData,
			{
				new: true,
			}
		);

		if (!updatedTodo) {
			return res.status(404).json({ error: 'Todo item not found' });
		}

		res.json(updatedTodo); // Send the updated todo item as the response
	} catch (error) {
		console.error('Error updating todo:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

export default router;
