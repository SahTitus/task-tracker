import { useState, useEffect, useMemo } from 'react';
import { getTasksFromLocalStorage, saveTasksToLocalStorage } from '../utils/localStorage';

export const useTasks = () => {
	const [tasks, setTasks] = useState([]); // Full task list
	const [displayedTasks, setDisplayedTasks] = useState([]); // Displayed tasks for UI
	const [isLoading, setIsLoading] = useState(true);

	// Sort tasks by their due date
	const sortedTasks = useMemo(() => tasks.slice().sort((a, b) => b.id - a.id), [tasks]);

	// Update both tasks and displayedTasks
	const updateTasks = (updatedTasks) => {
		setTasks(updatedTasks);
		setDisplayedTasks(updatedTasks);
	};

	const addTask = (task) => {
		if (task.title.trim()) {
			const newTask = { ...task, id: Date.now() };
			updateTasks([...tasks, newTask]);
		}
	};

	const deleteTask = (id) => {
		updateTasks(tasks.filter((task) => task.id !== id));
	};

	const editTask = (updatedTask) => {
		updateTasks(
			tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
		);
	};

	// Toggles the task's completion state by updating `checked`, `status`, and `progress`.
	// If the task is checked, it sets `status` to "completed" and `progress` to 100.
	// If unchecked, it reverts `status` to "pending" and `progress` to 0.
	const toggleCheckTask = (id) => {
		updateTasks(
			tasks.map((task) =>
				task.id === id
					? {
						...task,
						checked: !task.checked,
						status: !task.checked ? 'completed' : 'pending',
						progress: !task.checked ? 100 : 0
					}
					: task
			)
		);
	};

	const handleSearch = (searchTerm) => {
		const query = searchTerm.trim().toLowerCase();
		setDisplayedTasks(
			query ? tasks.filter((task) => task.title.toLowerCase().includes(query)) : tasks
		);
	};

	const handleFilter = (filter) => {
		const statusFilter = filter.trim().toLowerCase();
		setDisplayedTasks(
			statusFilter === "all" ? tasks : tasks.filter((task) => task.status.toLowerCase() === statusFilter)
		);
	};

	// Load tasks from localStorage on initial mount
	useEffect(() => {
		const storedTasks = getTasksFromLocalStorage();
		if (storedTasks && storedTasks.length > 0) {
			setTasks(storedTasks);
			setDisplayedTasks(storedTasks);
		}
		setIsLoading(false);
	}, []);

	// Save tasks to localStorage whenever they changes
	useEffect(() => {
		if (!isLoading) {
			saveTasksToLocalStorage(tasks);
		}
	}, [tasks, isLoading]);

	return {
		addTask,
		editTask,
		isLoading,
		deleteTask,
		handleFilter,
		handleSearch,
		displayedTasks,
		toggleCheckTask,
		tasks: sortedTasks,
	};
};