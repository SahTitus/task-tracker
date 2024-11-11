/* eslint-disable no-unused-vars */
export const getTasksFromLocalStorage = () => {
	if (typeof window !== 'undefined' && window.localStorage) {
		try {
			const storedTasks = localStorage.getItem('tasks');

			// If storedTasks is empty or not found, return an empty array
			if (storedTasks && storedTasks !== "[]") {
				return JSON.parse(storedTasks);
			}
		} catch (error) {
			console.error('Failed to parse tasks from localStorage:');
		}
	}
	return [];
};

export const saveTasksToLocalStorage = (tasks) => {
	if (typeof window !== 'undefined' && window.localStorage) {
		try {

			localStorage.setItem('tasks', JSON.stringify(tasks));
		} catch (error) {
			console.error('Error saving tasks to localStorage:');
		}
	}
};
