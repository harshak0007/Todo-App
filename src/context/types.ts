// types.ts
export interface ToDoItem {
	isCompleted: boolean;
	id: number;
	task: string;
	date: Date;
	priority: number;
	collection: string;
}
