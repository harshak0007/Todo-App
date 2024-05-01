import mongoose from 'mongoose';

// TodoItem model schema
const todoItemSchema = new mongoose.Schema({
	id: Number,
	task: String,
	date: Date,
	priority: Number,
	isCompleted: {
		type: Boolean,
		default: false,
	},
	collection: String, // Adding collection name field
});

export default mongoose.model('TodoItem', todoItemSchema);
